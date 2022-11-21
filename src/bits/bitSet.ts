/** set the bit to 1 at the given position */
export function bitSet(word: number, pos: number): number {
  return word | (1 << pos);
}
