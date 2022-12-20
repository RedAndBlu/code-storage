import { digitalRoot } from "../../src/stuff/digital-root";

describe("digitalRoot()", () => {
  test("should sum of all the digits in a number recursively", () => {
    expect(digitalRoot(992)).toBe(2);
    expect(digitalRoot(999999999999)).toBe(9);
  });
});
