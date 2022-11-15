import { heapSort } from "../../src/sorting/heapsort";

describe("shell sort", () => {
  test("should be able to sort in ascending order", () => {
    expect(heapSort([3, 2, 2, 1], (a, b) => a - b)).toEqual([1, 2, 2, 3]);
  });

  test("should be able to sort in descending order", () => {
    expect(heapSort([1, 2, 2, 3], (a, b) => b - a)).toEqual([3, 2, 2, 1]);
  });
});
