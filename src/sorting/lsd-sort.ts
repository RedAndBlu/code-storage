// reference https://en.wikipedia.org/wiki/Radix_sort
export function lsdRadixSort(arr: string[], radix: number) {
  const len = Math.max(...arr.map((s) => s.length));
  const copy = arr.slice();

  for (let at = len - 1; at >= 0; at--) {
    const count = new Array(radix + 1).fill(0);

    for (let i = 0; i < arr.length; i++) {
      count[codeAt(arr[i], at)]++;
    }

    let lessThanCurrent = 0;
    for (let i = 0; i < count.length; i++) {
      const current = count[i];
      count[i] = lessThanCurrent;
      lessThanCurrent += current;
    }

    for (let i = 0; i < arr.length; i++) {
      copy[count[codeAt(arr[i], at)]++] = arr[i];
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = copy[i];
    }
  }

  return arr;
}

function codeAt(str: string, at: number): number {
  if (str.length <= at) {
    return 0;
  }

  return str.charCodeAt(at);
}
