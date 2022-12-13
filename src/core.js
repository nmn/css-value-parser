// @flow strict

class SubString {
  +string: string;
  startIndex: number;
  endIndex: number;
  constructor(str: string) {
    this.string = str;
    this.startIndex = 0;
    this.endIndex = str.length - 1;
  }
}

class Parser<+T = SubString> {
  +run: (input: SubString) => T | Error;
  
  constructor(parser: (SubString) => T | Error) {
    this.run = parser;
  }
  
  map<NewT>(f: T => NewT): Parser<NewT> {
    return new Parser((input): NewT | Error => {
      const oldOutput = this.run(input);
      if (oldOutput instanceof Error) {
        return oldOutput;
      }
      return f(oldOutput);
    });
  }
  
  flatMap<U>(f: T => Parser<U>): Parser<U> {
    return new Parser((input): U | Error => {
      const {startIndex, endIndex} = input;
      const output1 = this.run(input);
      if (output1 instanceof Error) {
        return output1;
      }
      const secondParser = f(output1);
      const output2: U | Error = secondParser.run(input);
      if (output2 instanceof Error) {
        input.startIndex = startIndex;
        input.endIndex = endIndex;
        return output2;
      }
      return output2;
    });
  }
}









