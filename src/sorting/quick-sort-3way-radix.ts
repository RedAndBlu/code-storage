import { swap } from "../util/swap";

export function quickSort3WayRadix(arr: string[]): string[] {
  sort(arr, 0, arr.length - 1, 0);
  return arr;
}

function sort(arr: string[], left: number, right: number, at: number): void {
  if (left >= right) return;
  swap(arr, left, Math.floor(Math.random() * (right - left + 1)) + left);
  let lt = left;
  let i = left + 1;
  let gt = right;
  const pivot = codeAt(arr[lt], at);

  while (i <= gt) {
    if (codeAt(arr[i], at) < pivot) {
      swap(arr, i++, lt++);
    } else if (codeAt(arr[i], at) > pivot) {
      swap(arr, i, gt--);
    } else {
      i++;
    }
  }

  sort(arr, left, lt - 1, at);
  sort(arr, gt + 1, right, at);

  if (pivot !== 0) {
    sort(arr, lt, gt, at + 1);
  }
}

function codeAt(str: string, at: number): number {
  if (str.length <= at) {
    return 0;
  }

  return str.charCodeAt(at);
}
