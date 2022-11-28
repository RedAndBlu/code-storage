import { Graph, Vertex } from "./graph-adjacency-list";

interface Collection {
  preOrder: Vertex[];
  postOrder: Vertex[];
  vertexTo: (Vertex | null)[];
}

/** reference: https://en.wikipedia.org/wiki/Depth-first_search */
export function depthFirstSearch(g: Graph, start = 0): Collection {
  const unvisited = new Array(g.vertices).fill(true);
  const c: Collection = {
    preOrder: [],
    postOrder: [],
    vertexTo: new Array(g.vertices).fill(null),
  };

  function traverse(at: Vertex) {
    unvisited[at] = false;
    c.preOrder.push(at);

    for (const e of g.edgesOf(at)) {
      if (unvisited[e.to]) {
        traverse(e.to);
        c.vertexTo[e.to] = at;
      }
    }

    c.postOrder.push(at);
  }

  traverse(start);
  return c;
}
