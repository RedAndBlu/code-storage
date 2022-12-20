// this one is the most performance friendly
export function fibonacciBtmUp(n: number): number {
  if (n === 0) return 0;
  else {
    let prev = 0,
      curr = 1;

    for (let i = 1; i < n; i++) {
      const next = prev + curr;
      prev = curr;
      curr = next;
    }

    return curr;
  }
}

export function fibonacciTopDown(arr: number[], n: number): number {
  if (n === 0) {
    arr[n] = 0;
    return 0;
  } else if (n === 1) {
    arr[n] = 1;
    return 1;
  } else if (arr[n] === undefined) {
    arr[n] = fibonacciTopDown(arr, n - 1) + fibonacciTopDown(arr, n - 2);
  }

  return arr[n];
}
