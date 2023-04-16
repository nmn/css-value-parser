// @flow strict

import { Parser } from "../core";

describe("Parser", () => {
  describe("string", () => {
    it("parses a string", () => {
      const parser = Parser.string("foo");
      expect(parser.parse("foo")).toEqual("foo");
    });

    it("fails to parse a different string", () => {
      const parser = Parser.string("foo");
      expect(parser.parse("bar") instanceof Error).toBe(true);
    });
  });

  describe("oneOf", () => {
    it("parses the first parser", () => {
      const parser = Parser.oneOf(Parser.string("foo"), Parser.string("bar"));
      expect(parser.parse("foo")).toEqual("foo");
      expect(parser.parse("bar")).toEqual("bar");
    });

    it("fails to parse a different string", () => {
      const parser = Parser.oneOf(Parser.string("foo"), Parser.string("bar"));
      expect(parser.parse("baz") instanceof Error).toBe(true);
    });
  });

  describe("sequence", () => {
    it("parses a sequence", () => {
      const parser = Parser.sequence(
        Parser.string("foo"),
        Parser.string("bar"),
        Parser.string("baz")
      );
      expect(parser.parse("foobarbaz")).toEqual(["foo", "bar", "baz"]);
    });

    it("parses a sequence separated by whitespace", () => {
      const parser = Parser.sequence(
        Parser.string("foo"),
        Parser.string("bar"),
        Parser.string("baz")
      ).separatedBy(Parser.whitespace);
      expect(parser.parse("foo bar baz")).toEqual(["foo", "bar", "baz"]);
      expect(parser.parse("foo   bar      baz")).toEqual(["foo", "bar", "baz"]);
      expect(parser.parse("foo   bar\nbaz")).toEqual(["foo", "bar", "baz"]);
    });

    it("parses a sequence separated by optional whitespace", () => {
      const parser = Parser.sequence(
        Parser.string("foo"),
        Parser.string("bar"),
        Parser.string("baz")
      ).separatedBy(Parser.whitespace.optional);
      expect(parser.parse("foobarbaz")).toEqual(["foo", "bar", "baz"]);
      expect(parser.parse("foo bar baz")).toEqual(["foo", "bar", "baz"]);
      expect(parser.parse("foo   bar      baz")).toEqual(["foo", "bar", "baz"]);
      expect(parser.parse("foo   bar\nbaz")).toEqual(["foo", "bar", "baz"]);
    });

    it("fails to parse a different string", () => {
      const parser = Parser.sequence(
        Parser.string("foo"),
        Parser.string("bar"),
        Parser.string("baz")
      );
      expect(parser.parse("foobarqux") instanceof Error).toBe(true);
    });
  });

  describe("oneOrMore", () => {
    it("parses one or more", () => {
      const parser = Parser.oneOrMore(Parser.string("foo"));
      expect(parser.parse("foo")).toEqual(["foo"]);
      expect(parser.parse("foofoo")).toEqual(["foo", "foo"]);
      expect(parser.parse("foofoofoo")).toEqual(["foo", "foo", "foo"]);
      expect(parser.parse("foofoofoobar")).toEqual(["foo", "foo", "foo"]);
      expect(parser.parse("foofoofoofo")).toEqual(["foo", "foo", "foo"]);
    });

    it("fails to parse a different string", () => {
      const parser = Parser.oneOrMore(Parser.string("foo"));
      expect(parser.parse("bar") instanceof Error).toBe(true);
    });
  });

  describe("zeroOrMore", () => {
    it("parses zero or more", () => {
      const parser = Parser.zeroOrMore(Parser.string("foo"));
      expect(parser.parse("")).toEqual([]);
      expect(parser.parse("foo")).toEqual(["foo"]);
      expect(parser.parse("foofoo")).toEqual(["foo", "foo"]);
      expect(parser.parse("foofoofoo")).toEqual(["foo", "foo", "foo"]);
      expect(parser.parse("foofoofoobar")).toEqual(["foo", "foo", "foo"]);
      expect(parser.parse("foofoofoofo")).toEqual(["foo", "foo", "foo"]);
    });

    it("fails to parse a different string", () => {
      const parser = Parser.zeroOrMore(Parser.string("foo"));
      expect(parser.parse("bar")).toEqual([]);
    });
  });

  describe("integer", () => {
    it("parses an integer", () => {
      const parser = Parser.integer;
      expect(parser.parse("0")).toEqual(0);
      expect(parser.parse("1")).toEqual(1);
      expect(parser.parse("1234567890")).toEqual(1234567890);
      expect(parser.parse("-1")).toEqual(-1);
      expect(parser.parse("-1234567890")).toEqual(-1234567890);
    });

    // it("fails to parse a different string", () => {
    //   const parser = Parser.integer;
    //   expect(parser.parse("foo") instanceof Error).toBe(true);
    //   expect(parser.parse("1.0") instanceof Error).toBe(true);
    //   expect(parser.parse("1.") instanceof Error).toBe(true);
    //   expect(parser.parse(".0") instanceof Error).toBe(true);
    //   expect(parser.parse("0.0") instanceof Error).toBe(true);
    //   expect(parser.parse("0.") instanceof Error).toBe(true);
    //   expect(parser.parse(".") instanceof Error).toBe(true);
    // });
  });
});
