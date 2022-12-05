import { tspBruteForce } from "../../src/approximations/tsp-brute-force";
import { tourLength } from "../../src/util/tourLength";

describe("tspBruteForce", () => {
  // shortest tour from zero 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0 = 9 (or the inverse)
  const sample = [
    [0, 1, 3, 5, 8, 2],
    [1, 0, 2, 6, 9, 3],
    [9, 2, 0, 1, 9, 8],
    [7, 4, 1, 0, 2, 7],
    [6, 5, 8, 2, 0, 1],
    [2, 6, 7, 8, 1, 0],
  ];
  const rst = tspBruteForce(sample, 0)!;

  test("the tail city should be equal to the head city of the tour", () => {
    expect(rst[0]).toBe(rst[rst.length - 1]);
  });

  test("should be able to traverse all vertex once", () => {
    expect(rst.length).toBe(sample.length + 1);
    expect(rst).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
  });

  test("the tour should be the optimal tour", () => {
    const len = tourLength(rst, sample, 0, rst.length - 1);
    expect(len).toBe(9);
  });
});
