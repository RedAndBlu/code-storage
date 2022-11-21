/** zero out the bit at the given pos in the given word*/
export function bitClear(word: number, pos: number): number {
  return word & ~(1 << pos);
}
