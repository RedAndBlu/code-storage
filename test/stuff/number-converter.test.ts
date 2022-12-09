import { decimalToBase, toDecimal } from "../../src/stuff/number-converter";

describe("decimalToBase()", () => {
  test("decimalToBase(337, 2)", () => {
    expect(decimalToBase(337, 2)).toEqual([1, 0, 1, 0, 1, 0, 0, 0, 1]);
  });

  test("decimalToBase(337, 8)", () => {
    expect(decimalToBase(337, 8)).toEqual([5, 2, 1]);
  });

  test("decimalToBase(337, 16)", () => {
    expect(decimalToBase(337, 16)).toEqual([1, 5, 1]);
  });
});

describe("toDecimal()", () => {
  test("toDecimal([1, 0, 1, 1], 2)", () => {
    expect(toDecimal([1, 0, 1, 1], 2)).toBe(11);
  });

  test("toDecimal([1, 3, 7], 8)", () => {
    expect(toDecimal([1, 3, 7], 8)).toBe(95);
  });

  test("toDecimal([10, 0, 0], 16)", () => {
    expect(toDecimal([10, 0, 0], 16)).toBe(2560);
  });
});
