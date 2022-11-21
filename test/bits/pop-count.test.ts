import { popCount32bit, countOnes } from "../../src/bits/pop-count";

describe("popCount32bit()", () => {
  test("for 1010 should return 2", () => {
    expect(popCount32bit(0b1010)).toBe(2);
  });

  test("for -1 should return 32", () => {
    expect(popCount32bit(-1)).toBe(32);
  });
});

describe("countOnes()", () => {
  test("for 111010 should return 4", () => {
    expect(countOnes(0b111010)).toBe(4);
  });

  test("should return 12", () => {
    expect(countOnes(0b111111111111)).toBe(12);
  });
});
