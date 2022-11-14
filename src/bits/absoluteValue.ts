/** get the absolute value of the given value for a 32 bits word*/
export function abs(x: number): number {
  const b = x >> 31;
  return (x ^ b) - b;
}
