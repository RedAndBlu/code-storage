import { brainFuck } from "../../src/stuff/brain-fuck";

describe("brainFuck", () => {
  test("the give code should return H", () => {
    expect(
      brainFuck(",>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.", String.fromCharCode(8, 9))
    ).toBe(String.fromCharCode(72));
  });
});
