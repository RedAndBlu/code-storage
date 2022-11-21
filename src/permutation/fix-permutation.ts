import { swap } from "../util/swap";

/** return all the permutations of the given set without moving the fixed indices */
export function fixPermutation<T>(set: T[], fixed: Set<number>): T[][] {
  const rst: T[][] = [];

  function perm(arr: T[], l: number) {
    if (arr.length === l + 1) {
      rst.push(arr.slice());
      return;
    }

    if (fixed.has(l)) {
      perm(arr, l + 1);
      return;
    }

    for (let i = l; i < arr.length; i++) {
      if (fixed.has(i)) continue;
      swap(arr, l, i);
      perm(arr, l + 1);
      swap(arr, l, i);
    }
  }

  perm(set, 0);
  return rst;
}
