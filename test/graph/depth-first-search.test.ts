import { Graph } from "../../src/graph/graph-adjacency-list";
import { depthFirstSearch } from "../../src/graph/depth-first-search";

describe("depth first search", () => {
  const g = new Graph(false, 5)
    .addEdge({ from: 0, to: 1, cost: 5 })
    .addEdge({ from: 1, to: 2, cost: 3 })
    .addEdge({ from: 1, to: 3, cost: 5 })
    .addEdge({ from: 2, to: 4, cost: 2 })
    .addEdge({ from: 3, to: 4, cost: 4 })
    .addEdge({ from: 0, to: 4, cost: 2 })
    .addEdge({ from: 1, to: 4, cost: 6 });
  const rst = depthFirstSearch(g, 0);

  test("should return able to return the pre order traversal ", () => {
    expect(rst.preOrder).toEqual([0, 1, 2, 4, 3]);
  });

  test("should return able to return the post order traversal ", () => {
    expect(rst.postOrder).toEqual([3, 4, 2, 1, 0]);
  });
});
