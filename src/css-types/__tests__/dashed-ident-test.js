// @flow strict

import { DashedIdentifier } from "../dashed-ident";
import { SubString } from "../../base-types";
import { Parser } from "../../core";

describe("Test CSS Type: <dashed-ident>", () => {
  test("parses CSS dashed-ident types strings correctly", () => {
    // --primary-color
    // --secondary-color
    // --tertiary-color
    expect(DashedIdentifier.parse.parse("--primary-color")).toEqual(
      new DashedIdentifier("--primary-color")
    );
    expect(DashedIdentifier.parse.parse("--secondary-color")).toEqual(
      new DashedIdentifier("--secondary-color")
    );
    expect(DashedIdentifier.parse.parse("--_tertiary-color")).toEqual(
      new DashedIdentifier("--_tertiary-color")
    );
    expect(DashedIdentifier.parse.parse("--_tertiary-color-")).toEqual(
      new DashedIdentifier("--_tertiary-color-")
    );
    expect(DashedIdentifier.parse.parse("--_1")).toEqual(
      new DashedIdentifier("--_1")
    );
    expect(DashedIdentifier.parse.parse("--_1\\.1")).toEqual(
      new DashedIdentifier("--_1\\.1")
    );
  });
  test("fails to parse invalid CSS dashed-ident types strings", () => {
    expect(DashedIdentifier.parse.parse("-_1")).toBeInstanceOf(Error);
    expect(DashedIdentifier.parse.parse("--")).toBeInstanceOf(Error);
    expect(DashedIdentifier.parse.parse("1")).toBeInstanceOf(Error);
    expect(DashedIdentifier.parse.parse("1-")).toBeInstanceOf(Error);
    expect(DashedIdentifier.parse.parse("1-2")).toBeInstanceOf(Error);
    expect(DashedIdentifier.parse.parse("1-2-")).toBeInstanceOf(Error);
  });
});
