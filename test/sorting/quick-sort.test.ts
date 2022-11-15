import { quickSort } from "../../src/sorting/quick-sort";

describe("quickSort", () => {
  test("should be able to sort in ascending order", () => {
    expect(quickSort([3, 2, 2, 1], (a, b) => a - b)).toEqual([1, 2, 2, 3]);
  });

  test("should be able to sort in descending order", () => {
    expect(quickSort([1, 2, 2, 3], (a, b) => b - a)).toEqual([3, 2, 2, 1]);
  });
});
