import { DoublyLinkedList } from "../data-structure/doubly-linked-list";

// every grid is a graph, so it is possible to solve many grid problems
// reducing it to a  graph problem
type Cell = [number, number]; // (row, column)
type Paths = {
  source: Cell;
  cellTo: (Cell | undefined)[][]; // the cell coming from on the traversal
};

// only four cardinal directions (for no particular reason)
const directs = [
  [0, -1], // north
  [1, 0], // east
  [0, 1], // south
  [-1, 0], // west
];

export function gridShortestPaths(grid: string[][], s: Cell): Paths {
  // it is basically a breath first search for a unweighted graph
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = new DoublyLinkedList<Cell>().push(s);
  const discovered: boolean[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );
  discovered[s[0]][s[1]] = true;
  const rst: Paths = {
    source: s,
    cellTo: Array.from({ length: rows }, () => []),
  };

  while (queue.size !== 0) {
    const at = queue.shift()!;

    for (const dir of directs) {
      const to: Cell = [at[0] + dir[0], at[1] + dir[1]];

      if (
        to[0] >= 0 &&
        to[0] < rows &&
        to[1] >= 0 &&
        to[1] < cols &&
        !discovered[to[0]][to[1]]
      ) {
        discovered[to[0]][to[1]] = true;
        queue.push([to[0], to[1]]);
        rst.cellTo[to[0]][to[1]] = at;
      }
    }
  }

  return rst;
}

export function reconstructPath(p: Paths, end: Cell): Cell[] {
  const path: Cell[] = [];

  for (
    let at: Cell | undefined = end;
    at !== undefined;
    at = p.cellTo[at[0]][at[1]]
  ) {
    path.push(at);
  }

  const last = path[path.length - 1];

  if (last[0] === p.source[0] && last[1] === p.source[1]) {
    return path.reverse();
  }

  return [];
}
