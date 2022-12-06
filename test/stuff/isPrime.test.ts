import { isPrime } from "../../src/stuff/isPrime";

describe("isPrime", () => {
  test("should return true when is a prime", () => {
    expect(isPrime(131_071)).toBe(true);
  });

  test("should return false when isn't a prime", () => {
    expect(isPrime(131_070)).toBe(false);
  });
});
