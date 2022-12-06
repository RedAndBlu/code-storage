import { DisjointSet } from "../data-structure/disjoint-set";
import { matrixToEdges } from "../graph/graph-adjacency-list";

class Segments {
  private union: DisjointSet;
  private segments = new Map<number, number[]>();

  constructor(vertices: number) {
    this.union = new DisjointSet(vertices);

    for (let i = 0; i < vertices; i++) {
      this.segments.set(i, [i]);
    }
  }

  count(): number {
    return this.union.components;
  }

  getSegments(): number[][] {
    return [...this.segments.values()];
  }

  connect(v1: number, v2: number): void {
    if (
      this.segments.has(v1) &&
      this.segments.has(v2) &&
      !this.union.connected(v1, v2)
    ) {
      const seg1 = this.segments.get(v1)!;
      const seg2 = this.segments.get(v2)!;
      let newSeg = [];

      // head - tail
      if (seg1[0] === v1 && seg2[seg2.length - 1] === v2) {
        newSeg = seg2.concat(seg1);
      }
      // tail - head
      else if (seg1[seg1.length - 1] === v1 && seg2[0] === v2) {
        newSeg = seg1.concat(seg2);
      }
      // head - head
      else if (seg1[0] === v1 && seg2[0] === v2) {
        newSeg = seg1.reverse().concat(seg2);
      }
      // tail - tail
      else {
        newSeg = seg1.concat(seg2.reverse());
      }

      this.segments.delete(seg1[0]);
      this.segments.delete(seg1[seg1.length - 1]);
      this.segments.delete(seg2[0]);
      this.segments.delete(seg2[seg2.length - 1]);
      this.union.connect(v1, v2);
      this.segments.set(newSeg[0], newSeg);
      this.segments.set(newSeg[newSeg.length - 1], newSeg);
    }
  }
}

// reference https://en.wikipedia.org/wiki/Travelling_salesman_problem
// this approximate the solution to the travelling salesman problem
export function tpsMultiFragment(matrix: number[][]): number[] {
  const edges = matrixToEdges(matrix);
  const segments = new Segments(matrix.length);
  edges.sort((e1, e2) => e1.cost - e2.cost); // ascending

  for (let i = 0; i < edges.length && segments.count() > 1; i++) {
    const e = edges[i];
    segments.connect(e.from, e.to);
  }

  const seg = segments.getSegments()[0];
  return [...seg, seg[0]];
}
