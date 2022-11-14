import { bitFlip } from "../../src/bits/bitFlip";

describe("bitFlip()", () => {
  test("bitFlip(3, 1) should return 1", () => {
    expect(bitFlip(3, 1)).toBe(1);
  });

  test("bitFlip(19, 27) should return 1", () => {
    expect(bitFlip(0b10011, 3)).toBe(0b11011);
  });
});
