// @flow strict

import { alphaValue } from "../alpha-value";

describe("Test CSS Type: <alpha-value>", () => {
  describe("Number Fractions", () => {
    test("0.5", () => {
      expect(alphaValue.parse("0.5")).toEqual(0.5);
    });
    test("0.25", () => {
      expect(alphaValue.parse("0.25")).toEqual(0.25);
    });
    test("0.75", () => {
      expect(alphaValue.parse("0.75")).toEqual(0.75);
    });
  });
});
