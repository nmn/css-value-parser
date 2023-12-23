// @flow strict

import { Frequency } from '../frequency';
import { SubString } from '../../base-types';

describe('Test CSS Type: <frequency>', () => {
  test('parses CSS frequency type strings correctly', () => {
    expect(Frequency.parse.parse('1Hz')).toEqual(new Frequency(1, 'Hz'));
    expect(Frequency.parse.parse('2.5Hz')).toEqual(new Frequency(2.5, 'Hz'));
    expect(Frequency.parse.parse('10KHz')).toEqual(new Frequency(10, 'KHz'));
    expect(Frequency.parse.parse('0.01KHz')).toEqual(
      new Frequency(0.01, 'KHz'),
    );
  });

  test('parses CSS frequency type subStrings correctly', () => {
    let val = new SubString('1Hz');
    expect(Frequency.parse.run(val)).toEqual(new Frequency(1, 'Hz'));
    expect(val.toString()).toEqual('');

    val = new SubString('2.5Hz foo');
    expect(Frequency.parse.run(val)).toEqual(new Frequency(2.5, 'Hz'));
    expect(val.toString()).toEqual(' foo');
  });
});
