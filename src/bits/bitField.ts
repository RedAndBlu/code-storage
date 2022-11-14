/** set the given field of bit at the given pos */
export function setBitField(word: number, field: number, pos: number): number {
  return word | (field << pos);
}

/** extract the given field from the word */
export function extractBitField(
  word: number,
  fieldMask: number,
  pos: number
): number {
  return (word & fieldMask) >> pos;
}
