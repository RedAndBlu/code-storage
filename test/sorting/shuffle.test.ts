import { shuffle } from "../../src/sorting/shuffle";

describe("shuffle", () => {
  test("should return the given array shuffled", () => {
    const arr = [1, 2, 3, 4, 5, 6, 6];
    expect(shuffle(arr.slice())).not.toBe(arr);
  });
});
