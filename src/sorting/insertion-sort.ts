import { swap } from "../util/swap";

/** reference https://en.wikipedia.org/wiki/Insertion_sort */
export function sort<T>(arr: T[], cmp: (a: T, b: T) => number): T[] {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0 && cmp(arr[j], arr[j - 1]) < 0; j--) {
      swap(arr, j, j - 1);
    }
  }

  return arr;
}
