// @flow strict

import { Parser } from "../core";

// e.g. 1fr
export class Flex {
  +fraction: number;
  constructor(fraction: number) {
    this.fraction = fraction;
  }
  toString(): string {
    return `${this.fraction}fr`;
  }
  static get parse(): Parser<Flex> {
    return Parser.sequence(
      Parser.float.where((num) => num >= 0),
      Parser.string("fr")
    ).map(([fraction, _unit]) => new Flex(fraction));
  }
}
