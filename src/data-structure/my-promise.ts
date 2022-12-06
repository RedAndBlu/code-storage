// reference https://en.wikipedia.org/wiki/Futures_and_promises
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

type handle = (val: unknown) => unknown;
export type resolver = (val: unknown) => unknown;

export class MyPromise {
  private value: unknown;
  private state: "fulfilled" | "pending" | "rejected" = "pending";
  private fulfilledHandlers: handle[] = [];
  private rejectedHandlers: handle[] = [];

  private resolve: resolver = (value) => {
    if (this.state === "pending") {
      this.value = value;
      this.state = "fulfilled";
      this.fulfilledHandlers.forEach((fn) => fn(value));
      this.fulfilledHandlers = [];
    }
  };

  private reject: resolver = (err) => {
    if (this.state === "pending") {
      this.value = err;
      this.state = "rejected";
      this.rejectedHandlers.forEach((fn) => fn(err));
      this.rejectedHandlers = [];
    }
  };

  constructor(task: (resolve: resolver, reject: resolver) => void) {
    try {
      task(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  // handle the callbacks from then and catch, enqueuing them to wait until the
  // promise resolve or run right away if already resolved
  private handleCallbacks(onFulfilled: handle, onRejected: handle): void {
    if (this.state === "pending") {
      this.fulfilledHandlers.push(onFulfilled);
      this.rejectedHandlers.push(onRejected);
    } else if (this.state === "fulfilled") {
      onFulfilled(this.value);
    } else {
      onRejected(this.value);
    }
  }

  // guarantee that the callbacks will run asynchronously
  private handleCallbacksInAsync(onFulfilled: handle, onRejected: handle) {
    queueMicrotask(() => this.handleCallbacks(onFulfilled, onRejected));
  }

  then(onFulfilled?: handle, onRejected?: handle): MyPromise {
    return new MyPromise((resolve: resolver, reject: resolver) => {
      const wrapOnFulfilled: handle = (value) => {
        if (onFulfilled) {
          try {
            const rst = onFulfilled(value);
            rst instanceof MyPromise ? rst.then(resolve, reject) : resolve(rst);
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(value);
        }
      };

      const wrapOnRejected: handle = (error) => {
        if (onRejected) {
          try {
            const rst = onRejected(error);
            rst instanceof MyPromise ? rst.then(resolve, reject) : resolve(rst);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(error);
        }
      };

      this.handleCallbacksInAsync(wrapOnFulfilled, wrapOnRejected);
    });
  }

  catch(onRejected: handle): MyPromise {
    return this.then(undefined, onRejected);
  }

  static all(list: (MyPromise | unknown)[]): MyPromise {
    return new MyPromise((resolve, reject) => {
      let completed = 0;
      const rst: unknown[] = [];

      const onFullFill = (r: unknown, i: number) => {
        rst[i] = r;

        if (++completed === list.length) {
          resolve(rst);
        }
      };

      for (let i = 0; i < list.length; i++) {
        if (list[i] instanceof MyPromise) {
          (list[i] as MyPromise).then(
            (r) => onFullFill(r, i),
            (err) => reject(err)
          );
        } else {
          onFullFill(list[i], i);
        }
      }
    });
  }
}
