import { swap } from "../util/swap";

type compare<T> = (a: T, b: T) => number;

/** reference https://en.wikipedia.org/wiki/Quicksort#Repeated_elements */
export function quickSort3Way<T>(arr: T[], cmp: compare<T>): T[] {
  sort(arr, 0, arr.length - 1, cmp);
  return arr;
}

function sort<T>(arr: T[], l: number, r: number, cmp: compare<T>): void {
  if (l < r) {
    swap(arr, l, Math.floor(Math.random() * (r - l + 1)) + l);
    let pvt = l;
    let i = l + 1;
    let gt = r;

    while (i <= gt) {
      const rst = cmp(arr[pvt], arr[i]);

      if (rst > 0) {
        swap(arr, pvt++, i++);
      } else if (rst < 0) {
        swap(arr, gt--, i);
      } else {
        i++;
      }
    }

    sort(arr, l, pvt - 1, cmp);
    sort(arr, gt + 1, r, cmp);
  }
}
