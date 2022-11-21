import { quickSort3Way } from "../../src/sorting/quick-sort-3way";

describe("quickSort3Way", () => {
  test("should be able to sort in ascending order", () => {
    expect(quickSort3Way([3, 2, 2, 1], (a, b) => a - b)).toEqual([1, 2, 2, 3]);
  });

  test("should be able to sort in descending order", () => {
    expect(quickSort3Way([1, 2, 2, 3], (a, b) => b - a)).toEqual([3, 2, 2, 1]);
  });
});
