import { MyPromise } from "../../src/data-structure/my-promise";

describe("MyPromise", () => {
  test(".then() should always run asynchronously", async () => {
    const stack = [];
    new MyPromise((resolve) => resolve(true)).then(() => stack.push(2));
    stack.push(1);
    await new Promise((r) => setTimeout(() => r(true), 100));
    expect(stack).toEqual([1, 2]);
  });

  test(".then() should be chainable ", async () => {
    const stack: unknown[] = [];
    new MyPromise((resolve) => resolve(true))
      .then(() => stack.push(1))
      .then(() => stack.push(2));
    await new Promise((r) => setTimeout(() => r(true), 100));
    expect(stack).toEqual([1, 2]);
  });

  test("the promise should resolve successfully with the given value", async () => {
    const stack: unknown[] = [];
    const p = new MyPromise((resolve) => resolve(true));
    expect(p["state"]).toBe("fulfilled");
    expect(p["value"]).toBe(true);
    p.then((v) => {
      stack.push(v);
      return false;
    }).then((v) => stack.push(v));
    await new Promise((r) => setTimeout(() => r(true), 200));
    expect(stack).toEqual([true, false]);
  });

  test(".then() should be able to await for a returning promise", async () => {
    const p = new MyPromise((resolve) => resolve(true)).then(
      () => new MyPromise((r) => setTimeout(() => r(true), 100))
    );
    await new Promise((r) => setTimeout(() => r(true), 50));
    expect(p["state"]).toBe("pending");
    expect(p["value"]).toBeUndefined();
    await new Promise((r) => setTimeout(() => r(true), 100));
    expect(p["state"]).toBe("fulfilled");
    expect(p["value"]).toBe(true);
  });

  test("a .then() should be able to after the promise was already resolved", async () => {
    const p = new MyPromise((resolve) => resolve(true)).then(() => false);
    await new Promise((r) => setTimeout(() => r(true), 50));
    expect(p["state"]).toBe("fulfilled");
    expect(p["value"]).toBe(false);
    const p2 = p.then((r) => true);
    await new Promise((r) => setTimeout(() => r(true), 50));
    expect(p2["state"]).toBe("fulfilled");
    expect(p2["value"]).toBe(true);
  });

  test("a throwing error handle should reject the promise", async () => {
    const p = new MyPromise((resolve) => resolve(true)).then(() => {
      throw new Error();
    });
    await new Promise((r) => setTimeout(() => r(true), 50));
    expect(p["state"]).toBe("rejected");
  });

  test(".catch() should be able to resole a rejected promise", async () => {
    const p = new MyPromise((_, reject) => reject(new Error()));
    expect(p["state"]).toBe("rejected");
    const p2 = p.catch(() => true);
    await new Promise((r) => setTimeout(() => r(true), 50));
    expect(p2["state"]).toBe("fulfilled");
    expect(p2["value"]).toBe(true);
  });

  test(".catch() should be able to called even if at the bottom of the chain", async () => {
    const p = new MyPromise((_, reject) => reject(new Error()))
      .then(() => true)
      .then(() => true)
      .then(() => true)
      .catch(() => false);
    await new Promise((r) => setTimeout(() => r(true), 50));
    expect(p["state"]).toBe("fulfilled");
    expect(p["value"]).toBe(false);
  });
});

describe("MyPromise.promiseAll()", () => {
  test("should resolve when every given promise is resoled", async () => {
    const p = MyPromise.all([
      new MyPromise((r) => setTimeout(() => r(true), 50)),
      new MyPromise((r) => setTimeout(() => r(false), 100)),
      true,
    ]);
    await new Promise((r) => setTimeout(() => r(true), 50));
    expect(p["state"]).toBe("pending");
    await new Promise((r) => setTimeout(() => r(true), 100));
    expect(p["state"]).toBe("fulfilled");
    expect(p["value"]).toEqual([true, false, true]);
  });

  test("should reject when every one of the promise is rejected", async () => {
    const err = new Error("ops!");
    const p = MyPromise.all([
      new MyPromise((_, reject) =>
        setTimeout(() => {
          reject(err);
        }, 50)
      ),
      new MyPromise((r) => setTimeout(() => r(false), 100)),
      true,
    ]);
    await new Promise((r) => setTimeout(() => r(true), 150));
    expect(p["state"]).toBe("rejected");
    expect(p["value"]).toEqual(err);
  });
});
