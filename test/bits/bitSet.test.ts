import { bitSet } from "../../src/bits/bitSet";

describe("bitSet()", () => {
  test("bitSet(11, 2) should return 15", () => {
    expect(bitSet(11, 2)).toBe(15);
  });

  test("bitSet(11, 1) should return 11", () => {
    expect(bitSet(11, 1)).toBe(11);
  });
});
