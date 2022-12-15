// @flow strict

import { Parser } from "./core.js";

export interface Unit<+T> {
  +value: T;
  toString(): string;
}

export interface NumericUnit extends Unit<number> {}

export class Px implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}px`;
  }

  static parse: Parser<Px> = Parser.float
    .skip(Parser.string("px"))
    .map((v) => new Px(v));
}

export class Percent implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}%`;
  }

  static parse: Parser<Percent> = Parser.float
    .skip(Parser.string("%"))
    .map((v) => new Percent(v));
}

export class Em implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}em`;
  }

  static parse: Parser<Em> = Parser.float
    .skip(Parser.string("em"))
    .map((v) => new Em(v));
}

export class Rem implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}rem`;
  }

  static parse: Parser<Rem> = Parser.float
    .skip(Parser.string("rem"))
    .map((v) => new Rem(v));
}

export class Vh implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vh`;
  }

  static parse: Parser<Vh> = Parser.float
    .skip(Parser.string("vh"))
    .map((v) => new Vh(v));
}

export class Vw implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vw`;
  }

  static parse: Parser<Vw> = Parser.float
    .skip(Parser.string("vw"))
    .map((v) => new Vw(v));
}

export class Vmin implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vmin`;
  }

  static parse: Parser<Vmin> = Parser.float
    .skip(Parser.string("vmin"))
    .map((v) => new Vmin(v));
}

export class Vmax implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vmax`;
  }

  static parse: Parser<Vmax> = Parser.float
    .skip(Parser.string("vmax"))
    .map((v) => new Vmax(v));
}

export class Ch implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}ch`;
  }

  static parse: Parser<Ch> = Parser.float
    .skip(Parser.string("ch"))
    .map((v) => new Ch(v));
}

export class Ex implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}ex`;
  }

  static parse: Parser<Ex> = Parser.float
    .skip(Parser.string("ex"))
    .map((v) => new Ex(v));
}

export class Cm implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}cm`;
  }

  static parse: Parser<Cm> = Parser.float
    .skip(Parser.string("cm"))
    .map((v) => new Cm(v));
}

export class Mm implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}mm`;
  }

  static parse: Parser<Mm> = Parser.float
    .skip(Parser.string("mm"))
    .map((v) => new Mm(v));
}

export class In implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}in`;
  }

  static parse: Parser<In> = Parser.float
    .skip(Parser.string("in"))
    .map((v) => new In(v));
}

export interface RgbaEquivalent {
  +r: number;
  +g: number;
  +b: number;
  +a: number;
}

export class HashColor implements RgbaEquivalent {
  +value: string;
  constructor(value: string) {
    this.value = value;
  }
  toString(): string {
    return `#${this.value}`;
  }

  get r(): number {
    return parseInt(this.value.slice(0, 2), 16);
  }

  get g(): number {
    return parseInt(this.value.slice(2, 4), 16);
  }

  get b(): number {
    return parseInt(this.value.slice(4, 6), 16);
  }

  get a(): number {
    return this.value.length === 8
      ? parseInt(this.value.slice(6, 8), 16) / 255
      : 1;
  }

  static parse: Parser<HashColor> = Parser.sequence(
    Parser.string("#"),
    Parser.regex(/[0-9a-fA-F]{6, 8}/)
  ).map(([_, value]: [string, string]) => new HashColor(value));
}

export class RgbColor implements RgbaEquivalent {
  +r: number;
  +g: number;
  +b: number;
  +a: number;
  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  toString(): string {
    return `rgb(${this.r},${this.g},${this.b})`;
  }

  static #rgbNumber: Parser<number> = Parser.oneOf(
    Parser.float.flatMap((number) =>
      number >= 0 && number <= 255 ? Parser.always(number) : Parser.never()
    ),
    Percent.parse
      .flatMap((percent) =>
        percent.value >= 0 && percent.value <= 100
          ? Parser.always(percent)
          : Parser.never()
      )
      .map((percent) => Math.round(percent.value * 2.55))
  );

  static #commaSeparated: Parser<[number, number, number]> = Parser.sequence(
    RgbColor.#rgbNumber,
    RgbColor.#rgbNumber,
    RgbColor.#rgbNumber
  ).separatedBy(
    Parser.string(",")
      .skip(Parser.whitespace.optional)
      .map(() => undefined)
  );

  static #spaceSeparated: Parser<[number, number, number]> = Parser.sequence(
    RgbColor.#rgbNumber,
    RgbColor.#rgbNumber,
    RgbColor.#rgbNumber
  ).separatedBy(Parser.whitespace.map(() => undefined));

  static parse: Parser<RgbColor> = Parser.sequence<
    [void, [number, number, number], void]
  >(
    // "rgb(" and optional whitespace
    Parser.string("rgb(")
      .skip(Parser.whitespace.optional)
      .map(() => undefined),

    Parser.oneOf(
      // r,g,b
      RgbColor.#commaSeparated,
      // r g b
      RgbColor.#spaceSeparated
    ),

    // optional whitespace then ")"
    Parser.string(")")
      .prefix(Parser.whitespace.optional)
      .map(() => undefined)
  ).map(([_1, [r, g, b], _2]) => new RgbColor(r, g, b));
}
