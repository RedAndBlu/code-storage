import { roundUpToPow2 } from "../../src/bits/round-up-to-pow2";

describe("roundUpToPow2()", () => {
  test("roundUpToPow2(14) should return 16", () => {
    expect(roundUpToPow2(14)).toBe(16);
  });

  test("roundUpToPow2(1000) should return 1024", () => {
    expect(roundUpToPow2(1000)).toBe(1024);
  });
});
