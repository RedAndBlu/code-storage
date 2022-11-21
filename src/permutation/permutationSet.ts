import { swap } from "../util/swap";

export function permutation(set: number[]): number[][] {
  const perms: number[][] = [];

  function perm(set: number[], l: number) {
    if (l === set.length) {
      perms.push(set.slice());
    }

    for (let i = l; i < set.length; i++) {
      swap(set, l, i);

      perm(set, l + 1);
      swap(set, l, i);
    }
  }

  perm(set, 0);
  return perms;
}
