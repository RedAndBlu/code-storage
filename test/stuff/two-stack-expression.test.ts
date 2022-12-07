import { twoStackExp } from "../../src/stuff/two-stack-expression";

describe("twoStackExp", () => {
  test("input ((((15 - 3) / 2) * 3) + 2) should return 20", () => {
    expect(twoStackExp("((((15 - 3) / 2) * 3) + 2)")).toBe(20);
  });

  test("input ((((15 + 5) * 2) / 10) + 1) should return 5", () => {
    expect(twoStackExp("((((15 + 5) * 2) / 10) + 1)")).toBe(5);
  });
});
