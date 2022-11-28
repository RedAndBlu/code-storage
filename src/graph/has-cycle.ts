import { Graph, Vertex } from "./graph-adjacency-list";

export function hasCycle(g: Graph): boolean {
  if (g.isDirected) {
    return directedHasCycle(g);
  }

  return undirectedHasCycle(g);
}

function undirectedHasCycle(g: Graph): boolean {
  const visited = new Set<Vertex>();

  function hasCycle(at: Vertex, prev: Vertex): boolean {
    visited.add(at);

    for (const e of g.edgesOf(at)) {
      if (!visited.has(e.to)) {
        if (hasCycle(e.to, at)) {
          return true;
        }
      } else if (prev !== e.to) {
        return true;
      }
    }

    return false;
  }

  for (let v = 0; v < g.vertices; v++) {
    if (!visited.has(v) && hasCycle(v, -1)) {
      return true;
    }
  }

  return false;
}

function directedHasCycle(g: Graph): boolean {
  const visited = new Set<Vertex>();
  const onStack = new Set<Vertex>();

  function hasCycle(at: Vertex): boolean {
    visited.add(at);
    onStack.add(at);

    for (const e of g.edgesOf(at)) {
      if (!visited.has(e.to)) {
        if (hasCycle(e.to)) {
          return true;
        }
      } else if (onStack.has(e.to)) {
        return true;
      }
    }

    onStack.delete(at);
    return false;
  }

  for (let v = 0; v < g.vertices; v++) {
    if (!visited.has(v) && hasCycle(v)) {
      return true;
    }
  }

  return false;
}
