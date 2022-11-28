import { Graph } from "../../src/graph/graph-adjacency-list";
import { isBipartite } from "../../src/graph/is-bipartite";

describe("isBipartite", () => {
  test("should return false when the graph isn't bipartite", () => {
    const g = new Graph(false, 5)
      .addEdge({ from: 0, to: 1, cost: 5 })
      .addEdge({ from: 1, to: 2, cost: 3 })
      .addEdge({ from: 1, to: 3, cost: 5 })
      .addEdge({ from: 2, to: 4, cost: 2 })
      .addEdge({ from: 3, to: 4, cost: 4 })
      .addEdge({ from: 0, to: 4, cost: 2 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 1, to: 4, cost: 6 });
    expect(isBipartite(g)).toBe(false);
  });

  test("should return true when the graph is bipartite", () => {
    const g = new Graph(false, 4)
      .addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 3, to: 0, cost: 1 });
    expect(isBipartite(g)).toBe(true);
  });
});
