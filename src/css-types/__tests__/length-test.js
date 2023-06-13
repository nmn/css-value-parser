// @flow strict

import {
  Length,
  Cap,
  Ch,
  Em,
  Ex,
  Ic,
  Lh,
  Rem,
  Rlh,
  Vh,
  // Sv,
  // Lv,
  // Dv,
  Cqw,
  Cqi,
  Cqh,
  Cqb,
  Cqmin,
  Cqmax,
  Px,
  Cm,
  Mm,
  In,
  Pt,
} from "../length";
import { SubString } from "../../base-types";

describe("Test CSS Type: <length>", () => {
  test("parses CSS length types strings correctly", () => {
    expect(Length.parse.parseToEnd("0")).toEqual(new Length(0));
    expect(Length.parse.parseToEnd("10px")).toEqual(new Px(10));
    expect(Length.parse.parseToEnd("5rem")).toEqual(new Rem(5));
    expect(Length.parse.parseToEnd("2.5em")).toEqual(new Em(2.5));
    expect(Length.parse.parseToEnd("2in")).toEqual(new In(2));
    expect(Length.parse.parseToEnd("15pt")).toEqual(new Pt(15));
  });

  test("parses CSS length types subStrings correctly", () => {
    let val = new SubString("0rem");
    expect(Length.parse.run(val)).toEqual(new Rem(0));
    expect(val.toString()).toEqual("");

    val = new SubString("10px foo");
    expect(Length.parse.run(val)).toEqual(new Px(10));
    expect(val.toString()).toEqual(" foo");
  });
});
