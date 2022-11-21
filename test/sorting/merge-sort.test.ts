import { mergeSort, mergeIterativeSort } from "../../src/sorting/merge-sort";

describe("mergeSort", () => {
  test("should be able to sort in ascending order", () => {
    expect(mergeSort([3, 2, 2, 1], (a, b) => a - b)).toEqual([1, 2, 2, 3]);
  });

  test("should be able to sort in descending order", () => {
    expect(mergeSort([1, 2, 2, 3], (a, b) => b - a)).toEqual([3, 2, 2, 1]);
  });
});

describe("mergeIterativeSort", () => {
  test("should be able to sort in ascending order", () => {
    expect(mergeIterativeSort([3, 2, 2, 1], (a, b) => a - b)).toEqual([
      1, 2, 2, 3,
    ]);
  });

  test("should be able to sort in descending order", () => {
    expect(mergeIterativeSort([1, 2, 2, 3], (a, b) => b - a)).toEqual([
      3, 2, 2, 1,
    ]);
  });
});
