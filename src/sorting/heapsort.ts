import { swap } from "../util/swap";

type Compare<T> = (a: T, b: T) => number;

// reference https://en.wikipedia.org/wiki/Heapsort
export function heapSort<T>(arr: T[], cmp: Compare<T>): T[] {
  heapify(arr, cmp);
  let iLast = arr.length - 1;

  while (iLast > 0) {
    swap(arr, iLast--, 0);
    sink(arr, iLast, 0, cmp);
  }

  return arr;
}

function sink<T>(arr: T[], last: number, i: number, cmp: Compare<T>): void {
  let tg = i;
  const left = i * 2 + 1;
  const right = i * 2 + 2;

  if (left <= last && cmp(arr[left], arr[tg]) > 0) {
    tg = left;
  }
  if (right <= last && cmp(arr[right], arr[tg]) > 0) {
    tg = right;
  }
  if (tg !== i) {
    swap(arr, tg, i);
    sink(arr, last, tg, cmp);
  }
}

function heapify<T>(arr: T[], cmp: Compare<T>): void {
  const iLast = arr.length - 1;

  for (let i = Math.floor((iLast - 1) / 2); i >= 0; i--) {
    sink(arr, iLast, i, cmp);
  }
}
