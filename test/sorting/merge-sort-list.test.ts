import { DoublyLinkedList as List } from "../../src/data-structure/doubly-linked-list";
import { mergeSort } from "../../src/sorting/merge-sort-list";

describe("merge sort list", () => {
  test("should be able to sort in ascending order", () => {
    const list = new List<number>().push(4).push(3).push(2).push(1);
    const m = [...mergeSort(list, (a, b) => a - b)];
    expect(m).toEqual([1, 2, 3, 4]);
  });

  test("should be able to sort in descending order", () => {
    const list = new List<number>().push(1).push(2).push(3).push(4);
    const m = [...mergeSort(list, (a, b) => b - a)];
    expect(m).toEqual([4, 3, 2, 1]);
  });
});
