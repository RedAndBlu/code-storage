import { HashTable, MIN_CAPACITY } from "../../src/data-structure/hash-table";

let table = new HashTable<string>();

beforeEach(() => {
  table = new HashTable<string>();
});

describe(".add()", () => {
  test("should add the given element", () => {
    table.add("asd", "asd");
    expect(table.size).toBe(1);
    expect(table.get("asd")).toBe("asd");
  });

  test("should be able to add multiple elements", () => {
    table
      .add("a", "a")
      .add("b", "b")
      .add("c", "c")
      .add("d", "d")
      .add("e", "e")
      .add("f", "f")
      .add("g", "g");
    const expected = [
      { key: "a", value: "a" },
      { key: "b", value: "b" },
      { key: "c", value: "c" },
      { key: "d", value: "d" },
      { key: "e", value: "e" },
      { key: "f", value: "f" },
      { key: "g", value: "g" },
    ];
    expect(table.size).toBe(7);
    expect([...table]).toEqual(expect.arrayContaining(expected));
    expect(table["capacity"]).toBe(14);
  });
});

describe(".get()", () => {
  test("should get the given element when it exists", () => {
    table.add("asd", "asd");
    expect(table.get("dsa")).toBeUndefined();
  });

  test("should get the undefined when it doesn't exist", () => {
    table.add("asd", "asd");
    expect(table.get("asd")).toBe("asd");
  });
});

describe(".remove()", () => {
  test("should remove the given element from the table", () => {
    table.add("asd", "asd");
    table.remove("asd");
    expect(table.get("asd")).toBeUndefined();
  });

  test("should be able to remove multiple elements", () => {
    table
      .add("a", "a")
      .add("b", "b")
      .add("c", "c")
      .add("d", "d")
      .add("e", "e")
      .add("f", "f")
      .add("g", "g");
    expect(table["capacity"]).toBe(14);
    expect(table.size).toBe(MIN_CAPACITY);
    table.remove("a");
    table.remove("b");
    table.remove("c");
    table.remove("d");
    console.log([...table]);
    const expected = [
      { key: "a", value: "a" },
      { key: "b", value: "b" },
      { key: "c", value: "c" },
      { key: "d", value: "d" },
    ];
    expect(table["capacity"]).toBe(7);
    expect(table.size).toBe(3);
    expect([...table]).toEqual(expect.not.arrayContaining(expected));
  });
});
