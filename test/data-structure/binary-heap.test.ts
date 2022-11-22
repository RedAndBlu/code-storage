import { Heap } from "../../src/data-structure/binary-heap";

let heap = new Heap<number>((a, b) => a - b);

beforeEach(() => {
  heap = new Heap<number>((a, b) => a - b);
});

describe(".insert()", () => {
  test("should add the given element", () => {
    heap.insert(2);
    expect(heap.size).toBe(1);
    expect(heap.peak()).toBe(2);
  });

  test("should add the given element as first of the queue when is the smallest", () => {
    heap.insert(4).insert(3).insert(2).insert(1);
    expect(heap.size).toBe(4);
    expect(heap.peak()).toBe(1);
  });
});

describe(".has()", () => {
  test("should return true when the element exists", () => {
    heap.insert(4).insert(3).insert(2).insert(1);
    expect(heap.has(3)).toBe(true);
  });

  test("should return false when the element doesn't exist", () => {
    heap.insert(4).insert(3).insert(2).insert(1);
    expect(heap.has(5)).toBe(false);
  });
});

describe(".pop()", () => {
  test("should get the smallest value in the heap", () => {
    heap.insert(4).insert(3).insert(2).insert(1);
    expect(heap.pop()).toBe(1);
  });

  test("should remove the returned value", () => {
    heap.insert(4).insert(3).insert(2).insert(1);
    const v = heap.pop();
    expect(heap.has(v!)).toBe(false);
  });
});

describe(".remove()", () => {
  test("should remove the given value from the heap", () => {
    heap.insert(4).insert(3).insert(2).insert(1);
    heap.remove(4);
    expect(heap.has(4)).toBe(false);
  });
});
