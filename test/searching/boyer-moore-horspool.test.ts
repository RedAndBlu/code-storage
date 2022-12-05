import { search } from "../../src/searching/boyer-moore-horspool";

describe("boyer-moore", () => {
  test("should return index 29", () => {
    expect(search("hskdieo nxhka aksmxka as sql ikaine sassa", "kaine")).toBe(
      30
    );
  });

  test("should return -1 when not found", () => {
    expect(search("hskdieo nxhka aksmxka as sql ikaine sassa", "zoine")).toBe(
      -1
    );
  });
});
