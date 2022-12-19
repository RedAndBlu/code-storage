import { bitSwap } from "../../src/bits/bit-swap";

describe("", () => {
  test("", () => {
    const elms: [number, number] = [9, 22];
    bitSwap(elms);
    expect(elms).toEqual([22, 9]);
  });
});
