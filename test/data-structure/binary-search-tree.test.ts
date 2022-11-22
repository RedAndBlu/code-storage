import { BinarySearchTree } from "../../src/data-structure/binary-search-tree";

let bst = new BinarySearchTree<string>();

beforeEach(() => {
  bst = new BinarySearchTree();
});

describe(".insert()", () => {
  test("should add the given element to the tree", () => {
    bst.insert("a", "a");
    expect(bst.get("a")).toBe("a");
    expect(bst.size).toBe(1);
  });

  test("should be able to add multiple values", () => {
    bst.insert("b", "b").insert("c", "c").insert("a", "a");
    expect(bst.size).toBe(3);
    expect(bst.toArray()).toEqual(["a", "b", "c"]);
  });
});

describe(".toArray()", () => {
  test("should return a sorted array with all elements in the tree", () => {
    bst
      .insert("e", "e")
      .insert("c", "c")
      .insert("a", "a")
      .insert("d", "d")
      .insert("f", "f");
    expect(bst.toArray()).toEqual(["a", "c", "d", "e", "f"]);
  });
});

describe(".get()", () => {
  test("should return the given element in the tree", () => {
    bst.insert("b", "b").insert("a", "a").insert("c", "c");
    expect(bst.get("a")).toBe("a");
  });
});

describe(".height()", () => {
  test("should return two for three elements add in balance", () => {
    bst.insert("b", "b").insert("a", "a").insert("c", "c");
    expect(bst.size).toBe(3);
    expect(bst.height()).toBe(2);
  });
});

describe(".remove()", () => {
  test("should remove the given element from the tree", () => {
    bst.insert("b", "b").insert("a", "a").insert("c", "c");
    bst.remove("a");
    expect(bst.get("a")).toBeUndefined();
  });
});

describe(".floor()", () => {
  test("should be able to get the equal value when exist", () => {
    bst
      .insert("e", "e")
      .insert("c", "c")
      .insert("a", "a")
      .insert("d", "d")
      .insert("f", "f");
    expect(bst.floor("c")).toBe("c");
  });

  test("should be able to return the closest smallest to the given one when the given one doesn't exist", () => {
    bst
      .insert("e", "e")
      .insert("c", "c")
      .insert("a", "a")
      .insert("d", "d")
      .insert("f", "f");
    expect(bst.floor("b")).toBe("a");
  });
});
