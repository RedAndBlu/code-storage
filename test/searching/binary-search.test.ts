import { binarySearch } from "../../src/searching/binary-search";

describe("binarySearch()", () => {
  const sample = Array.from({ length: 100 }, (_, i) => i);

  test("should find the index of the given value", () => {
    expect(binarySearch(sample, (a, b) => a - b, 50)).toBe(50);
  });

  test("should return -1 when the value doesn't exist", () => {
    expect(binarySearch(sample, (a, b) => a - b, 111)).toBe(-1);
  });
});
