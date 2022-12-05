import { Vertex } from "../graph/graph-adjacency-list";

// get the length of the tour from the tour[iStart] to tour[iEnd]
export function tourLength(
  tour: Vertex[],
  matrix: number[][],
  iStart: number,
  iEnd: number
): number {
  const getIdx = (i: number) => ((i % tour.length) + tour.length) % tour.length;
  let len = 0;
  iStart = getIdx(iStart);
  iEnd = getIdx(iEnd);

  while (iStart !== iEnd) {
    const next = getIdx(iStart + 1);
    len += matrix[tour[iStart]][tour[next]];
    iStart = next;
  }

  return len;
}
