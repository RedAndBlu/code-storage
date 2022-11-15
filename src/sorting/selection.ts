import { partition } from "./quick-sort";

type compare<T> = (a: T, b: T) => number;

/** reference https://en.wikipedia.org/wiki/Quickselect */
export function selection<T>(
  arr: T[],
  index: number,
  cmp: compare<T>
): T | undefined {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const p = partition({ arr, start: start, end: end, cmp });

    if (p > index) {
      end = p - 1;
    } else if (p < index) {
      start = p + 1;
    } else {
      return arr[p];
    }
  }
}
