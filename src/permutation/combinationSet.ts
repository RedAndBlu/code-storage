// a combination is a selection of items from a collection, such that the order
// of selection does not matter (unlike permutations)
// a k-combination of a set S is a subset of k distinct elements of S
export function combination(set: number[], k: number): number[][] {
  const cobs: number[][] = [];

  function combine(stack: number[], left: number) {
    if (stack.length === k) {
      cobs.push(stack.slice());
      return;
    }

    for (let i = left; i < set.length; i++) {
      stack.push(set[i]);

      combine(stack, i + 1);
      stack.pop();
    }
  }

  combine([], 0);
  return cobs;
}
