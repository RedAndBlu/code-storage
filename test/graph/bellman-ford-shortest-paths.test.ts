import { Graph } from "../../src/graph/graph-adjacency-list";
import { shortestPath } from "../../src/graph/bellman-ford-shortest-paths";

describe("bellman-ford", () => {
  const g = new Graph(false)
    .addEdge({ from: 0, to: 1, cost: 5 })
    .addEdge({ from: 1, to: 2, cost: 3 })
    .addEdge({ from: 1, to: 3, cost: 5 })
    .addEdge({ from: 2, to: 4, cost: 2 })
    .addEdge({ from: 3, to: 4, cost: 4 })
    .addEdge({ from: 0, to: 4, cost: 2 })
    .addEdge({ from: 1, to: 4, cost: 6 });
  const rst = shortestPath(g, 0);

  test("should return the min distance path to any vertex", () => {
    expect(rst.distTo).toEqual([0, 5, 4, 6, 2]);
  });

  test("should return the previous node traveled on way to the shortest path", () => {
    expect(rst.vertexTo).toEqual([null, 0, 4, 4, 0]);
  });
});
