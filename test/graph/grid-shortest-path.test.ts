import { Graph } from "../../src/graph/graph-adjacency-list";
import { gridShortestPaths } from "../../src/graph/grid-shortest-path";

describe("grid shortest paths", () => {
  test("should return the shortest traversal to every grid cell", () => {
    const grid = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];
    const rst = gridShortestPaths(grid, [0, 0]);
    expect(rst.cellTo!).toEqual([
      [undefined, [0, 0], [0, 1]],
      [
        [0, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 0],
        [2, 0],
        [2, 1],
      ],
    ]);
  });
});
