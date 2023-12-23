// @flow strict

import { Parser } from '../core';
import { CustomIdentifier } from './custom-ident';

export class DashedIdentifier {
  +value: string;

  constructor(value: string) {
    this.value = value;
  }

  static get parse(): Parser<DashedIdentifier> {
    return Parser.sequence(Parser.string('--'), CustomIdentifier.parse).map(
      ([dash, ident]) => new DashedIdentifier(dash + ident.value),
    );
  }
}
