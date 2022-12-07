import { tspMinSpanTree } from "../../src/approximations/tsp-min-span-tree";
import { tpsReverseSegments } from "../../src/approximations/tsp-reverse-segs";
import { tourLength } from "../../src/util/tourLength";

describe("tpsReverseSegments", () => {
  // shortest tour from zero 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0 = 9 (or the inverse)
  const sample = [
    [0, 1, 3, 5, 8, 2],
    [1, 0, 2, 6, 9, 3],
    [9, 2, 0, 1, 9, 8],
    [7, 4, 1, 0, 2, 7],
    [6, 5, 8, 2, 0, 1],
    [2, 6, 7, 8, 1, 0],
  ];
  const originalApx = tspMinSpanTree(sample, 0);
  const rst = tpsReverseSegments(originalApx.slice(), sample);

  test("should be able to traverse all vertex once", () => {
    expect(rst.length).toBe(sample.length);
    expect(rst).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  });

  test("the tour resulting length should at most twice the optimal tour", () => {
    const len = tourLength(rst, sample, 0, rst.length - 1);
    expect(len).toBeLessThanOrEqual(9 * 2);
    expect(len).toBeGreaterThanOrEqual(9);
  });

  test("the tour should be improved respect to the original approximation", () => {
    expect(tourLength(originalApx, sample, 0, rst.length - 1)).toBeGreaterThan(
      tourLength(rst, sample, 0, rst.length - 1)
    );
  });
});
