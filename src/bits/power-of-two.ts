/** check if the given word is power of two */
export function isPowerOfTwo(word: number): boolean {
  return !(word & (word - 1));
}
