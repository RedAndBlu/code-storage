import { countingSort } from "../../src/sorting/counting-sort";

describe("countingSort()", () => {
  test("should be able to sort an array of chars", () => {
    expect(
      countingSort(["d", "c", "b", "a"], (c) => c.charCodeAt(0), 255)
    ).toEqual(["a", "b", "c", "d"]);
  });

  test("should be able to sort an array of Integer", () => {
    expect(countingSort([4, 3, 2, 1], (i) => i, 10)).toEqual([1, 2, 3, 4]);
  });
});
