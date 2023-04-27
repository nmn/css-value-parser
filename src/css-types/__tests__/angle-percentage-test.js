// @flow strict

import { Angle, Deg, Rad, Grad, Turn } from "../Angle";
import { Percentage } from "../common-types";
import { SubString } from "../../base-types";

import { anglePercentage } from "../angle-percentage";

describe("Test CSS Type: <angle-percentage>", () => {
  test("parses CSS angle or percentage types strings correctly", () => {
    expect(anglePercentage.parse("0deg")).toEqual(new Deg(0));
    expect(anglePercentage.parse("50%")).toEqual(new Percentage(50));
    expect(anglePercentage.parse("45deg")).toEqual(new Deg(45));
    expect(anglePercentage.parse("90deg")).toEqual(new Deg(90));
    expect(anglePercentage.parse("180deg")).toEqual(new Deg(180));
    expect(anglePercentage.parse("270deg")).toEqual(new Deg(270));
    expect(anglePercentage.parse("-90deg")).toEqual(new Deg(-90));
    expect(anglePercentage.parse("0.5turn")).toEqual(new Turn(0.5));
    expect(anglePercentage.parse("2rad")).toEqual(new Rad(2));
    expect(anglePercentage.parse("100grad")).toEqual(new Grad(100));
    expect(anglePercentage.parse("1.5deg")).toEqual(new Deg(1.5));
    expect(anglePercentage.parse("0.75")).toBeInstanceOf(Error);
    expect(anglePercentage.parse("50% 50%")).toEqual(new Percentage(50));
  });

  test("parses CSS angle or percentage types subStrings correctly", () => {
    let val = new SubString("0deg");
    expect(anglePercentage.run(val)).toEqual(new Deg(0));
    expect(val.toString()).toEqual("");

    val = new SubString("45deg foo");
    expect(anglePercentage.run(val)).toEqual(new Deg(45));
    expect(val.toString()).toEqual(" foo");

    val = new SubString("50% bar");
    expect(anglePercentage.run(val)).toEqual(new Percentage(50));
    expect(val.toString()).toEqual(" bar");
  });
});
