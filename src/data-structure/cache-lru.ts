// https://en.wikipedia.org/wiki/Cache_replacement_policies#Simple_recency-based_policies
export class CacheLRU<K, T> {
  // TODO the queue should be a linked list instead
  private queue: K[] = [];
  private store: Map<K, T> = new Map();
  private capacity: number;

  /** the default capacity is 1 */
  constructor(capacity?: number) {
    this.capacity = capacity && capacity > 1 ? capacity : 1;
  }

  peak(): T | void {
    return this.store.get(this.queue[this.queue.length - 1]);
  }

  get(key: K): T | void {
    if (this.store.has(key)) {
      this.update(key);
      return this.store.get(key);
    }
  }

  set(key: K, value: T): void {
    if (this.store.has(key)) {
      this.update(key);
    } else if (this.capacity <= this.queue.length) {
      const delKey = this.queue.shift();
      this.store.delete(delKey!);
    }

    this.queue.push(key);
    this.store.set(key, value);
  }

  private update(key: K): void {
    if (this.queue[this.queue.length - 1] !== key) {
      const idx = this.queue.indexOf(key);

      if (idx !== -1) {
        this.queue.splice(idx, 1);
        this.queue.push(key);
      }
    }
  }

  print(): void {
    for (let i = this.queue.length - 1; i >= 0; i--) {
      const key = this.queue[i];
      console.log(
        `priority ${i} -> {key: ${key}, value: ${this.store.get(key)}}`
      );
    }
  }
}
