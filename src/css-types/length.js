// @flow strict

import { Parser } from "../core.js";
import { number } from "./number";

// All units are numberic
export class Length {
  +value: number;
  +unit: string;
  constructor(value: number, unit: string) {
    super();
    this.value = value;
  }
  toString(): string {
    return `${this.value}${this.unit}`;
  }
  static get parse(): Parser<Length> {
    return Parser.oneOf(
      /// Relative length units based on font
      /// https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_font
      // Cap.parse, // Not well supported in browsers
      Ch.parse,
      Em.parse,
      Ex.parse,
      Ic.parse,
      // Lh.parse, // Not well supported in browsers
      Rem.parse,
      // Rlh.parse, // Not well supported in browsers

      /// Viewport-based length units
      /// https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport
      Vh.parse,
      Svh.parse,
      Lvh.parse,
      Dvh.parse,
      Vw.parse,
      Svw.parse,
      Lvw.parse,
      Dvw.parse,
      Vmin.parse,
      Svmin.parse,
      Lvmin.parse,
      Dvmin.parse,
      Vmax.parse,
      Svmax.parse,
      Lvmax.parse,
      Dvmax.parse,

      /// Container Query Length Units
      /// https://developer.mozilla.org/en-US/docs/Web/CSS/length#container_query_length_units
      Cqw.parse,
      Cqi.parse,
      Cqh.parse,
      Cqb.parse,
      Cqmin.parse,
      Cqmax.parse,

      /// Absolute length units
      /// https://developer.mozilla.org/en-US/docs/Web/CSS/length#absolute_length_units
      Px.parse,
      Cm.parse,
      Mm.parse,
      In.parse,
      Pt.parse
    );
  }
}

function unit<T: Length>(unit: string, Constructor: Class<T>): Parser<T> {
  return number.skip(Parser.string(unit)).map((v) => new Constructor(v, unit));
}

/// ====================
/// Relative length units based on font
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_font
/// ====================

export class Cap extends Length {
  static parse: Parser<Cap> = unit("cap", Cap);
}

export class Ch extends Length {
  static parse: Parser<Ch> = unit("ch", Ch);
}

export class Em extends Length {
  static parse: Parser<Em> = unit("em", Em);
}

export class Ex extends Length {
  static parse: Parser<Ex> = unit("ex", Ex);
}

export class Ic extends Length {
  static parse: Parser<Ic> = unit("ic", Ic);
}

export class Lh extends Length {
  static parse: Parser<Lh> = unit("lh", Lh);
}

export class Rem extends Length {
  static parse: Parser<Rem> = unit("rem", Rem);
}

export class Rlh extends Length {
  static parse: Parser<Rlh> = unit("rlh", Rlh);
}

/// ====================
/// Viewport-based length units
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport
/// ====================

export class Vh extends Length {
  static parse: Parser<Vh> = unit("vh", Vh);
}
export class Svh extends Length {
  static parse: Parser<Svh> = unit("svh", Svh);
}
export class Lvh extends Length {
  static parse: Parser<Lvh> = unit("lvh", Lvh);
}
export class Dvh extends Length {
  static parse: Parser<Dvh> = unit("dvh", Dvh);
}
export class Vw extends Length {
  static parse: Parser<Vw> = unit("vw", Vw);
}
export class Svw extends Length {
  static parse: Parser<Svw> = unit("svw", Svw);
}
export class Lvw extends Length {
  static parse: Parser<Lvw> = unit("lvw", Lvw);
}
export class Dvw extends Length {
  static parse: Parser<Dvw> = unit("dvw", Dvw);
}
export class Vmin extends Length {
  static parse: Parser<Vmin> = unit("vmin", Vmin);
}
export class Svmin extends Length {
  static parse: Parser<Svmin> = unit("svmin", Svmin);
}
export class Lvmin extends Length {
  static parse: Parser<Lvmin> = unit("lvmin", Lvmin);
}
export class Dvmin extends Length {
  static parse: Parser<Dvmin> = unit("dvmin", Dvmin);
}
export class Vmax extends Length {
  static parse: Parser<Vmax> = unit("vmax", Vmax);
}
export class Svmax extends Length {
  static parse: Parser<Svmax> = unit("svmax", Svmax);
}
export class Lvmax extends Length {
  static parse: Parser<Lvmax> = unit("lvmax", Lvmax);
}
export class Dvmax extends Length {
  static parse: Parser<Dvmax> = unit("dvmax", Dvmax);
}

/// ====================
/// Container Query Length Units
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#container_query_length_units
/// ====================

export class Cqw extends Length {
  static parse: Parser<Cqw> = unit("cqw", Cqw);
}
export class Cqi extends Length {
  static parse: Parser<Cqi> = unit("cqi", Cqi);
}
export class Cqh extends Length {
  static parse: Parser<Cqh> = unit("cqh", Cqh);
}
export class Cqb extends Length {
  static parse: Parser<Cqb> = unit("cqb", Cqb);
}
export class Cqmin extends Length {
  static parse: Parser<Cqmin> = unit("cqmin", Cqmin);
}
export class Cqmax extends Length {
  static parse: Parser<Cqmax> = unit("cqmax", Cqmax);
}

/// ====================
/// Absolute length units
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#absolute_length_units
/// ====================

export class Px extends Length {
  static parse: Parser<Px> = unit("px", Px);
}
export class Cm extends Length {
  static parse: Parser<Cm> = unit("cm", Cm);
}
export class Mm extends Length {
  static parse: Parser<Mm> = unit("mm", Mm);
}
export class In extends Length {
  static parse: Parser<In> = unit("in", In);
}
export class Pt extends Length {
  static parse: Parser<Pt> = unit("pt", Pt);
}
