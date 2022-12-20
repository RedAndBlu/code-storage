import { firstNonRepeatingLetter } from "../../src/stuff/first-non-repeating";

describe("firstNonRepeatingLetter", function () {
  it("should handle all repeating strings", function () {
    expect(firstNonRepeatingLetter("abba")).toBe("");
    expect(firstNonRepeatingLetter("bb")).toBe("");
  });

  it("should handle odd characters", function () {
    expect(firstNonRepeatingLetter("hello world, eh?")).toBe("w");
  });

  it("should handle letter cases", function () {
    expect(firstNonRepeatingLetter("sTreSS")).toBe("T");
  });
});
