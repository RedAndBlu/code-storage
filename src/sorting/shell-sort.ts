import { swap } from "../util/swap";

/** reference https://en.wikipedia.org/wiki/Shellsort */
export function sort<T>(arr: T[], cmp: (a: T, b: T) => number): T[] {
  let h = 1;

  while (h < arr.length / 3) {
    h = Math.floor(3 * h + 1);
  }

  while (h >= 1) {
    for (let i = h; i < arr.length; i++) {
      for (let j = i; j >= h && cmp(arr[j], arr[j - 1]) < 0; j -= h) {
        swap(arr, j, j - h);
      }
    }

    h = Math.floor(h / 3);
  }

  return arr;
}
