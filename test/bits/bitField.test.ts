import { setBitField, extractBitField } from "../../src/bits/bitField";

describe("setBitField()", () => {
  test("setBitField(0b11001100, 0b11, 4) should return 0b11111100", () => {
    expect(setBitField(0b11001100, 0b11, 4)).toBe(0b11111100);
  });
});

describe("extractBitField()", () => {
  test("extractBitField(0b1111, 0b1100, 2) should return 0b11", () => {
    expect(extractBitField(0b1111, 0b1100, 2)).toBe(0b11);
  });

  test("extractBitField(0b111111, 0b100000, 5) should return 0b1", () => {
    expect(extractBitField(0b111111, 0b100000, 5)).toBe(0b1);
  });
});
