// @flow strict

import { Parser } from "../core";
import { Percentage } from "./common-types";

export const alphaNumber: Parser<number> = Parser.float.where(
  (v) => v >= 0 && v <= 1
);

export const alphaValue: Parser<number | Percentage> = Parser.oneOf(
  alphaNumber,
  Percentage.parse
);
