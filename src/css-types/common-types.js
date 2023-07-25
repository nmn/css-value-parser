// @flow strict

import { Parser } from "../core";

export const inherit: Parser<string> = Parser.string("inherit");
export const initial: Parser<string> = Parser.string("initial");
export const unset: Parser<string> = Parser.string("unset");
export const revert: Parser<string> = Parser.string("revert");
// Purposely not exported
// StyleX will not support this value
// export const revertLayer: Parser<string> = Parser.string("revert-layer");

export const cssWideKeywords: Parser<string> = Parser.oneOf(
  inherit,
  initial,
  unset,
  revert
  // revertLayer
);

export const auto: Parser<string> = Parser.string("auto");

export class CssVariable {
  +name: string;
  constructor(name: string) {
    this.name = name;
  }
  toString(): string {
    return `var(--${this.name})`;
  }
  static parse: Parser<CssVariable> = Parser.sequence(
    Parser.string("var(--"),
    Parser.regex(/[a-zA-Z0-9_-]+/),
    Parser.string(")")
  ).map(([_, name, __]: [string, string, string]) => new CssVariable(name));
}

export class Percentage {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}%`;
  }
  static parse: Parser<Percentage> = Parser.float
    .skip(Parser.string("%"))
    .map((v) => new Percentage(v));
}

export const numberOrPercentage: Parser<number | Percentage> = Parser.oneOf(
  Percentage.parse,
  Parser.float
);
