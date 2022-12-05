type compare<T> = (a: T, b: T) => number;

export function binarySearch<T>(arr: T[], cmp: compare<T>, val: T): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const m = Math.floor((left + right) / 2);

    if (cmp(val, arr[m]) < 0) {
      right = m - 1;
    } else if (cmp(val, arr[m]) > 0) {
      left = m + 1;
    } else {
      return m;
    }
  }

  return -1;
}
