import { tspNearestNeighbor } from "../../src/approximations/tsp-nearest-neighbour";
import { tourLength } from "../../src/util/tourLength";

describe("tspNearestNeighbor", () => {
  // shortest tour from zero 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0 = 9 (or the inverse)
  const sample = [
    [0, 1, 3, 5, 8, 2],
    [1, 0, 2, 6, 9, 3],
    [9, 2, 0, 1, 9, 8],
    [7, 4, 1, 0, 2, 7],
    [6, 5, 8, 2, 0, 1],
    [2, 6, 7, 8, 1, 0],
  ];
  const rst = tspNearestNeighbor(sample, 0);

  test("should be able to traverse all vertex once", () => {
    expect(rst.length).toBe(sample.length);
    expect(rst).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  });

  test("the tour resulting length should at most twice the optimal tour", () => {
    const len = tourLength(rst, sample, 0, rst.length - 1);
    expect(len).toBeLessThanOrEqual(9 * 2);
    expect(len).toBeGreaterThanOrEqual(9);
  });
});
