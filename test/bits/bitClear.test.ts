import { bitClear } from "../../src/bits/bitClear";

describe("clearBit()", () => {
  test("clearBit(7, 2) should return 3", () => {
    expect(bitClear(7, 2)).toBe(3);
  });

  test("clearBit(1, 0) should return 0", () => {
    expect(bitClear(1, 0)).toBe(0);
  });
});
