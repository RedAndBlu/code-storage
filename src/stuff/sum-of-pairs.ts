// Given a list of integers and a sum value, return the first two values add up to form the sum.
export function sumPairs(ints: number[], sum: number) {
  const cache = new Set<number>();

  for (const int of ints) {
    if (cache.has(sum - int)) {
      return [sum - int, int];
    }

    cache.add(int);
  }
}
