import { Graph, Vertex } from "./graph-adjacency-list";
import { hasCycle } from "./has-cycle";

/**
  reference: https://en.wikipedia.org/wiki/Topological_sorting

  A topological ordering is possible if and only if the graph has no directed
  cycles, that is, if it is a directed acyclic graph (DAG).
*/
export function topologicalSort(g: Graph): Vertex[] {
  if (!g.isDirected || hasCycle(g)) {
    return [];
  }

  const order: Vertex[] = [];
  const unvisited = new Array(g.vertices).fill(true);
  let insertIdx = g.vertices - 1;

  function traverse(at: number): void {
    unvisited[at] = false;

    for (const e of g.edgesOf(at)) {
      if (unvisited[e.to]) {
        traverse(e.to);
      }
    }

    order[insertIdx--] = at;
  }

  for (let v = 0; v < g.vertices; v++) {
    if (unvisited[v]) {
      traverse(v);
    }
  }

  return order;
}
