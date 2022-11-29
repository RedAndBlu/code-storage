import { diagramToGraph } from "../../src/stuff/diagram-to-graph";

describe("", () => {
  test("", () => {
    expect(
      diagramToGraph([
        "+------+----+",
        "|      |    |",
        "+---+--+    |",
        "|   |       |",
        "+---+-------+",
      ])
    ).toEqual([
      { from: [0, 0], to: [2, 0] },
      { from: [2, 0], to: [4, 0] },
      { from: [2, 0], to: [2, 4] },
      { from: [0, 0], to: [0, 7] },
      { from: [4, 0], to: [4, 4] },
      { from: [2, 4], to: [2, 7] },
      { from: [0, 7], to: [0, 12] },
      { from: [4, 4], to: [4, 12] },
    ]);
  });
});
