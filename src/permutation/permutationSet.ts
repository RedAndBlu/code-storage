function swap(arr: number[], i: number, j: number): void {
  const temp: number = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function permutation(set: number[]): number[][] {
  const perms: number[][] = [];

  function permutate(set: number[], l: number) {
    if (l === set.length) {
      perms.push(set.slice());
    }

    for (let i = l; i < set.length; i++) {
      swap(set, l, i);
      permutate(set, l + 1);
      swap(set, l, i);
    }
  }

  permutate(set, 0);
  return perms;
}
