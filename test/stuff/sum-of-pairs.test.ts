import { sumPairs } from "../../src/stuff/sum-of-pairs";

describe("sum-of-pairs", () => {
  test("[1, 4, 8, 7, 3, 15] should return [1, 7] for sum 8", () => {
    expect(sumPairs([1, 4, 8, 7, 3, 15], 8)).toEqual([1, 7]);
  });

  test("[1, -2, 3, 0, -6, 1] should return [0, -6] for sum -6", () => {
    expect(sumPairs([1, -2, 3, 0, -6, 1], -6)).toEqual([0, -6]);
  });

  test("[20, -13, 40] should return undefined for sum -7", () => {
    expect(sumPairs([20, -13, 40], -7)).toBeUndefined();
  });

  test("[4, -2, 3, 3, 4] should return [4, 4] for sum 8", () => {
    expect(sumPairs([4, -2, 3, 3, 4], 8)).toEqual([4, 4]);
  });
});
