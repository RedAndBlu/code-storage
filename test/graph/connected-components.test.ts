import { Graph } from "../../src/graph/graph-adjacency-list";
import { find } from "../../src/graph/connected-components";

describe("connected components", () => {
  const g = new Graph(false)
    .addEdge({ from: 0, to: 1, cost: 5 })
    .addEdge({ from: 1, to: 2, cost: 3 })
    .addEdge({ from: 1, to: 3, cost: 5 })
    .addEdge({ from: 2, to: 4, cost: 2 })
    .addEdge({ from: 3, to: 4, cost: 4 })
    .addEdge({ from: 0, to: 4, cost: 2 })
    .addEdge({ from: 1, to: 4, cost: 6 })
    .addEdge({ from: 5, to: 6, cost: 1 })
    .addEdge({ from: 6, to: 7, cost: 1 })
    .addEdge({ from: 7, to: 5, cost: 1 });
  const rst = find(g);

  test("should mark disconnected components with different ids ", () => {
    expect(rst!.vertexComponentId).toEqual([0, 0, 0, 0, 0, 1, 1, 1]);
  });
});
