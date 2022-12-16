type node<T> = Node<T> | undefined;

class Node<T> {
  left: node<T>;
  right: node<T>;
  mid: node<T>;
  value: T | undefined;
  char: string;

  constructor(char: string) {
    this.char = char;
  }

  hasValue(): boolean {
    return this.value !== undefined;
  }

  hasChildren(): boolean {
    return Boolean(this.left || this.mid || this.right);
  }
}

export class TernarySearchTree<T> {
  /**
  reference https://en.wikipedia.org/wiki/Ternary_search_tree
  and Algorithms book (by Robert Sedgewick and kevin wayne)

  reminder: ternary trie or search tree is a binary search tree where each
  node stores a single character and pointers to its three children
  (equal child, lower child and higher child) and maybe an associated value (indicating a word)
  the lower child points to a node whose character value is less than the current node
  the higher child points to a node whose character is greater than the current node
  The equal child points to a node of a new binary search for the next character in the word
  traversing:
    - go left to search an lower char
    - go right to search an higher char
    - when equal you found the char, go mid to find the next character in the word
*/
  private root: node<T>;
  private _size = 0;

  // returns the number of keys
  get size(): number {
    return this._size;
  }

  // adds or updates a key with a specified key and a value
  // @param key - can't be an empty string
  set(key: string, value: T): TernarySearchTree<T> {
    if (key !== "") {
      this.root = this._set(this.root, key, value, 0);
    }

    return this;
  }

  // returns the last traversed node following the key, or undefined
  private _set(n: node<T>, key: string, value: T, i: number): node<T> {
    if (!n) {
      n = new Node<T>(key[i]);
    }

    if (key[i] < n.char) {
      n.left = this._set(n.left, key, value, i);
    } else if (key[i] > n.char) {
      n.right = this._set(n.right, key, value, i);
    } else if (i + 1 < key.length) {
      n.mid = this._set(n.mid, key, value, i + 1);
    } else {
      this._size += n.hasValue() ? 0 : 1;
      n.value = value;
    }

    return n;
  }

  // returns a boolean asserting whether a value has been associated to the key
  contains(key: string): boolean {
    return this.get(key) !== undefined;
  }

  // returns all the keys having the given prefix as a prefix
  keysWithPrefix(prefix: string): string[] {
    if (prefix.length > 0) {
      const keys: string[] = [];
      const n = this._getNode(this.root, prefix, 0);
      this._collect(n, prefix.substring(0, prefix.length - 1), keys);
      return keys;
    }

    return this.keys();
  }

  // returns the value associated to the key, or undefined if there is none
  get(key: string): T | undefined {
    if (key.length !== 0) {
      return this._getNode(this.root, key, 0)?.value;
    }
  }

  // returns the last node associated to the key, or undefined
  private _getNode(n: node<T>, key: string, i: number): node<T> {
    if (!n) {
      return;
    } else if (key[i] < n.char) {
      return this._getNode(n.left, key, i);
    } else if (key[i] > n.char) {
      return this._getNode(n.right, key, i);
    } else if (i + 1 < key.length) {
      return this._getNode(n.mid, key, i + 1);
    }

    return n;
  }

  // removes the specified key from the tree
  remove(key: string): TernarySearchTree<T> {
    if (key.length !== 0) {
      this.root = this._remove(this.root, key, 0);
    }

    return this;
  }

  // removes the nodes associated with the given key (when they aren't
  // associated with others keys too), returns the next traversed node
  private _remove(n: node<T>, key: string, i: number): node<T> {
    if (!n) {
      return;
    } else if (key[i] < n.char) {
      n.left = this._remove(n.left, key, i);
    } else if (key[i] > n.char) {
      n.right = this._remove(n.right, key, i);
    } else if (i + 1 < key.length) {
      n.mid = this._remove(n.mid, key, i + 1);
    } else {
      this._size -= n.hasValue() ? 1 : 0;
      n.value = undefined;
    }

    return n.hasValue() || n.hasChildren() ? n : undefined;
  }

  // returns a new array that contains all keys in tree in ascending order.
  keys(): string[] {
    const keys: string[] = [];
    this._collect(this.root, "", keys);
    return keys;
  }

  // collects all keys in the tree to the acc array in ascending order
  private _collect(n: node<T>, key: string, acc: string[]): void {
    if (n) {
      /**
      alternative traversing order to collect in descending order instead:
      - go right
      - go mid to the next char
      - add to acc when n.hasValue
      - go left
    */

      this._collect(n.left, key, acc);

      if (n.hasValue()) {
        acc.push(key + n.char);
      }

      this._collect(n.mid, key + n.char, acc);
      this._collect(n.right, key, acc);
    }
  }

  // returns the longest key that is a prefix of query
  longestPrefixOf(query: string): string {
    const len = this._search(this.root, query, 0, 0);
    return query.substring(0, len);
  }

  private _search(n: node<T>, query: string, i: number, len: number): number {
    if (!n) {
      return len;
    }

    if (query[i] < n.char) {
      return this._search(n.left, query, i, len);
    } else if (query[i] > n.char) {
      return this._search(n.right, query, i, len);
    } else {
      if (n.hasValue()) {
        len = i + 1;
      }
      if (i + 1 < query.length) {
        return this._search(n.mid, query, i + 1, len);
      }

      return len;
    }
  }

  // returns the greatest key in the tree
  greatestKey(): string {
    return this._greatestKey(this.root);
  }

  private _greatestKey(n: node<T>): string {
    let rst = "";

    function find(n: node<T>, key: string): void {
      if (n && rst === "") {
        find(n.right, key);
        find(n.mid, key + n.char);

        if (rst === "" && n.hasValue()) {
          rst = key + n.char;
        }

        find(n.left, key);
      }
    }

    find(n, "");
    return rst;
  }

  // returns the greatest key in the tree
  smallestKey(): string {
    return this._smallestKey(this.root);
  }

  private _smallestKey(n: node<T>): string {
    let rst = "";

    function find(n: node<T>, key: string): void {
      if (n && rst === "") {
        find(n.left, key);

        if (rst === "" && n.hasValue()) {
          rst = key + n.char;
        }

        find(n.mid, key + n.char);
        find(n.right, key);
      }
    }

    find(n, "");
    return rst;
  }

  floor(query: string): string {
    return this._floor(this.root, query);
  }

  private _floor(n: node<T>, key: string): string {
    let rst = "";

    /**
    traverse the key when you can't find anymore chars equal to key[i]
    check if you reached the key (or a key prefix), otherwise from there try to
    get the closest left char that is part of a key (has n.mid)
    or is a key (n.hasValue()) and get the greatestKey from that node,
    Order of precedence:
      1# equal key (or a prefix when returned from the recursion without rst)
      2# prefix + closest left char + greatest key from left char
      3# prefix + closest left char (when the greatest key part is empty)
      4# otherwise recursion pop and go back to 1# (without last char)
    */
    const findFloor = (n: node<T>, i: number): void => {
      if (!n || rst !== "") {
        return;
      } else if (key[i] < n.char) {
        return findFloor(n.left, i);
      } else if (key[i] === n.char) {
        if (i + 1 < key.length) {
          findFloor(n.mid, i + 1);
        }
        if (rst === "" && n.hasValue()) {
          rst = key.substring(0, i + 1);
        }

        return findFloor(n.left, i);
      }

      findFloor(n.right, i);

      if (rst === "" && (n.mid || n.hasValue())) {
        rst = key.substring(0, i) + n.char + this._greatestKey(n.mid);
      } else if (rst === "") {
        findFloor(n.left, i);
      }
    };

    findFloor(n, 0);
    return rst;
  }
}
