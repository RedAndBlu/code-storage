import { fixPermutation } from "../../src/permutation/fix-permutation";

describe("fixPermutation()", () => {
  test("should return 6 permutations", () => {
    expect(fixPermutation([5, 1, 3, 7, 9], new Set([1, 3]))).toHaveLength(6);
  });

  test("should return 24 permutations", () => {
    expect(fixPermutation([5, 1, 3, 7, 9, 18], new Set([1, 3]))).toHaveLength(
      24
    );
  });
});
