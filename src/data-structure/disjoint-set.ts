// reference https://en.wikipedia.org/wiki/Disjoint-set_data_structure
export class DisjointSet {
  private rootOfId: number[] = [];
  private componentsSize: number[] = [];
  private _components: number;
  private size: number;

  constructor(size: number) {
    this.size = size;
    this._components = size;

    for (let id = 0; id < size; id++) {
      this.rootOfId[id] = id;
      this.componentsSize[id] = 1;
    }
  }

  /** the amount of not connected components */
  get components(): number {
    return this._components;
  }

  getComponentsSize(id: number): number | undefined {
    return this.componentsSize[this.find(id)];
  }

  private find(id: number): number {
    if (id < this.size && id >= 0) {
      while (id !== this.rootOfId[id]) {
        id = this.rootOfId[id] = this.rootOfId[this.rootOfId[id]];
      }

      return id;
    }

    return -1;
  }

  connected(id1: number, id2: number): boolean {
    const root1 = this.find(id1);
    const root2 = this.find(id2);
    return root1 !== -1 && root2 != -1 && root1 === root2;
  }

  connect(id1: number, id2: number): void {
    const root1 = this.find(id1);
    const root2 = this.find(id2);

    if (root1 !== -1 && root2 !== -1 && root1 !== root2) {
      if (this.componentsSize[root1] > this.componentsSize[root2]) {
        this.componentsSize[root1] += this.componentsSize[root2];
        this.rootOfId[root2] = root1;
      } else {
        this.componentsSize[root2] += this.componentsSize[root1];
        this.rootOfId[root1] = root2;
      }

      this._components--;
    }
  }
}
