import { Heap } from "../data-structure/binary-heap";
import { Edge, Graph, Vertex } from "./graph-adjacency-list";

export type MEdge = { v1: Vertex; v2: Vertex; cost: number };

// https://en.wikipedia.org/wiki/Prim%27s_algorithm
export function primTree(g: Graph, start = 0): MEdge[] {
  const vis = new Set<Vertex>();
  const pQue = new Heap<Edge>((e1, e2) => e1.cost - e2.cost);
  const tree: MEdge[] = [];

  function discoverEdges(at: Vertex) {
    vis.add(at);

    for (const e of g.edgesOf(at)) {
      if (!vis.has(e.to)) {
        pQue.insert(e);
      }
    }
  }

  discoverEdges(start);

  while (pQue.size !== 0) {
    const e = pQue.pop()!;

    if (!vis.has(e.to)) {
      tree.push({ v1: e.from, v2: e.to, cost: e.cost });
      discoverEdges(e.to);
    }
  }

  return tree;
}
