import { isPowerOfTwo } from "../../src/bits/power-of-two";

describe("isPowerOfTwo()", () => {
  test("isPowerOfTwo(4) should return true", () => {
    expect(isPowerOfTwo(4)).toBe(true);
  });

  test("isPowerOfTwo(5) should return false", () => {
    expect(isPowerOfTwo(5)).toBe(false);
  });
});
