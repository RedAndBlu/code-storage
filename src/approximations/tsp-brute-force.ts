import { Vertex } from "../graph/graph-adjacency-list";
import { permutation } from "../permutation/permutationSet";
import { tourLength } from "../util/tourLength";

// reference https://en.wikipedia.org/wiki/Travelling_salesman_problem
// find a solution to the travelling salesman problem
export function tspBruteForce(matrix: number[][], start: Vertex) {
  let bestTour: Vertex[] | null = null;
  let bestLen = Number.POSITIVE_INFINITY;
  const prs = permutation(
    Array.from({ length: matrix.length }, (_, v) => v).filter(
      (v) => v !== start
    )
  );

  for (const p of prs) {
    const tour = [start, ...p, start];
    const len = tourLength(tour, matrix, 0, matrix.length - 1);

    if (!tour || len < bestLen) {
      bestLen = len;
      bestTour = tour;
    }
  }

  return bestTour;
}
