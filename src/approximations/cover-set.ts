// this is a greedy algorithm for polynomial time approximation of set covering
// check: https://en.wikipedia.org/wiki/Set_cover_problem
export function setCover(u: number[], sets: number[][]): number[][] {
  let cover: number[][] = [];

  while (u.length !== 0) {
    const set = uncoveredSet(u, sets);

    if (!set) {
      break;
    }

    cover.push(set);
    u = u.filter((v: number) => !set.includes(v));
  }

  return cover;
}

// return tge set with largest number of uncovered elements in u
function uncoveredSet(u: number[], sets: number[][]): number[] | void {
  let largerIdx = null;
  let larger: number = 0;

  for (let i: number = 0; i < sets.length; i++) {
    const sz: number = sets[i].reduce((a, v) => (u.includes(v) ? ++a : a), 0);

    if (sz > larger) {
      larger = sz;
      largerIdx = i;
    }
  }

  if (largerIdx !== null) {
    return sets.splice(largerIdx, 1)[0];
  }
}
