// reference https://en.wikipedia.org/wiki/Circular_buffer
export class CircularQueue<T> {
  private capacity: number;
  private iWrite = 0;
  private iRead = 0;
  private buffer: T[];

  constructor(capacity: number) {
    this.capacity = capacity + 1;
    this.buffer = new Array<T>(this.capacity);
  }

  isEmpty(): boolean {
    return this.iWrite === this.iRead;
  }

  isFull(): boolean {
    return this.incrementByOne(this.iWrite) === this.iRead;
  }

  /** enqueue the given value as last only if the queue is not full */
  enqueue(value: T): boolean {
    if (!this.isFull()) {
      this.buffer[this.iWrite] = value;
      this.iWrite = this.incrementByOne(this.iWrite);
      return true;
    }

    return false;
  }

  /** enqueue the given value even if the queue is full, by removing the oldest value stored*/
  forceEnqueue(value: T): boolean {
    if (this.isFull()) {
      this.iRead = this.incrementByOne(this.iRead);
    }

    return this.enqueue(value);
  }

  /** return and remove the oldest value stored in the queue */
  dequeue(): T | undefined {
    if (!this.isEmpty()) {
      const rst = this.buffer[this.iRead];
      this.iRead = this.incrementByOne(this.iRead);
      return rst;
    }
  }

  peak(): T | undefined {
    return this.buffer[this.iRead];
  }

  *[Symbol.iterator]() {
    for (let i = this.iRead; i !== this.iWrite; i = this.incrementByOne(i)) {
      yield this.buffer[i];
    }
  }

  /** increment the given value by one and wrap it when it exceed the queue capacity */
  private incrementByOne(index: number): number {
    return (index + 1) % this.capacity;
  }
}
