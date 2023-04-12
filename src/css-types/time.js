// @flow strict

import { Parser } from "../core";
import { number } from "./number";

export class Time {
  +value: number;
  +unit: "s" | "ms";
  constructor(value: number, unit: "s" | "ms") {
    this.value = value;
    this.unit = unit;
  }
  toString(): string {
    // Always use the shortest representation
    if (this.unit === "ms") {
      return `${this.value / 1000}s`;
    }
    return `${this.value}${this.unit}`;
  }
  static parse: Parser<Time> = Parser.sequence(
    number,
    Parser.oneOf(Parser.string("s"), Parser.string("ms"))
  ).map(([value, unit]) => new Time(value, unit));
}
