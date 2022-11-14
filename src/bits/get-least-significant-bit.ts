/** return the least significant one in x */
export function getLeastSignificant(x: number): number {
  return x & -x;
}
