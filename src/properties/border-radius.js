// @flow strict

import type { LengthPercentage } from "../css-types/length-percentage";

import { Parser } from "../core";
import { lengthPercentage } from "../css-types/length-percentage";

export class BorderRadius {
  primary: LengthPercentage;
  secondary: LengthPercentage;

  constructor(primary: LengthPercentage, secondary: LengthPercentage) {
    this.primary = primary;
    this.secondary = secondary;
  }

  toString(): string {
    const primary = this.primary.toString();
    const secondary = this.secondary.toString();
    if (primary === secondary) {
      return primary;
    }
    return `${primary} ${secondary}`;
  }

  static get parse(): Parser<BorderRadius> {
    return Parser.oneOf(
      lengthPercentage.map((p) => [p, p]),
      Parser.sequence(lengthPercentage, lengthPercentage).separatedBy(
        Parser.whitespace
      )
    ).map(([primary, secondary]) => new BorderRadius(primary, secondary));
  }
}

export class BorderRadiusShorthand {
  pTopLeft: LengthPercentage;
  pTopRight: LengthPercentage;
  pBottomRight: LengthPercentage;
  pBottomLeft: LengthPercentage;

  sTopLeft: LengthPercentage;
  sTopRight: LengthPercentage;
  sBottomRight: LengthPercentage;
  sBottomLeft: LengthPercentage;

  constructor(
    pTopLeft: LengthPercentage,
    pTopRight: LengthPercentage = pTopLeft,
    pBottomRight: LengthPercentage = pTopLeft,
    pBottomLeft: LengthPercentage = pTopRight,
    sTopLeft: LengthPercentage = pTopLeft,
    sTopRight: LengthPercentage = sTopLeft,
    sBottomRight: LengthPercentage = sTopLeft,
    sBottomLeft: LengthPercentage = sTopRight
  ) {
    this.pTopLeft = pTopLeft;
    this.pTopRight = pTopRight;
    this.pBottomRight = pBottomRight;
    this.pBottomLeft = pBottomLeft;
    this.sTopLeft = sTopLeft;
    this.sTopRight = sTopRight;
    this.sBottomRight = sBottomRight;
    this.sBottomLeft = sBottomLeft;
  }

  // The shortest possible version of the border-radius
  toString(): string {
    const pTopLeft = this.pTopLeft.toString();
    const pTopRight = this.pTopRight.toString();
    const pBottomRight = this.pBottomRight.toString();
    const pBottomLeft = this.pBottomLeft.toString();

    let pStr = `${pTopLeft} ${pTopRight} ${pBottomRight} ${pBottomLeft}`;
    // All three are the same
    if (
      pTopLeft === pTopRight &&
      pTopRight === pBottomRight &&
      pBottomRight === pBottomLeft
    ) {
      pStr = pTopLeft;
      // TopLeft === BottomRight && TopRight === BottomLeft
    } else if (pTopLeft === pBottomRight && pTopRight === pBottomLeft) {
      pStr = `${pTopLeft} ${pTopRight}`;
      // TopRight === BottomLeft
    } else if (pTopRight === pBottomLeft) {
      pStr = `${pTopLeft} ${pTopRight} ${pBottomRight}`;
    }

    const sTopLeft = this.sTopLeft.toString();
    const sTopRight = this.sTopRight.toString();
    const sBottomRight = this.sBottomRight.toString();
    const sBottomLeft = this.sBottomLeft.toString();

    let sStr = `${pTopLeft} ${pTopRight} ${pBottomRight} ${pBottomLeft}`;
    // All three are the same
    if (
      sTopLeft === sTopRight &&
      sTopRight === sBottomRight &&
      sBottomRight === sBottomLeft
    ) {
      sStr = sTopLeft;
      // TopLeft === BottomRight && TopRight === BottomLeft
    } else if (sTopLeft === sBottomRight && sTopRight === sBottomLeft) {
      sStr = `${sTopLeft} ${sTopRight}`;
      // TopRight === BottomLeft
    } else if (sTopRight === sBottomLeft) {
      sStr = `${sTopLeft} ${sTopRight} ${sBottomRight}`;
    }

    if (pStr === sStr) {
      return pStr;
    }

    return `${pStr} / ${sStr}`;
  }

  static get parse(): Parser<BorderRadiusShorthand> {
    const spaceSeparatedRadii = Parser.sequence<
      [
        LengthPercentage,
        ?LengthPercentage,
        ?LengthPercentage,
        ?LengthPercentage
      ]
    >(
      lengthPercentage,
      lengthPercentage.prefix(Parser.whitespace).optional,
      lengthPercentage.prefix(Parser.whitespace).optional,
      lengthPercentage.prefix(Parser.whitespace).optional
    ).map(
      ([
        topLeft,
        topRight = topLeft,
        bottomRight = topLeft,
        bottomLeft = topRight,
      ]) => [topLeft, topRight, bottomRight, bottomLeft]
    );

    return Parser.sequence(
      spaceSeparatedRadii,
      spaceSeparatedRadii.prefix(
        Parser.string("/").surroundedBy(Parser.whitespace)
      ).optional
    ).map(
      ([pRadii, sRadii = pRadii]) =>
        new BorderRadiusShorthand(...pRadii, ...sRadii)
    );
  }
}
