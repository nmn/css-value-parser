// @flow strict

import { Length } from "./length";
import { Percentage } from "./common-types";

import { Parser } from "../core";

export class FilterFunction {}

export class BlurFilterFunction extends FilterFunction {
  +radius: Length;
  constructor(radius: Length) {
    super();
    this.radius = radius;
  }
  toString(): string {
    return `blur(${this.radius.toString()})`;
  }
  static get parse(): Parser<BlurFilterFunction> {
    return Parser.sequence(
      Parser.string("blur("),
      Length.parse.surroundedBy(Parser.whitespace.optional),
      Parser.string(")")
    ).map(([_, radius, _1]) => new BlurFilterFunction(radius));
  }
}

export class BrightnessFilterFunction extends FilterFunction {
  +percentage: number;
  constructor(percentage: number) {
    super();
    this.percentage = percentage;
  }
  toString(): string {
    return `brightness(${this.percentage})`;
  }
  static get parse(): Parser<BrightnessFilterFunction> {
    return Parser.sequence(
      Parser.string("brightness("),
      Parser.oneOf(
        Parser.float.where((n) => n >= 0),
        Percentage.parse.map((p) => p.value / 100)
      ).surroundedBy(Parser.whitespace.optional),
      Parser.string(")")
    ).map(([_, percentage, _1]) => new BrightnessFilterFunction(percentage));
  }
}
