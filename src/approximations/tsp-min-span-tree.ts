import {
  edgesToGraph,
  matrixToGraph,
  Vertex,
} from "../graph/graph-adjacency-list";
import { primTree } from "../graph/prim-min-span-tree";

// reference https://en.wikipedia.org/wiki/Travelling_salesman_problem
// this approximate the solution to the travelling salesman problem,
// traversing the minimum spanning tree of given graph in reverse post order
// return a complete cycle tour from starting city to the ending city
export function tspMinSpanTree(matrix: number[][], start: Vertex): Vertex[] {
  const tour: Vertex[] = [];
  const visited = new Set();
  let i = matrix.length - 1;
  const g = edgesToGraph(
    primTree(matrixToGraph(matrix)).map((e) => ({
      from: e.v1,
      to: e.v2,
      cost: e.cost,
    }))
  );

  function traverse(at: Vertex) {
    visited.add(at);

    for (const e of g.edgesOf(at)) {
      if (!visited.has(e.to)) {
        traverse(e.to);
      }
    }

    tour[i--] = at;
  }

  traverse(start);
  tour.push(tour[0]);
  return tour;
}
