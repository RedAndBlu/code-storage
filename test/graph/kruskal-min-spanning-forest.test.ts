import { Graph } from "../../src/graph/graph-adjacency-list";
import { minSpanningForest } from "../../src/graph/kruskal-min-spanning-forest";

describe("kruskal min spanning forest", () => {
  test("", () => {
    const g = new Graph(false, 5)
      .addEdge({ from: 0, to: 1, cost: 5 })
      .addEdge({ from: 1, to: 2, cost: 3 })
      .addEdge({ from: 1, to: 3, cost: 5 })
      .addEdge({ from: 2, to: 4, cost: 2 })
      .addEdge({ from: 3, to: 4, cost: 4 })
      .addEdge({ from: 0, to: 4, cost: 2 })
      .addEdge({ from: 1, to: 4, cost: 6 });
    expect(minSpanningForest(g)).toEqual([
      { v1: 0, v2: 4, cost: 2 },
      { v1: 2, v2: 4, cost: 2 },
      { v1: 1, v2: 2, cost: 3 },
      { v1: 3, v2: 4, cost: 4 },
    ]);
  });
});
