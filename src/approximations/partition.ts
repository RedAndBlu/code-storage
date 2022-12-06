// reference https://en.wikipedia.org/wiki/Partition_problem
// Greedy algorithm, which iterates through the sorted numbers,
// assigning each of them to whichever subset has the smaller sum.
export function partition(set: number[]): [number[], number[]] {
  const sums: [number, number] = [0, 0];
  const sol: [number[], number[]] = [[], []];
  set.sort((a, b) => b - a);

  for (const n of set) {
    if (sums[0] <= sums[1]) {
      sol[0].push(n);
      sums[0] += n;
    } else {
      sol[1].push(n);
      sums[1] += n;
    }
  }

  return sol;
}
