// returns the first character that is not repeated anywhere in the string.
export function firstNonRepeatingLetter(s: string) {
  const counter = countLetters(s);

  for (const c of s) {
    if ((counter.get(c.toLowerCase()) || 0) === 1) {
      return c;
    }
  }

  return "";
}

function countLetters(s: string) {
  const cache = new Map<string, number>();

  for (const c of s) {
    const l = c.toLowerCase();
    cache.set(l, (cache.get(l) || 0) + 1);
  }

  return cache;
}
