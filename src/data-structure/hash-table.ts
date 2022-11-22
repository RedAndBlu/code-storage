interface Item<T> {
  key: string;
  value: T;
}

function hash(key: string, mod: number): number {
  let h = 0;

  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) % mod;
  }

  return h;
}

function probeHash(key: string, mod: number) {
  let trial = 0;
  return () => (hash(key, mod) + trial++) % mod;
}

const MAX_LOAD_FACTOR = 0.8;
const MIN_LOAD_FACTOR = 0.25;
export const MIN_CAPACITY = 7;

// reference hash table open addressing https://en.wikipedia.org/wiki/Hash_table
export class HashTable<T> {
  private _size = 0;
  // null means deleted
  private buff: (Item<T> | null)[] = [];
  private capacity = MIN_CAPACITY;

  get size() {
    return this._size;
  }

  get(key: string): T | undefined {
    const i = this._getItemIdx(key);
    return i ? this.buff[i]!.value : undefined;
  }

  add(key: string, value: T): HashTable<T> {
    const pHash = probeHash(key, this.capacity);
    let i = pHash();

    for (let item = this.buff[i]; item; i = pHash()) {
      if (item.key === key) {
        this.buff[i] = { key, value };
        return this;
      }
    }

    this._size++;
    this.buff[i] = { key, value };
    this.growBuff();
    return this;
  }

  remove(key: string) {
    const i = this._getItemIdx(key);

    if (i !== undefined) {
      this._size--;
      this.buff[i] = null;
      this.shrinkBuff();
    }
  }

  private _getItemIdx(key: string): number | undefined {
    const pHash = probeHash(key, this.capacity);

    for (
      let i = pHash(), item = this.buff[i];
      item || item === null;
      i = pHash(), item = this.buff[i]
    ) {
      if (item?.key === key) {
        return i;
      }
    }
  }

  private growBuff(): void {
    if (this.size / this.capacity > MAX_LOAD_FACTOR) {
      this.resizeBuff(this.capacity * 2);
    }
  }

  private shrinkBuff(): void {
    if (
      this.capacity > MIN_CAPACITY &&
      this.size / this.capacity < MIN_LOAD_FACTOR
    ) {
      this.resizeBuff(this.capacity / 2);
    }
  }

  private resizeBuff(capacity: number): void {
    const elms = [...this];
    this.capacity = capacity;
    this._size = 0;
    this.buff = new Array(this.capacity);

    for (const e of elms) {
      this.add(e.key, e.value);
    }
  }

  *[Symbol.iterator]() {
    for (const i of this.buff) {
      if (i) {
        yield i;
      }
    }
  }
}
