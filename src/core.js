// @flow strict

import { SubString } from "./base-types.js";

import { start } from "repl";

export class Parser<+T> {
  +run: (input: SubString) => T | Error;

  constructor(parser: (SubString) => T | Error) {
    this.run = parser;
  }

  map<NewT>(f: (T) => NewT): Parser<NewT> {
    return new Parser((input): NewT | Error => {
      const oldOutput = this.run(input);
      if (oldOutput instanceof Error) {
        return oldOutput;
      }
      return f(oldOutput);
    });
  }

  flatMap<U>(f: (T) => Parser<U>): Parser<U> {
    return new Parser((input): U | Error => {
      const { startIndex, endIndex } = input;
      const output1 = this.run(input);
      if (output1 instanceof Error) {
        return output1;
      }
      const secondParser = f(output1);
      const output2: U | Error = secondParser.run(input);
      if (output2 instanceof Error) {
        input.startIndex = startIndex;
        input.endIndex = endIndex;
        return output2;
      }
      return output2;
    });
  }

  or<U>(parser2: Parser<U>): Parser<T | U> {
    return new Parser((input): T | U | Error => {
      const output1 = this.run(input);
      if (output1 instanceof Error) {
        return parser2.run(input);
      }
      return output1;
    });
  }

  skip(skipParser: Parser<void>): Parser<T> {
    return this.flatMap((output) => skipParser.map(() => output));
  }

  get optional(): Parser<void | T> {
    return this.or(Parser.always(undefined));
  }

  prefix(prefixParser: Parser<void>): Parser<T> {
    return prefixParser.flatMap(() => this);
  }

  static never<T>(): Parser<T> {
    return new Parser(() => new Error("Never"));
  }

  static always<T>(output: T): Parser<T> {
    return new Parser(() => output);
  }

  // T will be a union of the output types of the parsers
  static oneOf<T>(...parsers: $ReadOnlyArray<Parser<T>>): Parser<T> {
    return new Parser((input): T | Error => {
      for (const parser of parsers) {
        const output = parser.run(input);
        if (!(output instanceof Error)) {
          return output;
        }
      }
      return new Error("No parser matched");
    });
  }

  // Variadic Generics: ...T,
  static sequence<T: $ReadOnlyArray<mixed>>(
    ...parsers: $TupleMap<T, <Output>(Output) => Parser<Output>>
  ): ParserSequence<T> {
    return new ParserSequence(...parsers);
  }

  static zeroOrMore<T>(parser: Parser<T>): ZeroOrMoreParsers<T> {
    return new ZeroOrMoreParsers(parser);
  }

  static oneOrMore<T>(parser: Parser<T>): OneOrMoreParsers<T> {
    return new OneOrMoreParsers(parser);
  }

  static string(str: string): Parser<string> {
    return new Parser((input): string | Error => {
      const { startIndex, endIndex } = input;
      if (startIndex + str.length - 1 > endIndex) {
        return new Error("End of input");
      }
      if (input.startsWith(str)) {
        input.startIndex += str.length;
        return str;
      }
      return new Error(
        `Expected ${str}, got ${input.string.slice(startIndex)}`
      );
    });
  }

  static regex(regex: RegExp): Parser<string> {
    return new Parser((input): string | Error => {
      const { startIndex, endIndex } = input;
      if (startIndex > endIndex) {
        return new Error("End of input");
      }
      const match = input.string.slice(startIndex).match(regex);
      if (match) {
        input.startIndex += match[0].length;
        return match[0];
      }
      return new Error(
        `Expected ${String(regex)}, got ${input.string.slice(startIndex)}`
      );
    });
  }

  static takeWhile(predicate: (string) => boolean): Parser<string> {
    return new Parser((input): string | Error => {
      const { startIndex, endIndex } = input;
      if (startIndex > endIndex) {
        return new Error("End of input");
      }
      let i = startIndex;
      while (i <= endIndex && predicate(input.string[i])) {
        i++;
      }
      const output = input.string.slice(startIndex, i);
      input.startIndex = i;
      return output;
    });
  }

  static digit: Parser<string> = new Parser((input): string | Error => {
    if (input.first >= "0" && input.first <= "9") {
      input.startIndex++;
      return input.first;
    }
    return new Error(`Expected digit, got ${input.first}`);
  });

