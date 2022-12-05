export class RabinKarpStringMatch {
  /**
    reference https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm

    reminder:
    compares the hash value at each position of the text with the same length
    as the pattern, with the hash of the pattern.
    If the hash values are equal, it performs a full comparison at that position (las vegas version).
    the hash function is a rolling hash which quickly updates the
    hash from each position of the text to the next.

    the mod value is a large prime to prevent overflow, when mod is about
    pattern.length * text.length^2 then there is a collision probability of 1/n
  */

  #radix = 65536; // the radix of charCodeAt()
  #mod = 100_217_627; // large prime to prevent overflow (radix * leadR can't overflow, max leadR is mod - 1)
  #leadR = 1; // radix^(pattern.length - 1) % mod
  #pat: string;
  #patHash: number;

  constructor(pattern: string) {
    this.#pat = pattern;

    for (let i = 1; i < pattern.length; i++) {
      this.#leadR = (this.#leadR * this.#radix) % this.#mod;
    }

    this.#patHash = this.#hash(pattern, pattern.length);
  }

  #hash(str: string, len: number): number {
    let rst = 0;

    for (let i = 0; i < len; i++) {
      rst = (rst * this.#radix + str.charCodeAt(i)) % this.#mod;
    }

    return rst;
  }

  // return matching index in the text otherwise -1
  search(text: string): number {
    const len = this.#pat.length;
    let txtHash = this.#hash(text, len);

    if (txtHash === this.#patHash && text.substring(0, len) === this.#pat) {
      return 0;
    }

    for (let i = len; i < text.length; i++) {
      const c = text.charCodeAt(i - len);
      // adding mod is to make sure the result is positive
      txtHash =
        (txtHash + this.#mod - ((this.#leadR * c) % this.#mod)) % this.#mod;
      txtHash = (txtHash * this.#radix + text.charCodeAt(i)) % this.#mod;

      if (
        txtHash === this.#patHash &&
        text.substring(i - len + 1, i + 1) === this.#pat
      ) {
        return i - len + 1;
      }
    }

    return -1;
  }
}
