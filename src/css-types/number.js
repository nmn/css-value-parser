// @flow strict

import { Parser } from "../core";

// TODO: does not support leading `+` sign or scientific notation
export const number: Parser<number> = Parser.float;
