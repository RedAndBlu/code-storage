interface Node<T> {
  key: string;
  value: T;
  left?: Node<T>;
  right?: Node<T>;
}

// reference https://en.wikipedia.org/wiki/Binary_search_tree
export class BinarySearchTree<T> {
  size = 0;
  private root?: Node<T>;

  insert(key: string, value: T): BinarySearchTree<T> {
    this.root = this._insert(this.root, key, value);
    return this;
  }

  private _insert(n: Node<T> | undefined, key: string, value: T): Node<T> {
    if (!n) {
      this.size++;
      return { key, value };
    } else if (key > n.key) {
      n.right = this._insert(n.right, key, value);
    } else if (key < n.key) {
      n.left = this._insert(n.left, key, value);
    } else {
      n.value = value;
    }

    return n;
  }

  remove(key: string): BinarySearchTree<T> {
    this.root = this._remove(this.root, key);
    return this;
  }

  private _remove(n: Node<T> | undefined, key: string): Node<T> | undefined {
    if (!n) {
      return;
    } else if (key > n.key) {
      n.right = this._remove(n.right, key);
    } else if (key < n.key) {
      n.left = this._remove(n.left, key);
    } else {
      if (!n.left) {
        this.size--;
        return n.right;
      }
      if (!n.right) {
        this.size--;
        return n.left;
      }

      const t = n;
      n = this._getMinNode(t.right);

      if (n) {
        n.right = this._removeMin(t.right);
        n.left = t.left;
      }
    }

    return n;
  }

  private _getMinNode(n?: Node<T>): Node<T> | undefined {
    while (n && n.left) {
      n = n.left;
    }

    return n;
  }

  private _removeMin(n?: Node<T>): Node<T> | undefined {
    if (n) {
      if (!n.left) {
        this.size--;
        return n.right;
      }

      n.left = this._removeMin(n.left);
      return n;
    }
  }

  floor(key: string): T | undefined {
    return this._floor(this.root, key)?.value;
  }

  private _floor(n: Node<T> | undefined, key: string): Node<T> | undefined {
    // ceil works similarly
    if (!n) {
      return;
    }
    // for predecesor (the closest value to k but smaller than k)
    // if (key <= n.key) return this._floor(n.left, key);
    else if (key < n.key) {
      return this._floor(n.left, key);
    } else if (key === n.key) {
      return n;
    }

    const t = this._floor(n.right, key);
    return t ? t : n;
  }

  height(): number {
    return this._height(this.root);
  }

  private _height(n?: Node<T>): number {
    if (!n) {
      return 0;
    }

    return Math.max(this._height(n.left), this._height(n.right)) + 1;
  }

  get(key: string): T | undefined {
    return this._findNode(key)?.value;
  }

  // return the node with the given value if exists otherwise null
  private _findNode(key: string): Node<T> | undefined {
    let n = this.root;

    while (n !== undefined) {
      if (key < n.key) {
        n = n.left;
      } else if (key > n.key) {
        n = n.right;
      } else {
        return n;
      }
    }
  }

  toArray(): T[] {
    const arr: T[] = [];
    this._collectInOrder(arr, this.root);
    return arr;
  }

  private _collectInOrder(arr: T[], n?: Node<T>): void {
    if (n) {
      this._collectInOrder(arr, n.left);
      arr.push(n.value);
      this._collectInOrder(arr, n.right);
    }
  }
}
