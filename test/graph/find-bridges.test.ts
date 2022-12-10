import { findBridges } from "../../src/graph/find-bridges";
import { Graph } from "../../src/graph/graph-adjacency-list";

describe("findBridges()", () => {
  test("should find all bridges in the graph", () => {
    const g = new Graph(false);
    g.addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 0, to: 2, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 3, to: 4, cost: 1 });

    expect(findBridges(g)).toEqual([
      { from: 3, to: 4, cost: 1 },
      { from: 2, to: 3, cost: 1 },
    ]);
  });

  test("should find any bridges when there aren't", () => {
    const g = new Graph(false);
    g.addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 0, to: 2, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 3, to: 4, cost: 1 })
      .addEdge({ from: 4, to: 2, cost: 1 });

    expect(findBridges(g)).toEqual([]);
  });
});
