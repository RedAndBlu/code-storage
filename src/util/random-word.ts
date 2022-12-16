const MIN_SIZE = 1;
const MAX_SIZE = 20;
const CHARS = 26;
const BASE_CHAR = 97;

function randomChar(): string {
  return String.fromCharCode(Math.floor(Math.random() * CHARS) + BASE_CHAR);
}

// the word returned is in english alphabet
export function randomWord(): string {
  const size = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
  return Array.from({ length: size }, () => randomChar()).join("");
}
