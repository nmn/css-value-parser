// @flow strict

import { Parser } from '../core';

export type CalcConstant = 'pi' | 'e' | 'infinity' | '-infinity' | 'NaN';

export const calcConstant: Parser<CalcConstant> = Parser.oneOf(
  Parser.string('pi'),
  Parser.string('e'),
  Parser.string('infinity'),
  Parser.string('-infinity'),
  Parser.string('NaN'),
);
