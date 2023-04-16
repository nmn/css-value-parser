// @flow strict

import { Parser } from "../core";
import { Percentage } from "./common-types";

export const alphaNumber: Parser<number> = Parser.float.where(
  (v) => v >= 0 && v <= 1
);

export const alphaValue: Parser<number> = Parser.oneOf(
  alphaNumber,
  Percentage.parse.map((v) => v.value / 100)
);
