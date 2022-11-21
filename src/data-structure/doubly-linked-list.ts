class Node<T> {
  value?: T;
  prev: Node<T>;
  next: Node<T>;

  constructor(value?: T) {
    this.value = value;
    // it point to itself so the list preserve a cycle state
    this.prev = this;
    this.next = this;
  }
}

// reference https://en.wikipedia.org/wiki/Linked_list
export class DoublyLinkedList<T> {
  private sentinel = new Node<T>();
  private _size = 0;

  get size() {
    return this._size;
  }

  push(value: T): DoublyLinkedList<T> {
    this.addAfter(this.sentinel.prev, new Node(value));
    return this;
  }

  unshift(value: T): DoublyLinkedList<T> {
    this.addAfter(this.sentinel, new Node(value));
    return this;
  }

  insert(index: number, value: T): DoublyLinkedList<T> {
    if (index === 0) {
      this.unshift(value);
    } else if (index === this._size) {
      this.push(value);
    } else if (index > 0 && index < this._size) {
      this.addAfter(this.getNode(index - 1), new Node(value));
    }

    return this;
  }

  private addAfter(n: Node<T>, newNode: Node<T>): void {
    newNode.next = n.next;
    newNode.prev = n;
    n.next.prev = newNode;
    n.next = newNode;
    this._size++;
  }

  pop(): T | undefined {
    const rst = this.sentinel.prev.value;
    this.deleteNode(this.sentinel.prev);
    return rst;
  }

  shift(): T | undefined {
    const rst = this.sentinel.next.value;
    this.deleteNode(this.sentinel.next);
    return rst;
  }

  peakBack(): T | undefined {
    return this.sentinel.prev.value;
  }

  peakFront(): T | undefined {
    return this.sentinel.next.value;
  }

  valueAt(index: number): T | undefined {
    if (index >= 0 && index < this._size) {
      return this.getNode(index).value;
    }
  }

  deleteAt(index: number): void {
    if (index >= 0 && index < this._size) {
      this.deleteNode(this.getNode(index));
    }
  }

  delete(value: T): void {
    const n = this.findNode(value);
    n && this.deleteNode(n);
  }

  reverse(): DoublyLinkedList<T> {
    if (this._size > 1) {
      let prev = this.sentinel;
      let at = prev.next;
      this.sentinel.prev = at;

      while (at !== this.sentinel) {
        const next = at.next;
        at.prev = next;
        at.next = prev;
        prev = at;
        at = next;
      }

      this.sentinel.next = prev;
    }

    return this;
  }

  has(value: T): boolean {
    return Boolean(this.findNode(value));
  }

  *[Symbol.iterator]() {
    for (let n = this.sentinel.next; n !== this.sentinel; n = n.next) {
      yield n.value;
    }
  }

  private findNode(value: T): Node<T> | undefined {
    for (let at = this.sentinel.next; at !== this.sentinel; at = at.next) {
      if (at.value === value) {
        return at;
      }
    }
  }

  private deleteNode(n: Node<T>): void {
    if (n && n !== this.sentinel) {
      n.next.prev = n.prev;
      n.prev.next = n.next;
      this._size--;
    }
  }

  private getNode(index: number): Node<T> {
    if (index < this._size / 2) {
      return this.getNodeFromFront(index);
    } else {
      return this.getNodeFromBack(index);
    }
  }

  private getNodeFromFront(index: number): Node<T> {
    let at = this.sentinel.next;

    for (let i = 0; i !== index; i++) {
      at = at.next;
    }

    return at;
  }

  private getNodeFromBack(index: number): Node<T> {
    let at = this.sentinel.prev;

    for (let i = this._size - 1; i !== index; i--) {
      at = at.prev;
    }

    return at;
  }
}
