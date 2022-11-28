import { Graph, Vertex } from "./graph-adjacency-list";
import { topologicalSort } from "./topological-sort";

interface Paths {
  source: Vertex;
  distTo: number[];
  vertexTo: (Vertex | null)[];
}

// it can be used for longest path too by negating all edges of the graph
// for arbitrarily-weighted (negative too) DAGs:
// reference: https://en.wikipedia.org/wiki/Shortest_path_problem
export function dagShortestPaths(g: Graph, s: Vertex = 0): Paths | void {
  const order = topologicalSort(g);

  if (order.length === 0) {
    // in case the graph is undirected has a cycle or empty
    return;
  }

  const rst: Paths = {
    source: s,
    distTo: new Array(g.vertices).fill(Number.POSITIVE_INFINITY),
    vertexTo: new Array(g.vertices).fill(null),
  };
  rst.distTo[s] = 0;

  for (const v of order) {
    for (const e of g.edgesOf(v)) {
      const newDistTo = rst.distTo[v] + e.cost;

      if (rst.distTo[e.to] > newDistTo) {
        rst.distTo[e.to] = newDistTo;
        rst.vertexTo[e.to] = v;
      }
    }
  }

  return rst;
}

interface Path {
  path: Vertex[];
  dist: number;
}

// reconstruct the parents path from start to end
export function shortestPath(p: Paths, end: Vertex): Path | void {
  const rst: Path = {
    path: [],
    dist: 0,
  };
  for (let at: number | null = p.source; at !== null; at = p.vertexTo[at]) {
    rst.path.push(at);
    rst.dist += p.distTo[at];
  }

  rst.path.reverse();

  if (rst.path[0] === p.source) {
    return rst;
  }
}
