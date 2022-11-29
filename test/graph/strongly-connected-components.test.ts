import { Graph } from "../../src/graph/graph-adjacency-list";
import { stronglyCC } from "../../src/graph/strongly-connected-components";

describe("strongly connected components", () => {
  test("should return all the disconnected components", () => {
    const g = new Graph(true)
      .addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 0, cost: 1 })
      .addEdge({ from: 3, to: 1, cost: 1 })
      .addEdge({ from: 3, to: 2, cost: 1 })
      .addEdge({ from: 3, to: 4, cost: 1 })
      .addEdge({ from: 4, to: 3, cost: 1 })
      .addEdge({ from: 4, to: 5, cost: 1 })
      .addEdge({ from: 5, to: 6, cost: 1 })
      .addEdge({ from: 5, to: 2, cost: 1 })
      .addEdge({ from: 6, to: 5, cost: 1 })
      .addEdge({ from: 7, to: 7, cost: 1 })
      .addEdge({ from: 7, to: 4, cost: 1 })
      .addEdge({ from: 7, to: 6, cost: 1 });

    expect(stronglyCC(g)).toEqual([[2, 1, 0], [6, 5], [4, 3], [7]]);
  });
});
