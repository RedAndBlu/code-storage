import { DoublyLinkedList } from "../data-structure/doubly-linked-list";
import { Graph, Vertex } from "./graph-adjacency-list";

type Components = Vertex[][];

// https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
export function stronglyCC(g: Graph): Components {
  const rst: Components = [];
  const index = new Array<Vertex>(g.vertices);
  const lowLink = new Array<Vertex>(g.vertices);
  const onStack = new Set<Vertex>();
  const stack: Vertex[] = [];
  let i = 0;

  function collect(at: Vertex) {
    index[at] = lowLink[i] = i++;
    onStack.add(at);
    stack.push(at);

    for (const e of g.edgesOf(at)) {
      if (index[e.to] == undefined) {
        collect(e.to);
        lowLink[at] = Math.min(lowLink[at], lowLink[e.to]);
      } else if (onStack.has(e.to)) {
        lowLink[at] = Math.min(lowLink[at], index[e.to]);
      }
    }

    if (lowLink[at] === index[at]) {
      let n: Vertex;
      const cmp: Vertex[] = [];

      do {
        n = stack.pop()!;
        onStack.delete(n);
        cmp.push(n);
      } while (n !== at);

      rst.push(cmp);
    }
  }

  for (let v = 0; v < g.vertices; v++) {
    if (index[v] === undefined) {
      collect(v);
    }
  }

  return rst;
}
