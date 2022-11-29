import { Graph } from "../../src/graph/graph-adjacency-list";
import { dagShortestPaths } from "../../src/graph/dag-shortest-path";

describe("dagShortestPaths", () => {
  const g = new Graph(true)
    .addEdge({ from: 0, to: 1, cost: 5 })
    .addEdge({ from: 1, to: 2, cost: 6 })
    .addEdge({ from: 1, to: 3, cost: 1 })
    .addEdge({ from: 3, to: 4, cost: 1 })
    .addEdge({ from: 4, to: 2, cost: 2 });
  const rst = dagShortestPaths(g, 0);

  test("should return the shortest distance", () => {
    expect(rst!.distTo).toEqual([0, 5, 9, 6, 7]);
  });

  test("should return the shortest vertex path", () => {
    expect(rst!.vertexTo).toEqual([null, 0, 4, 1, 3]);
  });
});
