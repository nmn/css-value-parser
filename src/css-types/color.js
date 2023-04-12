// @flow strict

import { Parser } from "../core";

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
    Parser.oneOf(
      Parser.regex(/[0-9a-fA-F]{3}/),
      Parser.regex(/[0-9a-fA-F]{6}/),
      Parser.regex(/[0-9a-fA-F]{8}/)
    ).map((value) => String(value))
  ).map(([_, value]: [string, string]) => {
    if (value.length === 3) {
      return new HashColor(
        value
          .split("")
          .map((c) => c + c)
          .join("")
      );
    }
    return new HashColor(value);
  });
}

export class RgbCommaFunction implements RgbaEquivalent {
  +r: number;
  +g: number;
  +b: number;
  +a: number = 1;
  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  toString(): string {
    return `rgb(${this.r},${this.g},${this.b},1)`;
  }

  static parse: Parser<RgbCommaFunction> = Parser.sequence(
    Parser.string("rgb("),
    Parser.sequence(
      Parser.float
        .where((v) => v >= 0 && v <= 255)
        .surroundedBy(Parser.whitespace.optional),
      Parser.float
        .where((v) => v >= 0 && v <= 255)
        .surroundedBy(Parser.whitespace.optional),
      Parser.float
        .where((v) => v >= 0 && v <= 255)
        .surroundedBy(Parser.whitespace.optional)
    ).separatedBy(Parser.string(",")),
    Parser.string(")")
  ).map(
    ([_, [r, g, b], __]: [string, [number, number, number], string]) =>
      new RgbCommaFunction(r, g, b)
  );
}

export class RgbaCommaFunction implements RgbaEquivalent {
  +r: number;
  +g: number;
  +b: number;
  +a: number;
  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  toString(): string {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}

// export class RgbColor implements RgbaEquivalent {
//   +r: number;
//   +g: number;
//   +b: number;
//   +a: number;
//   constructor(r: number, g: number, b: number, a: number = 1) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
//     this.a = a;
//   }
//   toString(): string {
//     return `rgb(${this.r},${this.g},${this.b})`;
//   }

//   static #rgbNumber: Parser<number> = Parser.oneOf(

//     Percent.parse
//       .flatMap((percent) =>
//         percent.value >= 0 && percent.value <= 100
//           ? Parser.always(percent)
//           : Parser.never()
//       )
//       .map((percent) => Math.round(percent.value * 2.55))
//   );

//   static #commaSeparated: Parser<[number, number, number]> = Parser.sequence(
//     RgbColor.#rgbNumber,
//     RgbColor.#rgbNumber,
//     RgbColor.#rgbNumber
//   ).separatedBy(
//     Parser.string(",")
//       .skip(Parser.whitespace.optional)
//       .map(() => undefined)
//   );

//   static #spaceSeparated: Parser<[number, number, number]> = Parser.sequence(
//     RgbColor.#rgbNumber,
//     RgbColor.#rgbNumber,
//     RgbColor.#rgbNumber
//   ).separatedBy(Parser.whitespace.map(() => undefined));

//   static parse: Parser<RgbColor> = Parser.sequence<
//     [void, [number, number, number], void]
//   >(
//     // "rgb(" and optional whitespace
//     Parser.string("rgb(")
//       .skip(Parser.whitespace.optional)
//       .map(() => undefined),

//     Parser.oneOf(
//       // r,g,b
//       RgbColor.#commaSeparated,
//       // r g b
//       RgbColor.#spaceSeparated
//     ),

//     // optional whitespace then ")"
//     Parser.string(")")
//       .prefix(Parser.whitespace.optional)
//       .map(() => undefined)
//   ).map(([_1, [r, g, b], _2]) => new RgbColor(r, g, b));
// }
