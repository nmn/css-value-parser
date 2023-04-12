// @flow strict

import { Parser } from "../core";

import { Angle } from "./angle";
import { Percentage } from "./common-types";

export const anglePercentage: Parser<Angle | Percentage> = Parser.oneOf(
  Angle.parse,
  Percentage.parse
);
