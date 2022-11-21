/** count the number of ones in a word of 32 bits */
export function popCount32bit(x: number): number {
  const m4 = ~(-1 << 16);
  const m3 = m4 ^ (m4 << 8);
  const m2 = m3 ^ (m3 << 4);
  const m1 = m2 ^ (m2 << 2);
  const m0 = m1 ^ (m1 << 1);

  let count = x;

  count = ((count >> 1) & m0) + (count & m0);
  count = ((count >> 2) & m1) + (count & m1);
  count = ((count >> 4) & m2) + (count & m2);
  count = ((count >> 8) & m3) + (count & m3);
  count = ((count >> 16) & m4) + (count & m4);

  return count;
}

/** count the number of ones in a word */
export function countOnes(x: number): number {
  let count = 0;

  while (x) {
    count++;
    x = x & (x - 1);
  }

  return count;
}
