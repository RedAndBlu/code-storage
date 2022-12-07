import { Vertex } from "../graph/graph-adjacency-list";
import { swap } from "../util/swap";
import { tourLength } from "../util/tourLength";

type Segment = [number, number];

// reverse all possible size segments of the given tour to find a shorter tour
// if the reversing is successful, redo the process again until no improvement
// reference https://nbviewer.org/url/norvig.com/ipython/TSP.ipynb
// the give tour should include starting vertex to the ending tour vertex
export function tpsReverseSegments(tour: Vertex[], m: number[][]): Vertex[] {
  const originalLen = tourLength(tour, m, 0, tour.length - 1);

  for (const seg of segmentsOf(tour)) {
    reverseSegIfBetter(tour, seg, m);
  }

  if (originalLen > tourLength(tour, m, 0, tour.length - 1)) {
    return tpsReverseSegments(tour, m);
  }

  return tour;
}

// return all segments length of the given tour
function segmentsOf(tour: number[]): Segment[] {
  const sgs: [number, number][] = [];

  for (let sz = 2; sz < tour.length; sz++) {
    for (let i = 0; i + sz < tour.length; i++) {
      sgs.push([i, Math.min(i + sz, tour.length - 1)]);
    }
  }

  return sgs;
}

function reverseSegIfBetter(tour: Vertex[], sg: Segment, m: number[][]) {
  const segLen = tourLength(tour, m, sg[0] - 1, sg[1] + 1);
  reverse(tour, sg[0], sg[1]);

  if (segLen < tourLength(tour, m, sg[0] - 1, sg[1] + 1)) {
    reverse(tour, sg[0], sg[1]);
  }
}

function reverse<T>(arr: T[], iStart: number, iEnd: number) {
  while (iStart < iEnd) {
    swap(arr, iStart++, iEnd--);
  }
}
