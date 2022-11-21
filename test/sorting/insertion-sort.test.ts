import { sort } from "../../src/sorting/insertion-sort";

describe("insertion sort", () => {
  test("should be able to sort in ascending order", () => {
    expect(sort([3, 2, 2, 1], (a, b) => a - b)).toEqual([1, 2, 2, 3]);
  });

  test("should be able to sort in descending order", () => {
    expect(sort([1, 2, 2, 3], (a, b) => b - a)).toEqual([3, 2, 2, 1]);
  });
});
