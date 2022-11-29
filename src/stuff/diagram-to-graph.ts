const VERTEX = "+";
// just for reference on which symbol should be used to draw it should be
const EDGE_VERTICAL = "|";
const EDGE_HORIZONTAL = "-";

// only four cardinal directions (for no particular reason)
const directs = [
  [0, -1], // north
  [1, 0], // east
  [0, 1], // south
  [-1, 0], // west
];
type Cell = [number, number];
type Edge = { from: Cell; to: Cell };

export function diagramToGraph(diagram: string[]): Edge[] {
  const edges: Edge[] = [];
  const rows = diagram.length;
  const cols = diagram[0].length;
  const discovered: boolean[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );
  const cellTo: (Cell | undefined)[][] = Array.from({ length: rows }, () => []);
  const queue: Cell[] = [[0, 0]];
  discovered[0][0] = true;

  function discoverNeighbors(at: Cell) {
    for (const d of directs) {
      const to = [at[0] + d[0], at[1] + d[1]];

      if (
        to[0] >= 0 &&
        to[0] < rows &&
        to[1] >= 0 &&
        to[1] < cols &&
        !discovered[to[0]][to[1]] &&
        diagram[to[0]][to[1]] !== " "
      ) {
        discovered[to[0]][to[1]] = true;
        queue.push([to[0], to[1]]);
        cellTo[to[0]][to[1]] = at;
      }
    }
  }

  while (queue.length !== 0) {
    const at = queue.shift()!;
    discoverNeighbors(at);

    if (diagram[at[0]][at[1]] === VERTEX) {
      const e = getEdge(at, cellTo, diagram);

      if (e) {
        edges.push(e);
      }
    }
  }

  return edges;
}

function getEdge(
  at: Cell,
  cellTo: (Cell | undefined)[][],
  diagram: string[]
): Edge | void {
  for (
    let c: Cell | undefined = cellTo[at[0]][at[1]];
    c;
    c = cellTo[c[0]][c[1]]
  ) {
    if (diagram[c[0]][c[1]] === VERTEX) {
      return { from: c, to: at };
    }
  }
}