  static letter: Parser<string> = new Parser((input): string | Error => {
    if (
      (input.first >= "a" && input.first <= "z") ||
      (input.first >= "A" && input.first <= "Z")
    ) {
      input.startIndex++;
      return input.first;
    }
    return new Error(`Expected letter, got ${input.first}`);
  });

  static int: Parser<number> = Parser.sequence(
    Parser.regex(/[1-9]/),
    Parser.zeroOrMore(Parser.digit)
  ).map(([first, rest]) => parseInt(first + rest.join(""), 10));

  static float: Parser<number> = Parser.sequence<
    [-1 | 1, number, ".", $ReadOnlyArray<string>]
  >(
    Parser.string("-").optional.map((char) => (char != null ? -1 : 1)),
    Parser.int.optional.map((int) => int || 0),
    Parser.string("."),
    Parser.oneOrMore(Parser.digit)
  ).map(
    ([sign, int, _, digits]) => sign * parseFloat(int + "." + digits.join(""))
  );

  static whitespace: Parser<void> = Parser.oneOrMore(Parser.string(" ")).map(
    () => undefined
  );

  static whitespaceOrNewline: Parser<void> = Parser.oneOrMore(
    Parser.oneOf(
      // Spaces
      Parser.string(" "),
      // Newlines
      Parser.string("\n"),
      // Carriage returns
      Parser.string("\r\n")
    )
  ).map(() => undefined);
}

class ZeroOrMoreParsers<+T> extends Parser<$ReadOnlyArray<T>> {
  +parser: Parser<T>;
  separator: ?Parser<void>;

  constructor(parser: Parser<T>) {
    super((input): $ReadOnlyArray<T> => {
      const output: Array<T> = [];
      for (let i = 0; true; i++) {
        const separator = getThis().separator;
        if (i > 0 && separator) {
          const result = separator.run(input);
          if (result instanceof Error) {
            return output;
          }
        }
        const result = getThis().parser.run(input);
        if (result instanceof Error) {
          return output;
        }
        output.push(result);
      }
      return output;
    });
    const getThis = () => this;
    this.parser = parser;
  }

  separatedBy(separator: Parser<void>): ZeroOrMoreParsers<T> {
    this.separator = separator;
    return this;
  }
}

class OneOrMoreParsers<+T> extends Parser<$ReadOnlyArray<T>> {
  +parser: Parser<T>;
  separator: ?Parser<void>;

  constructor(parser: Parser<T>) {
    super((input): $ReadOnlyArray<T> | Error => {
      const output: Array<T> = [];
      for (let i = 0; true; i++) {
        const separator = getThis().separator;
        if (i > 0 && separator) {
          const result = separator.run(input);
          if (result instanceof Error) {
            return output;
          }
        }
        const result = getThis().parser.run(input);
        if (result instanceof Error) {
          if (i === 0) {
            return result;
          }
          return output;
        }
        output.push(result);
      }
      return output;
    });
    const getThis = () => this;
    this.parser = parser;
  }

  separatedBy(separator: Parser<void>): OneOrMoreParsers<T> {
    this.separator = separator;
    return this;
  }
}

class ParserSequence<+T: $ReadOnlyArray<mixed>> extends Parser<T> {
  +parsers: $TupleMap<T, <X>(X) => Parser<X>>;

  constructor(...parsers: $TupleMap<T, <X>(X) => Parser<X>>) {
    super((input): T | Error => {
      const { startIndex, endIndex } = input;
      let failed: null | Error = null;

      const output: $TupleMap<T, <O>(O) => O> = getThis().parsers.map(
        (parser) => {
          if (failed) {
            return Error("already failed");
          }
          const result = parser.run(input);
          if (result instanceof Error) {
            failed = result;
          }
          return result;
        }
      );

      if (failed) {
        input.startIndex = startIndex;
        input.endIndex = endIndex;
        return failed;
      }

      return (output: $FlowFixMe);
    });
    const getThis = () => this;
    this.parsers = parsers;
  }

  separatedBy(
    separator: Parser<void>
  ): ParserSequence<$TupleMap<T, <O>(O) => O>> {
    return new ParserSequence(
      ...this.parsers.map(<X>(parser: Parser<X>, index): Parser<X> =>
        index === 0 ? parser : parser.prefix(separator)
      )
    );
  }
}
