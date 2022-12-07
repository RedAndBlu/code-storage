import { setCover } from "../../src/approximations/cover-set";

describe("seCover", () => {
  const u = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const sets = [
    [1, 8],
    [2, 3, 9, 10],
    [5, 6, 7, 8, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
  ];
  const rst = setCover(u.slice(), sets.slice());

  test("the returned set should cover all elements in u", () => {
    expect(rst.flat()).toEqual(expect.arrayContaining(u));
  });

  test("shoulden't callect all sets", () => {
    expect(rst.length).toBeLessThan(sets.length);
  });
});
