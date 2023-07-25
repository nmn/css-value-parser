// @flow strict

import { Parser, type FromParser } from './core';
import { cssWideKeywords } from './css-types/common-types';

export const appearance: Parser<
  | FromParser<typeof cssWideKeywords>
  | 'none'
  | 'auto'
  | 'menulist-button'
  | 'textfield',
> = Parser.oneOf(
  cssWideKeywords,
  Parser.string('none'),
  Parser.string('auto'),
  Parser.string('menulist-button'),
  Parser.string('textfield'),
);
