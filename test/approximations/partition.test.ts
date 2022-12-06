import { partition } from "../../src/approximations/partition";

describe("partition", () => {
  const rdmSet = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 100)
  );
  const rst = partition(rdmSet);
  const sum = (a: number, b: number) => a + b;

  test("the sum of the two partition should be equal to the given set", () => {
    expect(rst[0].reduce(sum, 0) + rst[1].reduce(sum, 0)).toBe(
      rdmSet.reduce(sum, 0)
    );
  });

  test("the approximation ratio shouldn't worst than 7/6", () => {
    const sumSetA = rst[0].reduce(sum, 0);
    const sumSetB = rst[1].reduce(sum, 0);
    const ratio = sumSetA > sumSetB ? sumSetA / sumSetB : sumSetB / sumSetA;
    expect(ratio).toBeLessThanOrEqual(7 / 6);
  });
});
