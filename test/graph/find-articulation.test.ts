import { findArticulation } from "../../src/graph/find-articulation";
import { Graph } from "../../src/graph/graph-adjacency-list";

describe("findBridges()", () => {
  test("should find all cut vertices in the graph", () => {
    const g = new Graph(false);
    g.addEdge({ from: 0, to: 1, cost: 1 })
      .addEdge({ from: 0, to: 2, cost: 1 })
      .addEdge({ from: 1, to: 2, cost: 1 })
      .addEdge({ from: 2, to: 3, cost: 1 })
      .addEdge({ from: 3, to: 4, cost: 1 });

    expect(findArticulation(g)).toEqual([3, 2, 0]);
  });
});
