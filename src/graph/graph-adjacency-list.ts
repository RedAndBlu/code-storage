/**
  reference:
  https://en.wikipedia.org/wiki/Graph_(abstract_data_type)
  https://en.wikipedia.org/wiki/Adjacency_list
  this one of many ways to implement it, it isn't really important
*/
export type Vertex = number;

export interface Edge {
  from: Vertex;
  to: Vertex;
  cost: number;
}

export class Graph {
  #directed: boolean;
  #adjacent: Set<Edge>[] = []; // you should use a linked list instead

  constructor(directed: boolean) {
    this.#directed = directed;
  }

  get isDirected(): boolean {
    return this.#directed;
  }

  get vertices(): number {
    return this.#adjacent.length;
  }

  addEdge(e: Edge): Graph {
    if (!this.#adjacent[e.from]) {
      this.#adjacent[e.from] = new Set<Edge>();
    }
    if (!this.#adjacent[e.to]) {
      this.#adjacent[e.to] = new Set<Edge>();
    }

    this.#adjacent[e.from].add(e);

    if (!this.#directed) {
      this.#adjacent[e.to].add({ from: e.to, to: e.from, cost: e.cost });
    }

    return this;
  }

  allEdges(): Edge[] {
    return this.#adjacent.map((s) => [...s]).flat();
  }

  edgesOf(v: Vertex): Set<Edge> {
    return this.#adjacent[v];
  }
}
