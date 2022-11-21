/** flip the bit at the given position in the given word */
export function bitFlip(word: number, pos: number): number {
  return word ^ (1 << pos);
}
