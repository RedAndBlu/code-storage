import { gcd, lcm } from "../../src/stuff/gcd";

describe("gcd()", () => {
  test("gcd(48, 180) should return 12", () => {
    expect(gcd(48, 180)).toBe(12);
  });
});

describe("lcm()", () => {
  test("lcm(48, 180) should return 720", () => {
    expect(lcm(48, 180)).toBe(720);
  });
});
