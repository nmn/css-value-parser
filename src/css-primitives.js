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

  static parse: Parser<Px> = Parser.sequence(
    Parser.float,
    Parser.string("px").map(() => "px")
  ).map(([value, _]) => new Px(value));
}

export class Percent implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}%`;
  }

  static parse: Parser<Percent> = Parser.sequence(
    Parser.float,
    Parser.string("%").map(() => "%")
  ).map(([value, _]) => new Percent(value));
}

export class Em implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}em`;
  }

  static parse: Parser<Em> = Parser.sequence(
    Parser.float,
    Parser.string("em").map(() => "em")
  ).map(([value, _]) => new Em(value));
}

export class Rem implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}rem`;
  }

  static parse: Parser<Rem> = Parser.sequence(
    Parser.float,
    Parser.string("rem").map(() => "rem")
  ).map(([value, _]) => new Rem(value));
}

export class Vh implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vh`;
  }

  static parse: Parser<Vh> = Parser.sequence(
    Parser.float,
    Parser.string("vh").map(() => "vh")
  ).map(([value, _]) => new Vh(value));
}

export class Vw implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vw`;
  }

  static parse: Parser<Vw> = Parser.sequence(
    Parser.float,
    Parser.string("vw").map(() => "vw")
  ).map(([value, _]) => new Vw(value));
}

export class Vmin implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vmin`;
  }

  static parse: Parser<Vmin> = Parser.sequence(
    Parser.float,
    Parser.string("vmin").map(() => "vmin")
  ).map(([value, _]) => new Vmin(value));
}

export class Vmax implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}vmax`;
  }

  static parse: Parser<Vmax> = Parser.sequence(
    Parser.float,
    Parser.string("vmax").map(() => "vmax")
  ).map(([value, _]) => new Vmax(value));
}

export class Ch implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}ch`;
  }

  static parse: Parser<Ch> = Parser.sequence(
    Parser.float,
    Parser.string("ch").map(() => "ch")
  ).map(([value, _]) => new Ch(value));
}

export class Ex implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}ex`;
  }

  static parse: Parser<Ex> = Parser.sequence(
    Parser.float,
    Parser.string("ex").map(() => "ex")
  ).map(([value, _]) => new Ex(value));
}

export class Cm implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}cm`;
  }

  static parse: Parser<Cm> = Parser.sequence(
    Parser.float,
    Parser.string("cm").map(() => "cm")
  ).map(([value, _]) => new Cm(value));
}

export class Mm implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}mm`;
  }

  static parse: Parser<Mm> = Parser.sequence(
    Parser.float,
    Parser.string("mm").map(() => "mm")
  ).map(([value, _]) => new Mm(value));
}

export class In implements NumericUnit {
  +value: number;
  constructor(value: number) {
    this.value = value;
  }
  toString(): string {
    return `${this.value}in`;
  }

  static parse: Parser<In> = Parser.sequence(
    Parser.float,
    Parser.string("in").map(() => "in")
  ).map(([value, _]) => new In(value));
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
  ).map(([_, value]) => new HashColor(value));
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

  static #rgbNumber: Parser<number> = Parser.float.flatMap((number) =>
    number >= 0 && number <= 255 ? Parser.always(number) : Parser.never()
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
