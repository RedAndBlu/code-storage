import { fibonacciBtmUp, fibonacciTopDown } from "../../src/stuff/fibonacci";

describe("fibonacci top down", () => {
  test("when n is 15 should return 610", () => {
    expect(fibonacciTopDown([], 15)).toBe(610);
  });
});

describe("fibonacci bottom up", () => {
  test("when n is 15 should return 610", () => {
    expect(fibonacciBtmUp(15)).toBe(610);
  });
});
