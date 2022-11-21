import { lsdRadixSort } from "../../src/sorting/lsd-sort";

describe("lsd()", () => {
  test("should be able to sort a random set of words", () => {
    const chars = "qwertyuiopasdfghjklzxcvbnm";
    const rdmChar = () => chars[Math.floor(Math.random() * chars.length)];
    const rdmSize = () => Math.floor(Math.random() * 14);
    const rdmWord = () =>
      Array.from({ length: rdmSize() }, () => rdmChar()).join("");
    const sample = Array.from({ length: 25 }, () => rdmWord());
    const sortedSample = sample.slice().sort();
    expect(lsdRadixSort(sample, 255)).toEqual(sortedSample);
  });
});
