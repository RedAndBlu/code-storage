type compare<T> = (a: T, b: T) => number;
interface Data<T> {
  arr: T[];
  copy: T[];
  start: number;
  end: number;
  cmp: compare<T>;
}

/** reference https://en.wikipedia.org/wiki/Merge_sort */
export function mergeSort<T>(arr: T[], cmp: compare<T>): T[] {
  split({ arr, copy: arr.slice(), start: 0, end: arr.length, cmp });
  return arr;
}

function split<T>({ arr, copy, start, end, cmp }: Data<T>): void {
  if (end - start > 1) {
    const mid = Math.floor((start + end) / 2);

    split({ arr: copy, copy: arr, start, end: mid, cmp });
    split({ arr: copy, copy: arr, start: mid, end, cmp });
    merge({ arr, copy, start, end, cmp }, mid);
  }
}

function merge<T>({ arr, copy, start, end, cmp }: Data<T>, mid: number): void {
  let left = start;
  let right = mid;

  for (let i = start; i < end; i++) {
    if (left < mid && (right >= end || cmp(copy[left], copy[right]) <= 0)) {
      arr[i] = copy[left++];
    } else {
      arr[i] = copy[right++];
    }
  }
}

// bottom up approach https://en.wikipedia.org/wiki/Merge_sort
export function mergeIterativeSort<T>(arr: T[], cmp: compare<T>): T[] {
  for (let sz = 1; sz < arr.length; sz *= 2) {
    let copy = arr.slice();

    for (let i = 0; i < arr.length; i += sz * 2) {
      merge(
        {
          arr,
          copy,
          start: i,
          end: Math.min(i + sz * 2, arr.length),
          cmp,
        },
        Math.min(i + sz, arr.length)
      );
    }
  }

  return arr;
}
