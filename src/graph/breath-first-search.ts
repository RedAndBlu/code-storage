import { DoublyLinkedList as List } from "../data-structure/doubly-linked-list";
import { Graph, Vertex } from "./graph-adjacency-list";

/** reference: https://en.wikipedia.org/wiki/Breadth-first_search */
export function breadthFirstSearch(g: Graph, start = 0) {
  const vertexTo: (null | Vertex)[] = new Array(g.vertices).fill(null);
  const undiscovered: boolean[] = new Array(g.vertices).fill(true);
  const order: Vertex[] = [];
  const queue = new List<Vertex>();
  queue.push(start);
  undiscovered[start] = false;

  while (queue.size !== 0) {
    const at = queue.shift()!;
    order.push(at);

    for (const e of g.edgesOf(at)) {
      if (undiscovered[e.to]) {
        undiscovered[e.to] = false;
        queue.push(e.to);
        vertexTo[e.to] = at;
      }
    }
  }

  return { order, vertexTo };
}

// reconstruct the parents path from start to end
export function shortestPath(
  vertexTo: (null | Vertex)[],
  start: Vertex,
  end: Vertex
): Vertex[] {
  const path: Vertex[] = [];
  for (let at: number | null = end; at !== null; at = vertexTo[at]) {
    path.push(at);
  }

  path.reverse();

  if (path[0] === start) {
    return path;
  }

  return [];
}
