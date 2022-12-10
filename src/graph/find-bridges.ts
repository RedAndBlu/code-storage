import { Edge, Graph, Vertex } from "./graph-adjacency-list";

// https://en.wikipedia.org/wiki/Bridge_(graph_theory)
export function findBridges(graph: Graph): Edge[] {
  const vs: number = graph.vertices;
  const bridges: Edge[] = [];
  const visited = new Set<Vertex>();
  const lowLink: number[] = new Array<number>(vs).fill(-1);
  const indices: number[] = new Array<number>(vs).fill(-1);
  let id: number = 0;

  for (let v: number = 0; v < vs; v++) {
    if (!visited.has(v)) {
      dfsFindBridge(v, -1);
    }
  }

  function dfsFindBridge(at: Vertex, parent: Vertex) {
    visited.add(at);
    lowLink[at] = indices[at] = id++;

    for (const e of graph.edgesOf(at)) {
      if (!visited.has(e.to)) {
        dfsFindBridge(e.to, at);
        lowLink[at] = Math.min(lowLink[at], lowLink[e.to]);

        if (indices[at] < lowLink[e.to]) {
          bridges.push(e);
        }
      } else if (e.to !== parent) {
        lowLink[at] = Math.min(lowLink[at], indices[e.to]);
      }
    }
  }

  return bridges;
}
