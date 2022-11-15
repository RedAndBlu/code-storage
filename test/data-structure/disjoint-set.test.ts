import { DisjointSet } from "../../src/data-structure/disjoint-set";

describe("DisjointSet", () => {
  describe(".connected()", () => {
    const dSet = new DisjointSet(2);

    test("should return false when two nodes aren't connected", () => {
      expect(dSet.connected(0, 1)).toBe(false);
    });

    test("should return true when two nodes are connected", () => {
      dSet.connect(0, 1);
      expect(dSet.connected(0, 1)).toBe(true);
    });
  });

  describe(".getComponentsSize()", () => {
    const dSet = new DisjointSet(2);

    test("should return the amount of connected nodes", () => {
      dSet.connect(0, 1);
      expect(dSet.getComponentsSize(0)).toBe(2);
      expect(dSet.getComponentsSize(1)).toBe(2);
    });
  });

  describe(".connect()", () => {
    const dSet = new DisjointSet(2);

    test("should be able to connect two nodes", () => {
      dSet.connect(0, 1);
      expect(dSet.getComponentsSize(0)).toBe(2);
      expect(dSet.connected(1, 0)).toBe(true);
    });
  });
});
