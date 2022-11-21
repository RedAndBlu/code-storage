import { DoublyLinkedList as List } from "../../src/data-structure/doubly-linked-list";

let list = new List();

beforeEach(() => {
  list = new List();
});

describe(".push()", () => {
  test("should add an element", () => {
    expect(list.push(1).peakFront()).toBe(1);
    expect(list.size).toBe(1);
  });

  test("should add an element as last", () => {
    expect(list.push(1).push(2).peakBack()).toBe(2);
    expect(list.size).toBe(2);
  });
});

describe(".unshift()", () => {
  test("should add an element", () => {
    expect(list.unshift(1).peakFront()).toBe(1);
    expect(list.size).toBe(1);
  });

  test("should add an element as first", () => {
    expect(list.unshift(1).unshift(2).peakFront()).toBe(2);
    expect(list.size).toBe(2);
  });
});

describe(".pop()", () => {
  test("should get and remove the last element in the list", () => {
    list.push(1).push(2).push(3);
    expect(list.size).toBe(3);
    expect(list.pop()).toBe(3);
    expect(list.size).toBe(2);
  });
});

describe(".shift()", () => {
  test("should get and remove the first element in the list", () => {
    list.unshift(1).unshift(2).unshift(3);
    expect(list.size).toBe(3);
    expect(list.shift()).toBe(3);
    expect(list.size).toBe(2);
  });
});

describe(".valueAt()", () => {
  test("should get the value at the given index", () => {
    list.unshift(1).unshift(2).unshift(3).unshift(4).unshift(5);
    expect(list.valueAt(2)).toBe(3);
  });
});

describe(".deleteAt()", () => {
  test("should remove the value at the given index", () => {
    list.unshift(1).unshift(2).unshift(3).unshift(4).unshift(5);
    list.deleteAt(2);
    expect(list.valueAt(2)).toBe(2);
    expect(list.size).toBe(4);
  });
});

describe(".has()", () => {
  test("should return true if the value exist in the list", () => {
    list.unshift(1).unshift(2).unshift(3).unshift(4).unshift(5);
    expect(list.has(2)).toBe(true);
  });

  test("should return false if the value doesn't exist in the list", () => {
    list.unshift(1).unshift(2).unshift(3).unshift(4).unshift(5);
    expect(list.has(6)).toBe(false);
  });
});

describe(".delete()", () => {
  test("should remove the given value from he list", () => {
    list.unshift(1).unshift(2).unshift(3).unshift(4).unshift(5);
    list.delete(2);
    expect(list.has(2)).toBe(false);
  });
});

describe(".reverse()", () => {
  test("should reverse the given list", () => {
    list.unshift(1).unshift(2).unshift(3).unshift(4).unshift(5);
    expect([...list]).toEqual([5, 4, 3, 2, 1]);
    expect([...list.reverse()]).toEqual([1, 2, 3, 4, 5]);
  });
});
