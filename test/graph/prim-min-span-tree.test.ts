import { Graph } from "../../src/graph/graph-adjacency-list";
import { primTree } from "../../src/graph/prim-min-span-tree";

describe("prim min spanning tree", () => {
  test("should return the minimum spanning tree of the given graph", () => {
    const g = new Graph(false)
      .addEdge({ from: 0, to: 1, cost: 5 })
      .addEdge({ from: 1, to: 2, cost: 3 })
      .addEdge({ from: 1, to: 3, cost: 5 })
      .addEdge({ from: 2, to: 4, cost: 2 })
      .addEdge({ from: 3, to: 4, cost: 4 })
      .addEdge({ from: 0, to: 4, cost: 2 })
      .addEdge({ from: 1, to: 4, cost: 6 });
    expect(primTree(g)).toEqual([
      { v1: 0, v2: 4, cost: 2 },
      { v1: 4, v2: 2, cost: 2 },
      { v1: 2, v2: 1, cost: 3 },
      { v1: 4, v2: 3, cost: 4 },
    ]);
  });
});
