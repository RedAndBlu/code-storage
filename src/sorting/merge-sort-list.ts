import { DoublyLinkedList as List } from "../data-structure/doubly-linked-list";

type compare<T> = (a: T, b: T) => number;

// reference https://en.wikipedia.org/wiki/Merge_sort
export function mergeSort<T>(list: List<T>, cmp: compare<T>): List<T> {
  if (list.size <= 1) {
    return list;
  }

  const size = list.size;
  let left = new List<T>();
  let right = new List<T>();

  for (let i = 0; i < size; i++) {
    if (i < size / 2) {
      left.push(list.shift()!);
    } else {
      right.push(list.shift()!);
    }
  }

  left = mergeSort(left, cmp);
  right = mergeSort(right, cmp);
  return merge(left, right, cmp);
}

function merge<T>(left: List<T>, right: List<T>, cmp: compare<T>): List<T> {
  const merged = new List<T>();

  while (left.size > 0 || right.size > 0) {
    if (
      left.size > 0 &&
      (right.size === 0 || cmp(left.peakFront()!, right.peakFront()!) <= 0)
    ) {
      merged.push(left.shift()!);
    } else {
      merged.push(right.shift()!);
    }
  }

  return merged;
}
