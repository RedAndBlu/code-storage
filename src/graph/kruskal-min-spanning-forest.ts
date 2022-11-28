import { Edge, Graph, Vertex } from "./graph-adjacency-list";
import { DisjointSet } from "../data-structure/disjoint-set";

export type MEdge = { v1: Vertex; v2: Vertex; cost: number };

// reference: https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
// clustersForest is a nice example usage for it
export function minSpanningForest(g: Graph): MEdge[] {
  const mst: MEdge[] = [];
  const union = new DisjointSet(g.vertices);
  // alternative we could use a binary heap
  const edges: Edge[] = g.allEdges().sort((e1, e2) => e1.cost - e2.cost);

  for (let i = 0; union.components > 1 && i < edges.length; i++) {
    const e = edges[i];

    if (!union.connected(e.from, e.to)) {
      mst.push({ v1: e.from, v2: e.to, cost: e.cost });
      union.connect(e.from, e.to);
    }
  }

  return mst;
}

// the minSpanningForest can be used to find cluster too just specifying the
// max distance two vertices can be apart
export function clustersForest(g: Graph, maxDist: number): MEdge[] {
  const clusters: MEdge[] = [];
  const union = new DisjointSet(g.vertices);
  // alternative we could use a binary heap
  const edges: Edge[] = g.allEdges().sort((e1, e2) => e1.cost - e2.cost);

  for (let i = 0; union.components !== 1 && i < edges.length; i++) {
    const e = edges[i];

    if (maxDist >= e.cost && !union.connected(e.from, e.to)) {
      clusters.push({ v1: e.from, v2: e.to, cost: e.cost });
      union.connect(e.from, e.to);
    }
  }

  return clusters;
}
