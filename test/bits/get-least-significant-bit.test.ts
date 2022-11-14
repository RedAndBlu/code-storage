import { getLeastSignificant } from "../../src/bits/get-least-significant-bit";

describe("getLeastSignificant()", () => {
  test("getLeastSignificant(0b11001100) should return 0b100", () => {
    expect(getLeastSignificant(getLeastSignificant(0b11001100))).toBe(0b100);
  });
});
