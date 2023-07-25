// @flow strict

import { Parser } from '../core.js';
import { number } from './number';

// All units are numberic
export class Length {
  +value: number;
  +unit: string = '';

  constructor(value: number) {
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
      Pt.parse,

      // If nothing else, check for a plain `0`
      Parser.string('0').map(() => new Length(0)),
    );
  }
}

function unit<T: Length>(unit: string, Constructor: Class<T>): Parser<T> {
  return number.skip(Parser.string(unit)).map((v) => new Constructor(v));
}

/// ====================
/// Relative length units based on font
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_font
/// ====================

export class Cap extends Length {
  unit: 'cap' = 'cap';

  constructor(value: number) {
    super(value);
  }

  static get parse(): Parser<Cap> {
    return unit('cap', Cap);
  }
}

export class Ch extends Length {
  unit: 'ch' = 'ch';

  constructor(value: number) {
    super(value);
  }

  static parse: Parser<Ch> = unit('ch', Ch);
}

export class Em extends Length {
  unit: 'em' = 'em';

  constructor(value: number) {
    super(value);
  }

  static parse: Parser<Em> = unit('em', Em);
}

export class Ex extends Length {
  unit: 'ex' = 'ex';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Ex> = unit('ex', Ex);
}

export class Ic extends Length {
  unit: 'ic' = 'ic';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Ic> = unit('ic', Ic);
}

export class Lh extends Length {
  unit: 'lh' = 'lh';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Lh> = unit('lh', Lh);
}

export class Rem extends Length {
  unit: 'rem' = 'rem';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Rem> = unit('rem', Rem);
}

export class Rlh extends Length {
  unit: 'rlh' = 'rlh';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Rlh> = unit('rlh', Rlh);
}

/// ====================
/// Viewport-based length units
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport
/// ====================

export class Vh extends Length {
  unit: 'vh' = 'vh';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Vh> = unit('vh', Vh);
}
export class Svh extends Length {
  unit: 'svh' = 'svh';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Svh> = unit('svh', Svh);
}
export class Lvh extends Length {
  unit: 'lvh' = 'lvh';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Lvh> = unit('lvh', Lvh);
}
export class Dvh extends Length {
  unit: 'dvh' = 'dvh';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Dvh> = unit('dvh', Dvh);
}
export class Vw extends Length {
  unit: 'vw' = 'vw';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Vw> = unit('vw', Vw);
}
export class Svw extends Length {
  unit: 'svw' = 'svw';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Svw> = unit('svw', Svw);
}
export class Lvw extends Length {
  unit: 'lvw' = 'lvw';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Lvw> = unit('lvw', Lvw);
}
export class Dvw extends Length {
  unit: 'dvw' = 'dvw';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Dvw> = unit('dvw', Dvw);
}
export class Vmin extends Length {
  unit: 'vmin' = 'vmin';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Vmin> = unit('vmin', Vmin);
}
export class Svmin extends Length {
  unit: 'svmin' = 'svmin';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Svmin> = unit('svmin', Svmin);
}
export class Lvmin extends Length {
  unit: 'lvmin' = 'lvmin';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Lvmin> = unit('lvmin', Lvmin);
}
export class Dvmin extends Length {
  unit: 'dvmin' = 'dvmin';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Dvmin> = unit('dvmin', Dvmin);
}
export class Vmax extends Length {
  unit: 'vmax' = 'vmax';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Vmax> = unit('vmax', Vmax);
}
export class Svmax extends Length {
  unit: 'svmax' = 'svmax';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Svmax> = unit('svmax', Svmax);
}
export class Lvmax extends Length {
  unit: 'lvmax' = 'lvmax';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Lvmax> = unit('lvmax', Lvmax);
}
export class Dvmax extends Length {
  unit: 'dvmax' = 'dvmax';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Dvmax> = unit('dvmax', Dvmax);
}

/// ====================
/// Container Query Length Units
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#container_query_length_units
/// ====================

export class Cqw extends Length {
  unit: 'cqw' = 'cqw';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Cqw> = unit('cqw', Cqw);
}
export class Cqi extends Length {
  unit: 'cqi' = 'cqi';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Cqi> = unit('cqi', Cqi);
}
export class Cqh extends Length {
  unit: 'cqh' = 'cqh';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Cqh> = unit('cqh', Cqh);
}
export class Cqb extends Length {
  unit: 'cqb' = 'cqb';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Cqb> = unit('cqb', Cqb);
}
export class Cqmin extends Length {
  unit: 'cqmin' = 'cqmin';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Cqmin> = unit('cqmin', Cqmin);
}
export class Cqmax extends Length {
  static parse: Parser<Cqmax> = unit('cqmax', Cqmax);
}

/// ====================
/// Absolute length units
/// https://developer.mozilla.org/en-US/docs/Web/CSS/length#absolute_length_units
/// ====================

export class Px extends Length {
  unit: 'px' = 'px';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Px> = unit('px', Px);
}
export class Cm extends Length {
  unit: 'cm' = 'cm';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Cm> = unit('cm', Cm);
}
export class Mm extends Length {
  unit: 'mm' = 'mm';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Mm> = unit('mm', Mm);
}
export class In extends Length {
  unit: 'in' = 'in';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<In> = unit('in', In);
}
export class Pt extends Length {
  unit: 'pt' = 'pt';
  constructor(value: number) {
    super(value);
  }
  static parse: Parser<Pt> = unit('pt', Pt);
}

// TODO: CALC
