import { tpsMultiFragment } from "../../src/approximations/tsp-multi-fragments";
import { tourLength } from "../../src/util/tourLength";

describe("tpsMultiFragment", () => {
  // shortest tour from zero 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0 = 9 (or the inverse)
  const sample = [
    [0, 1, 3, 5, 8, 2],
    [1, 0, 2, 6, 9, 3],
    [9, 2, 0, 1, 9, 8],
    [7, 4, 1, 0, 2, 7],
    [6, 5, 8, 2, 0, 1],
    [2, 6, 7, 8, 1, 0],
  ];
  const rst = tpsMultiFragment(sample);

  test("the tail city should be equal to the head city of the tour", () => {
    expect(rst[0]).toBe(rst[rst.length - 1]);
  });

  test("should be able to traverse all vertex once", () => {
    expect(rst.length).toBe(sample.length + 1);
    expect(rst).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  });

  test("the tour resulting length should at most twice the optimal tour", () => {
    const len = tourLength(rst, sample, 0, rst.length - 1);
    expect(len).toBeLessThanOrEqual(9 * 2);
    expect(len).toBeGreaterThanOrEqual(9);
  });
});
