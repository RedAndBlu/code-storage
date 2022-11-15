import { swap } from "../util/swap";

type compare<T> = (a: T, b: T) => number;
interface Data<T> {
  arr: T[];
  start: number;
  end: number;
  cmp: compare<T>;
}

/** reference https://en.wikipedia.org/wiki/Quicksort */
export function quickSort<T>(arr: T[], cmp: compare<T>): T[] {
  split({ arr, start: 0, end: arr.length - 1, cmp });
  return arr;
}

function split<T>({ arr, start, end, cmp }: Data<T>): void {
  if (start < end) {
    const m = partition({ arr, start, end, cmp });
    split({ arr, start, end: m - 1, cmp });
    split({ arr, start: m + 1, end, cmp });
  }
}

export function partition<T>({ arr, start, end, cmp }: Data<T>): number {
  // prevent worst-case behavior on already sorted arrays swapping the mid value
  // alternatives swap middle index for the pivot or median-of-three
  swap(arr, start, Math.floor(Math.random() * (end - start + 1)) + start);
  let i = start;
  let j = end + 1;

  while (i < j) {
    // prefix are used to prevent infinity loops when value are equals
    // stop when the value is equal to the pivot to prevent worst case when the arr has many equals value
    while (++i < end && cmp(arr[start], arr[i]) > 0);
    while (--j > start && cmp(arr[start], arr[j]) < 0);

    if (i < j) {
      swap(arr, i, j);
    }
  }

  swap(arr, start, j);
  return j;
}
