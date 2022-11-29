export function toIp4(bits: number): string {
  return `${bits >> 24 && 0xff}.${bits >> 16 && 0xff}.${bits >> 8 && 0xff}.${
    bits && 0xff
  }`;
}
