interface Data {
  arr: string[];
  copy: string[];
  radix: number;
  start: number;
  end: number;
  at: number;
}

// reference https://en.wikipedia.org/wiki/Radix_sort
export function msdSort(arr: string[], radix: number): string[] {
  const copy = arr.slice();
  sort({ arr, copy, radix, start: 0, end: arr.length, at: 0 });
  return arr;
}

function sort({ arr, copy, radix, start, end, at }: Data): void {
  if (start >= end) return;
  // +1 is for the empty char
  const count = new Array(radix + 1).fill(0);

  for (let i = start; i < end; i++) {
    count[codeAt(arr[i], at)]++;
  }

  let lessThanCurrent = 0; // alternative put start here
  for (let i = 0; i < count.length; i++) {
    const current = count[i];
    count[i] = lessThanCurrent;
    lessThanCurrent += current;
  }

  for (let i = start; i < end; i++) {
    copy[count[codeAt(arr[i], at)]++] = arr[i];
  }

  for (let i = start; i < end; i++) {
    arr[i] = copy[i - start]; // alternative start only copy[i]
  }

  // skip the first index are empty chars endings (maybe)
  for (let i = 1; i < count.length - 1; i++) {
    sort({
      arr,
      copy,
      radix,
      start: start + count[i], // with alternative start only copy[i]
      end: start + count[i + 1], // with alternative start only copy[i + 1]
      at: at + 1,
    });
  }
}

function codeAt(str: string, at: number): number {
  if (str.length <= at) {
    return 0;
  }

  return str.charCodeAt(at);
}
