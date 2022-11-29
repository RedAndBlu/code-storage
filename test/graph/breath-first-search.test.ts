import { Graph } from "../../src/graph/graph-adjacency-list";
import { breadthFirstSearch } from "../../src/graph/breath-first-search";

describe("breadth first search", () => {
  const g = new Graph(false)
    .addEdge({ from: 0, to: 1, cost: 5 })
    .addEdge({ from: 1, to: 2, cost: 3 })
    .addEdge({ from: 1, to: 3, cost: 5 })
    .addEdge({ from: 2, to: 4, cost: 2 })
    .addEdge({ from: 3, to: 4, cost: 4 })
    .addEdge({ from: 0, to: 4, cost: 2 })
    .addEdge({ from: 1, to: 4, cost: 6 });
  const rst = breadthFirstSearch(g, 0);

  test("should return the previous node traveled on way to every vertex", () => {
    expect(rst.vertexTo).toEqual([null, 0, 1, 1, 0]);
  });
});
