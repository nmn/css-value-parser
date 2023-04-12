// @flow strict

import { Parser } from "./core";
import { cssWideKeywords } from "./css-types/common-types";

const appearance = Parser.oneOf(
  cssWideKeywords,
  Parser.string("none"),
  Parser.string("auto"),
  Parser.string("menulist-button"),
  Parser.string("textfield")
);

// const accentColor = color
