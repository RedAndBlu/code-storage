import { knapsack } from "../../src/approximations/knapsack";

describe("knapsack", () => {
  const sample = [
    { value: 3, weight: 1 },
    { value: 2, weight: 2 },
    { value: 3, weight: 2 },
    { value: 10, weight: 4 },
    { value: 7, weight: 3 },
    { value: 7, weight: 3 },
  ];
  const rst = knapsack(sample, 6);

  test("should return some items", () => {
    expect(rst.length).toBeGreaterThan(0);
  });

  test("the returned sum of values should be at most twice the optimal", () => {
    expect(rst.reduce((a, b) => a + b.value, 0)).toBeLessThanOrEqual(17 * 2);
  });
});
