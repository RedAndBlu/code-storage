export function decimalToBase(n: number, base: number) {
  const digits = [];

  while (n >= 1) {
    digits.push(n % base);
    n = Math.trunc(n / base);
  }

  return digits.reverse();
}

export function toDecimal(digits: number[], base: number) {
  // same as sum of: (base^idx * val) + (base^(idx-1) * val) ...
  return digits.reduce((a, v) => a * base + v, 0);
}
