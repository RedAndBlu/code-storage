import { tripletSum } from "../../src/stuff/triplet-sum";

describe("tripletSum", () => {
  test("should find all solutions", () => {
    expect(tripletSum(8)).toEqual([
      [1, 2, 5],
      [1, 3, 4],
    ]);
  });
});
