import { RabinKarpStringMatch } from "../../src/searching/rabin-karp-string-match";

describe("boyer-moore", () => {
  const matcher = new RabinKarpStringMatch("kaine");

  test("should return index 29", () => {
    expect(matcher.search("hskdieo nxhka aksmxka as sql ikaine sassa")).toBe(
      30
    );
  });

  test("should return -1 when not found", () => {
    expect(matcher.search("hskdieo nxhka aksmxka as sql ikayne sassa")).toBe(
      -1
    );
  });
});
