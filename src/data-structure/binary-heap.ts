import { swap } from "../util/swap";

type compare<T> = (a: T, b: T) => number;

// reference https://en.wikipedia.org/wiki/Binary_heap
export class Heap<T> {
  private _size = 0;
  private buffer: T[] = [];

  constructor(public cmp: compare<T>, arr?: T[]) {
    if (arr) {
      this._size = arr.length;
      this.buffer = [...arr];
      this.heapify();
    }
  }

  get size(): number {
    return this._size;
  }

  static merge<T>(a: Heap<T>, b: Heap<T>, cmp: compare<T>): Heap<T> {
    return new Heap<T>(cmp, [...a.buffer, ...b.buffer]);
  }

  private heapify(): void {
    const iLast = this._size - 1;

    for (let i = Math.floor((iLast - 1) / 2); i >= 0; i--) {
      this.shiftDown(i);
    }
  }

  insert(value: T): Heap<T> {
    this.buffer[this._size] = value;
    this.shiftUp(this._size++);
    return this;
  }

  peak(): T | undefined {
    return this.buffer[0];
  }

  pop(): T | undefined {
    if (this._size > 0) {
      const rst = this.buffer[0];
      this.buffer[0] = this.buffer[--this._size];
      this.buffer.pop();
      this.shiftDown(0);

      return rst;
    }
  }

  remove(value: T): boolean {
    const idx = this._find(value);

    if (idx !== -1) {
      this.buffer[idx] = this.buffer[--this._size];
      this.buffer.pop();
      this.shiftDown(idx);
      this.shiftUp(idx);
      return true;
    }

    return false;
  }

  has(value: T): boolean {
    return this._find(value) !== -1;
  }

  private _find(value: T): number {
    for (let i = 0; i < this._size; i++) {
      if (this.cmp(this.buffer[i], value) === 0) {
        return i;
      }
    }

    return -1;
  }

  private shiftUp(i: number): void {
    let iPrt = Math.floor((i - 1) / 2);

    while (i > 0 && this.cmp(this.buffer[i], this.buffer[iPrt]) < 0) {
      swap(this.buffer, i, iPrt);
      i = iPrt;
      iPrt = Math.floor((i - 1) / 2);
    }
  }

  private shiftDown(i: number): void {
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    let t = i;

    if (l < this._size && this.cmp(this.buffer[l], this.buffer[t]) < 0) {
      t = l;
    }
    if (r < this._size && this.cmp(this.buffer[r], this.buffer[t]) < 0) {
      t = r;
    }
    if (t !== i) {
      swap(this.buffer, t, i);
      this.shiftDown(t);
    }
  }
}
