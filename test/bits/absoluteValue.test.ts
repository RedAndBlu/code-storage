import { abs } from "../../src/bits/absoluteValue";

describe("", () => {
  test("should return 3 for 3", () => {
    expect(abs(3)).toBe(3);
  });

  test("should return 3 for -3", () => {
    expect(abs(-3)).toBe(3);
  });
});
