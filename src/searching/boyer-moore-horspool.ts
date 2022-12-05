/**
  reference https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore%E2%80%93Horspool_algorithm

  note this isn't exactly the Boyer–Moore–Horspool algorithm but a small variation
  the pattern is compared to the text from right-to-left, if the characters do
  not match, there is no need to continue searching backwards along the text.
  If the character in the text does not match any of the characters in the pattern,
  then we skip all characters until the next character of the mismatched one
  If the character in the text is in the pattern, then a partial shift of the
  pattern along the text is done to line up along the matching character and
  the process is repeated.
*/

const RADIX = 65536;

// BAD CHARACTER RULE.
// return a table with the indices of the rightmost
// occurrence of characters in pattern or -1 if there is no character
function tableMatchChars(pattern: string): number[] {
  const rst = new Array<number>(RADIX).fill(-1);

  for (let i = 0; i < pattern.length; i++) {
    rst[pattern.charCodeAt(i)] = i;
  }

  return rst;
}

export function search(text: string, pattern: string): number {
  const table = tableMatchChars(pattern);
  let skip = 0;

  for (let i = 0; i + pattern.length <= text.length; i += skip) {
    skip = 0;

    for (let j = pattern.length - 1; j >= 0; j--) {
      if (text[i + j] !== pattern[j]) {
        skip = Math.max(1, j - table[text.charCodeAt(i + j)]);
        break;
      }
    }

    if (skip === 0) {
      return i;
    }
  }

  return -1;
}
