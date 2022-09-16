import { combination } from "../../src/permutation/combinationSet";

describe("combination()", () => {
  test("combination([10, 30, 50, 70, 90], 3)", () => {
    expect(combination([10, 30, 50, 70, 90], 3)).toEqual([
      [10, 30, 50],
      [10, 30, 70],
      [10, 30, 90],
      [10, 50, 70],
      [10, 50, 90],
      [10, 70, 90],
      [30, 50, 70],
      [30, 50, 90],
      [30, 70, 90],
      [50, 70, 90],
    ]);
  });

  test("combination([10, 30, 50, 70, 90], 4)", () => {
    expect(combination([10, 30, 50, 70, 90], 4)).toEqual([
      [10, 30, 50, 70],
      [10, 30, 50, 90],
      [10, 30, 70, 90],
      [10, 50, 70, 90],
      [30, 50, 70, 90],
    ]);
  });
});
