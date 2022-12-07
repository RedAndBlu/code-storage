import { Vertex } from "../graph/graph-adjacency-list";

// get the length of the tour from the tour[iStart] to tour[iEnd],
// when iStart and iEnd are longer or equal to the entire tour get the entire
// tour length (cycle from the start to the start again)
export function tourLength(
  tour: Vertex[],
  matrix: number[][],
  iStart: number,
  iEnd: number
): number {
  const getIdx = (i: number) => ((i % tour.length) + tour.length) % tour.length;
  let len = 0;
  let i = getIdx(iStart);
  let j = getIdx(iEnd);

  while (i !== j) {
    const next = getIdx(i + 1);
    len += matrix[tour[i]][tour[next]];
    i = next;
  }

  if (iEnd - iStart + 1 >= tour.length) {
    return len + matrix[tour.length - 1][0];
  }

  return len;
}
