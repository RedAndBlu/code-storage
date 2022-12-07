import { Vertex } from "../graph/graph-adjacency-list";

// reference https://en.wikipedia.org/wiki/Travelling_salesman_problem
// this approximate the solution to the travelling salesman problem
export function tspNearestNeighbor(matrix: number[][], start: Vertex) {
  const visited = new Set<Vertex>();
  const tour: Vertex[] = [];
  let at: Vertex | null = start;

  function nearestNeighbor(at: Vertex): Vertex | null {
    let closest: null | Vertex = null;

    for (let to = 0; to < matrix.length; to++) {
      if (matrix[at][to] !== 0 && !visited.has(to)) {
        if (closest === null || matrix[at][to] < matrix[at][closest]) {
          closest = to;
        }
      }
    }

    return closest;
  }

  while (tour.length !== matrix.length && at !== null) {
    tour.push(at);
    visited.add(at);
    at = nearestNeighbor(at);
  }

  return tour;
}
