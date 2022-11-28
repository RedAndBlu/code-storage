import { Graph, Vertex } from "./graph-adjacency-list";

interface Components {
  vertexComponentId: number[];
  count: number;
}

/** reference: https://en.wikipedia.org/wiki/Component_(graph_theory)
 * only for undirected graph, use strongly connected components for directed graph
 */
export function find(g: Graph): Components | void {
  if (g.isDirected) {
    return;
  }

  const c: Components = {
    vertexComponentId: [],
    count: 0,
  };

  function collect(at: Vertex, id: number): void {
    c.vertexComponentId[at] = id;

    for (const e of g.edgesOf(at)) {
      if (c.vertexComponentId[e.to] === undefined) {
        collect(e.to, id);
      }
    }
  }

  for (let v = 0; v < g.vertices; v++) {
    if (c.vertexComponentId[v] === undefined) {
      collect(v, c.count++);
    }
  }

  return c;
}
