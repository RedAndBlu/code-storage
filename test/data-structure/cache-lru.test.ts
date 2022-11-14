import { CacheLRU } from "../../src/data-structure/cache-lru";

describe(".set()", () => {
  const ch = new CacheLRU<number, string>(2);

  test("should add the element as the last entry", () => {
    ch.set(1, "a");
    expect(ch.peak()).toBe("a");
    ch.set(2, "b");
    expect(ch.peak()).toBe("b");
  });

  test("should remove the least recently used element when the storage capacity is full", () => {
    ch.set(3, "c");
    expect(ch.peak()).toBe("c");
    expect(ch.get(1)).toBeUndefined();
  });
});

describe(".get()", () => {
  const ch = new CacheLRU<number, string>(3);

  test("when getting an element should refresh the element position", () => {
    ch.set(1, "a");
    ch.set(2, "b");
    ch.set(3, "c");
    expect(ch.peak()).toBe("c");
    expect(ch.get(1)).toBe("a");
    expect(ch.peak()).toBe("a");
  });
});
