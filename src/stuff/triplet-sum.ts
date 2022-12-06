// return all possible sum of n where a < b < c && a + b + c = n
export function tripletSum(n: number) {
  const terms = [];

  for (let a = 1; a < n / 3; a++) {
    for (let b = a + 1; b < n - b - a; b++) {
      terms.push([a, b, n - a - b]);
    }
  }

  return terms;
}
