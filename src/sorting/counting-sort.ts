// reference https://en.wikipedia.org/wiki/Counting_sort
export function countingSort<T>(
  arr: T[],
  toInteger: (a: T) => number,
  radix: number
): T[] {
  const copy = arr.slice();
  const count = new Array(radix + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[toInteger(arr[i])]++;
  }

  for (let i = 0, less = 0; i < radix + 1; i++) {
    const c = count[i];
    count[i] = less;
    less += c;
  }

  for (let i = 0; i < arr.length; i++) {
    copy[count[toInteger(arr[i])]++] = arr[i];
  }

  copy.forEach((v, i) => (arr[i] = v));
  return arr;
}
