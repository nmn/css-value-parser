// @flow strict

import { Parser } from "../core";

import { Percentage } from "./common-types";
import { Length } from "./length";

export type LengthPercentage = Length | Percentage;
export const lengthPercentage: Parser<LengthPercentage> = Parser.oneOf(
  Length.parse,
  Percentage.parse
);
