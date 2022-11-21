/** return 2 ^ [log2(n)] of the given 32 bit number */
export function roundUpToPow2(n: number): number {
  n--;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;

  return ++n;
}
