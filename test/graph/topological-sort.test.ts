import { Graph } from "../../src/graph/graph-adjacency-list";
import { topologicalSort } from "../../src/graph/topological-sort";

describe("topological sort", () => {
  test("should return the post order inverted traversal", () => {
    const g = new Graph(true, 5)
      .addEdge({ from: 0, to: 1, cost: 5 })
      .addEdge({ from: 1, to: 2, cost: 3 })
      .addEdge({ from: 1, to: 3, cost: 5 })
      .addEdge({ from: 3, to: 4, cost: 4 })
      .addEdge({ from: 4, to: 2, cost: 6 });
    expect(topologicalSort(g)).toEqual([0, 1, 3, 4, 2]);
  });
});
