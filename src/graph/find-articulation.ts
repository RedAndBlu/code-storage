import { Graph, Vertex } from "./graph-adjacency-list";

// https://en.wikipedia.org/wiki/Biconnected_component
export function findArticulation(graph: Graph): Vertex[] {
  const vs: number = graph.vertices;
  const visited = new Set<Vertex>();
  const lowLink: number[] = new Array<number>(vs).fill(-1);
  const indices: number[] = new Array<number>(vs).fill(-1);
  const arts: Vertex[] = [];
  let id = 0;
  let edgeOutOfRoot = 0;

  for (let v: number = 0; v < vs; v++) {
    if (!visited.has(v)) {
      edgeOutOfRoot = 0;
      dfsFindArt(v, v, -1);

      if (edgeOutOfRoot > 1) {
        arts.push(v);
      }
    }
  }

  function dfsFindArt(root: Vertex, at: Vertex, parent: Vertex): void {
    visited.add(at);
    lowLink[at] = indices[at] = id++;

    if (root === parent) {
      edgeOutOfRoot++;
    }

    for (const e of graph.edgesOf(at)) {
      if (visited.has(e.to)) {
        lowLink[at] = Math.min(lowLink[at], indices[e.to]);
      } else if (e.to !== parent) {
        dfsFindArt(root, e.to, at);
        lowLink[at] = Math.min(lowLink[at], lowLink[e.to]);

        if (indices[at] <= lowLink[e.to]) {
          arts.push(at);
        }
      }
    }
  }

  return arts;
}
