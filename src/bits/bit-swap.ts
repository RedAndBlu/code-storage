export function bitSwap(elms: [number, number]) {
  elms[0] = elms[0] ^ elms[1];
  elms[1] = elms[0] ^ elms[1];
  elms[0] = elms[0] ^ elms[1];
}
