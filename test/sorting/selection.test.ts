import { selection } from "../../src/sorting/selection";

describe("selection", () => {
  test("should return the nth smallest element when searching in ascending order", () => {
    const sample = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(selection(sample, 10, (a, b) => a - b)).toBe(11);
  });

  test("should return the nth largest element when searching in descending order", () => {
    const sample = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(selection(sample, 10, (a, b) => b - a)).toBe(90);
  });
});
