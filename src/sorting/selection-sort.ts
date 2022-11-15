import { swap } from "../util/swap";

/** reference https://en.wikipedia.org/wiki/Selection_sort */
export function sort<T>(arr: T[], cmp: (a: T, b: T) => number): T[] {
  for (let i = 0; i < arr.length; i++) {
    let smallest = i;

    for (let j = i + 1; j < arr.length; j++) {
      smallest = cmp(arr[smallest], arr[j]) <= 0 ? smallest : j;
    }

    swap(arr, smallest, i);
  }

  return arr;
}
