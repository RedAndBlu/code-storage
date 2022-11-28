import { Graph, Vertex } from "./graph-adjacency-list";
import { DoublyLinkedList as List } from "../data-structure/doubly-linked-list";

interface Paths {
  source: Vertex;
  distTo: number[];
  vertexTo: (Vertex | null)[];
}

export function shortestPath(g: Graph, s: Vertex = 0): Paths {
  const rst: Paths = {
    source: s,
    distTo: new Array(g.vertices).fill(Number.POSITIVE_INFINITY),
    vertexTo: new Array(g.vertices).fill(null),
  };
  const queue = new List<Vertex>();
  const onQueue = new Set<Vertex>();
  let iteration = 0;
  let nodesCurrentIter = 1;
  let nodesNextIter = 0;

  rst.distTo[s] = 0;
  queue.push(s);
  onQueue.add(s);

  function relaxNeighbors(at: Vertex): void {
    for (const e of g.edgesOf(at)) {
      const newDistTo = rst.distTo[at] + e.cost;
      if (rst.distTo[e.to] > newDistTo) {
        rst.distTo[e.to] = newDistTo;
        rst.vertexTo[e.to] = at;

        if (!onQueue.has(e.to)) {
          queue.push(e.to);
          onQueue.add(e.to);
          nodesNextIter++;
        }
      }
    }
  }

  while (iteration < g.vertices - 1 && queue.size !== 0) {
    const at = queue.shift()!;
    onQueue.delete(at);
    relaxNeighbors(at);

    if (--nodesCurrentIter === 0) {
      iteration++;
      nodesCurrentIter = nodesNextIter;
      nodesNextIter = 0;
    }
  }

  if (queue.size !== 0) {
    // do something with negative cycles
  }

  return rst;
}
