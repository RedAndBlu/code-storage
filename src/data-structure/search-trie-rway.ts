const RADIX = 256; // ASCII
type Nd<T> = Node<T> | undefined;

class Node<T> {
  value: T | undefined;
  _next: Nd<T>[] = new Array(RADIX);
  children = 0;

  getNext(char: string): Nd<T> {
    return this._next[char.charCodeAt(0)];
  }

  setNext(char: string, n: Nd<T>): void {
    if (this.getNext(char) === undefined) {
      this.children++;
    }

    this._next[char.charCodeAt(0)] = n;
  }

  removeNext(char: string): void {
    if (this.getNext(char) !== undefined) {
      this.children--;
      this._next[char.charCodeAt(0)] = undefined;
    }
  }
}

// String Symbol Table
export class Trie<T> {
  private _root = new Node<T>();
  _size = 0;

  get size(): number {
    return this._size;
  }

  contains(key: string): boolean {
    return this.get(key) !== undefined;
  }

  get(key: string): T | undefined {
    if (key !== "") {
      return this._getNode(this._root, key, 0)?.value;
    }
  }

  private _getNode(n: Nd<T>, key: string, next: number): Nd<T> {
    if (!n || next === key.length) {
      return n;
    }

    return this._getNode(n.getNext(key[next]), key, next + 1);
  }

  set(key: string, value: T): Trie<T> {
    if (key !== "") {
      this._set(this._root, key, value, 0);
    }

    return this;
  }

  private _set(n: Nd<T>, key: string, value: T, next: number): Nd<T> {
    if (!n) {
      n = new Node<T>();
    }

    if (next === key.length) {
      this._size += n.value === undefined ? 1 : 0;
      n.value = value;
    } else {
      const char = key[next];
      n.setNext(char, this._set(n.getNext(char), key, value, next + 1));
    }

    return n;
  }

  remove(key: string): Trie<T> {
    if (key !== "") {
      this._remove(this._root, key, 0);
    }
    return this;
  }

  private _remove(n: Nd<T>, key: string, next: number): boolean {
    if (!n) {
      return false;
    } else if (next === key.length && n.value !== undefined) {
      this._size--;
      n.value = undefined;
    } else if (this._remove(n.getNext(key[next]), key, next + 1)) {
      n.removeNext(key[next]);
    }

    return n.value === undefined && n.children === 0;
  }

  keys(): string[] {
    const arr: string[] = [];
    this._collect(this._root, "", arr);
    return arr;
  }

  keysWithPrefix(prefix: string): string[] {
    const startNode = this._getNode(this._root, prefix, 0);
    const arr: string[] = [];
    this._collect(startNode, prefix, arr);
    return arr;
  }

  private _collect(n: Nd<T>, key: string, acc: string[]): void {
    if (n) {
      if (n.value !== undefined) {
        acc.push(key);
      }

      for (let i = 0; i < RADIX; i++) {
        const nextChar = String.fromCharCode(i);
        this._collect(n.getNext(nextChar), key + nextChar, acc);
      }
    }
  }

  longestPrefixOf(query: string): string {
    const len = this._search(this._root, query, 0, 0);
    return query.substring(0, len);
  }

  // get the length of the key that is the longest prefix of query
  private _search(n: Nd<T>, query: string, next: number, len: number): number {
    if (!n) {
      return len;
    } else if (n.value !== undefined) {
      len = next;
    }

    if (next === query.length) {
      return len;
    }

    return this._search(n.getNext(query[next]), query, next + 1, len);
  }
}
