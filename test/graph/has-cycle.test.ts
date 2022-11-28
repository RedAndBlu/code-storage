import { Graph } from "../../src/graph/graph-adjacency-list";
import { hasCycle } from "../../src/graph/has-cycle";

describe("hasCycle()", () => {
  test("directed acyclic graph should return false", () => {
    const g = new Graph(true, 4)
      .addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 1, to: 3, cost: 1 })
      .addEdge({ from: 0, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 });
    expect(hasCycle(g)).toBe(false);
  });

  test("directed cyclic graph should return true", () => {
    const g = new Graph(true, 4)
      .addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 3, to: 0, cost: 1 });
    expect(hasCycle(g)).toBe(true);
  });

  test("directed cyclic with multiple edges graph should return true", () => {
    const g = new Graph(true, 6)
      .addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 3, to: 4, cost: 1 })
      .addEdge({ from: 3, to: 1, cost: 1 })
      .addEdge({ from: 3, to: 5, cost: 1 });
    expect(hasCycle(g)).toBe(true);
  });

  test("undirected acyclic graph should return false", () => {
    const g = new Graph(false, 4)
      .addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 });
    expect(hasCycle(g)).toBe(false);
  });

  test("undirected cyclic graph should return true", () => {
    const g = new Graph(false, 4)
      .addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 3, to: 0, cost: 1 });
    expect(hasCycle(g)).toBe(true);
  });
});
