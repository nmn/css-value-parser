// @flow strict

import { Parser } from '../core';
import { Frequency } from './frequency';
import { Length } from './length';
import { Resolution } from './resolution';
import { Time } from './time';

export type Dimension = Length | Time | Frequency | Resolution;
export const dimension: Parser<Dimension> = Parser.oneOf(
  Length.parse,
  Time.parse,
  Frequency.parse,
  Resolution.parse,
);
