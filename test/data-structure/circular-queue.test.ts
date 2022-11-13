import { CircularQueue } from "../../src/data-structure/circular-queue";

describe(".enqueue()", () => {
  const cq = new CircularQueue<number>(1);

  test("should add one element to the queue when there is space", () => {
    cq.enqueue(1);
    expect(cq.isFull()).toBe(true);
  });

  test("shouldn't add elements when there isn't any space", () => {
    expect(cq.enqueue(2)).toBe(false);
  });
});

describe(".forceEnqueue()", () => {
  const cq = new CircularQueue<number>(1);

  test("should remove the oldest value and add the new one", () => {
    cq.enqueue(1);
    expect(cq.peak()).toBe(1);
    cq.forceEnqueue(2);
    expect(cq.peak()).toBe(2);
  });
});

describe(".dequeue()", () => {
  const cq = new CircularQueue<number>(3);

  test("should remove the oldest value and return it", () => {
    cq.enqueue(1);
    cq.enqueue(2);
    cq.enqueue(3);
    expect(cq.dequeue()).toBe(1);
    expect(cq.peak()).toBe(2);
  });
});
