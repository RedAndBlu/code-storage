import { Graph, Vertex } from "./graph-adjacency-list";
import { Heap } from "../data-structure/binary-heap";

interface Paths {
  source: Vertex;
  distTo: number[];
  vertexTo: (Vertex | null)[];
}

// given single node as the "source" node and finds shortest paths from the
// source to all other nodes in the graph
// reference https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
export function dijkstra(g: Graph, s: Vertex = 0): Paths {
  const visited = new Set<Vertex>();
  const pQue = new Heap<{ vx: Vertex; cost: number }>(
    (a, b) => a.cost - b.cost
  );
  const rst: Paths = {
    source: s,
    distTo: new Array(g.vertices).fill(Number.POSITIVE_INFINITY),
    vertexTo: new Array(g.vertices).fill(null),
  };
  rst.distTo[s] = 0;
  pQue.insert({ vx: s, cost: 0 });

  function relaxNeighbors(at: { vx: Vertex; cost: number }): void {
    for (const e of g.edgesOf(at.vx)) {
      const newDistTo = at.cost + e.cost;

      if (!visited.has(e.to) && rst.distTo[e.to] > newDistTo) {
        rst.distTo[e.to] = newDistTo;
        rst.vertexTo[e.to] = at.vx;
        pQue.insert({ vx: e.to, cost: newDistTo });
      }
    }
  }

  while (pQue.size) {
    const at = pQue.pop()!;

    if (!visited.has(at.vx)) {
      visited.add(at.vx);
      relaxNeighbors(at);
    }
  }

  return rst;
}
