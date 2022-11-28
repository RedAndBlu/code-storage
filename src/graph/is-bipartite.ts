import { Graph, Vertex } from "./graph-adjacency-list";
import { DoublyLinkedList as List } from "../data-structure/doubly-linked-list";

// for a undirected graph
// reference https://en.wikipedia.org/wiki/Bipartite_graph
export function isBipartite(g: Graph): boolean {
  const BLANK = 0;
  const WHITE = 1;
  const RED = 2;
  const colors = new Array(g.vertices).fill(BLANK);

  // return true if the section is bipartite
  function check(at: Vertex): boolean {
    const queue = new List<Vertex>();
    queue.push(at);
    colors[at] = RED;

    while (queue.size !== 0) {
      const at = queue.shift()!;

      for (const e of g.edgesOf(at)) {
        // check for self-loop
        if (e.to !== at && colors[e.to] === BLANK) {
          colors[e.to] = colors[at] === RED ? WHITE : RED;
          queue.push(e.to);
        } else if (e.to !== at && colors[e.to] === colors[at]) {
          return false;
        }
      }
    }

    return true;
  }

  for (let v = 0; v < g.vertices; v++) {
    if (colors[v] === BLANK && !check(v)) {
      return false;
    }
  }

  return true;
}
