import { TernarySearchTree } from "../../src/data-structure/ternary-search-tree";
import { randomWord } from "../../src/util/random-word";

describe("TernarySearchTree", () => {
  let tree = new TernarySearchTree<number>();

  beforeEach(() => (tree = new TernarySearchTree<number>()));

  describe(".size", () => {
    test("should return 0 when empty", () => {
      expect(tree.size).toBe(0);
    });

    test("should return the amount of keys in the tree", () => {
      tree.set("key", 2).set("poppy", 5).set("star", 10);
      expect(tree.size).toBe(3);
    });

    test("should return the correct size after removal of keys", () => {
      tree.set("next", 19).set("nexy", 20).set("nexos", 21);
      expect(tree.size).toBe(3);
      tree.remove("next");
      expect(tree.size).toBe(2);
    });
  });

  describe(".set(key, value)", () => {
    test("should not add the given key when empty", () => {
      expect(tree.contains("")).toBe(false);
      tree.set("", 10);
      expect(tree.contains("")).toBe(false);
    });

    test("should add the given key with value", () => {
      expect(tree.get("TOI 700 d")).toBe(undefined);
      tree.set("TOI 700 d", 101);
      expect(tree.get("TOI 700 d")).toBe(101);
      expect(tree.size).toBe(1);
    });

    test("should update the value of given key when it already exists", () => {
      tree.set("K2-72e", 1);
      tree.set("K2-72e", 9);
      expect(tree.size).toBe(1);
      expect(tree.get("K2-72e")).toBe(9);
    });

    test("should be able to add a large arbitrary amount of keys", () => {
      const words = new Set(Array.from({ length: 10_000 }, () => randomWord()));
      let i = 0;

      words.forEach((word) => expect(tree.get(word)!).toBe(undefined));
      words.forEach((word) => tree.set(word, i++));
      i = 0;
      words.forEach((word) => expect(tree.get(word)!).toBe(i++));
      expect(tree.size).toBe(words.size);
    });

    test("should be able to be used in combination with .remove(key)", () => {
      const words = ["TRAPPIST-1d", "TRAPPIST-2d", "TRAPPIST-O", "TRAPPI"];
      tree.set(words[0], 0).set(words[1], 1).set(words[2], 2);
      expect(tree.size).toBe(3);
      expect(tree.get(words[0])).toBe(0);
      expect(tree.get(words[1])).toBe(1);
      expect(tree.get(words[2])).toBe(2);

      tree.remove(words[0]).remove(words[1]).remove(words[2]);
      expect(tree.contains(words[0])).toBe(false);
      expect(tree.contains(words[1])).toBe(false);
      expect(tree.contains(words[2])).toBe(false);
      expect(tree.size).toBe(0);

      tree.set(words[3], 3);
      expect(tree.get(words[3])).toBe(3);
      expect(tree.size).toBe(1);
    });
  });

  describe(".remove(key)", () => {
    test("should not remove when the key don't exists", () => {
      tree.set("Gliese 1061 d", 10);
      tree.remove("Gliese 1061 c");
      expect(tree.contains("Gliese 1061 c")).toBe(false);
      expect(tree.contains("Gliese 1061 d")).toBe(true);
    });

    test("should remove the given key", () => {
      tree.set("Ross 128 b", 10);
      expect(tree.contains("Ross 128 b")).toBe(true);
      tree.remove("Ross 128 b");
      expect(tree.contains("Ross 128 b")).toBe(false);
    });

    test("should able to remove all keys", () => {
      const words = [
        "Wolf 1061c",
        "Wolf",
        "Kepler-1229b",
        "Kepler-452b",
        "Kepler-1652b",
        "Kepler-1544 b",
        "K2-296b",
        "move",
        "mole",
        "cornell",
        "cold-x",
      ];

      words.forEach((k, i) => tree.set(k, i));
      words.forEach((k) => expect(tree.contains(k)).toBe(true));
      expect(tree.size).toBe(words.length);
      words.forEach((k) => tree.remove(k));
      words.forEach((k) => expect(tree.contains(k)).toBe(false));
      expect(tree.size).toBe(0);
    });

    test("should be able to remove a large amount of keys", () => {
      const words = new Set(Array.from({ length: 10_000 }, () => randomWord()));

      words.forEach((word) =>
        tree.set(word, Math.floor(Math.random() * 10_000))
      );
      expect(tree.size).toBe(words.size);

      words.forEach((word) => tree.remove(word));
      words.forEach((word) => expect(tree.contains(word)).toBe(false));
      expect(tree.size).toBe(0);
    });
  });

  describe("keys()", () => {
    test("should return an empty array when the tree is empty", () => {
      expect(tree.keys()).toEqual([]);
    });

    test("should return an array with all keys in ascending order", () => {
      const words = [
        "tv",
        "tc",
        "tcmolo",
        "tg",
        "the strokes",
        "Wolf 1061c",
        "Wolf",
        "Kepler-1544 b",
        "K2-296b",
        "move",
        "mole",
        "cornell",
        "cold-x",
      ];
      words.forEach((k, i) => tree.set(k, i));
      expect(tree.keys()).toEqual(words.sort());
    });

    test("should be able to collect large amount od keys", () => {
      const words = new Set(Array.from({ length: 1_000 }, () => randomWord()));
      words.forEach((word) =>
        tree.set(word, Math.floor(Math.random() * 10_000))
      );
      expect(tree.keys()).toEqual([...words].sort());
    });
  });

  describe("keysWithPrefix(prefix)", () => {
    test("should return an empty array when the tree is empty", () => {
      expect(tree.keys()).toEqual([]);
    });

    test("should return an empty array when the isn't any keys with prefix", () => {
      const words = [
        "Kepler-283c",
        "Wolf",
        "Wolfy",
        "Wolfman",
        "Gliese 625 b",
        "Tau Ceti f",
        "LHS 1140 b",
        "K2-9b",
        "K2-288Bb",
        "Wolf 1061c",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.keysWithPrefix("Fox")).toEqual([]);
    });

    test("should return all the keys with the given prefix", () => {
      const words = [
        "Kepler-283c",
        "Wolf",
        "Wolfy",
        "Wolfman",
        "Gliese 625 b",
        "Tau Ceti f",
        "LHS 1140 b",
        "K2-9b",
        "K2-288Bb",
        "Wolf 1061c",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.keysWithPrefix("Wolf")).toEqual([
        "Wolf",
        "Wolf 1061c",
        "Wolfman",
        "Wolfy",
      ]);
    });
  });

  describe("longestPrefixOf(query)", () => {
    test("should return an empty string when the tree is empty", () => {
      expect(tree.longestPrefixOf("query")).toBe("");
    });

    test("should return an empty string when no prefix was found", () => {
      const words = [
        "Proxima Centauri",
        "Gliese",
        "TRAPPIST",
        "YZ Ceti",
        "Tau Ceti",
        "Cancri",
        "Upsilon Andromedae",
        "Ursae Majoris",
        "Mu Arae",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.longestPrefixOf("EPIC")).toBe("");
    });

    test("should return the longest key that is a prefix of query", () => {
      const words = [
        "Proxima Centauri",
        "Gliese",
        "Gli",
        "TRAPPIST",
        "YZ Ceti",
        "Tau Ceti",
        "Cancri",
        "Upsilon Andromedae",
        "Ursae Majoris",
        "Mu Arae",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.longestPrefixOf("Gliese 1061")).toBe("Gliese");
    });
  });

  describe("greatestKey()", () => {
    test("should return an empty string when the tree is empty", () => {
      expect(tree.greatestKey()).toBe("");
    });

    test("should return an the greatest key in the tree", () => {
      const words = [
        "Mary",
        "Patricia",
        "Jennifer",
        "Linda",
        "Elizabeth",
        "William",
        "James",
        "Robert",
        "John",
        "Michael",
        "Willy",
        "Walter",
        "Willx",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.greatestKey()).toBe("Willy");
    });

    test("should return an the greatest key in a large tree", () => {
      const words = Array.from({ length: 1_000 }, () => randomWord());
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.greatestKey()).toBe([...words].sort()[words.length - 1]);
    });
  });

  describe("smallestKey()", () => {
    test("should return an empty string when the tree is empty", () => {
      expect(tree.smallestKey()).toBe("");
    });

    test("should return an the smallest key in the tree", () => {
      const words = [
        "Mary",
        "Patricia",
        "Jennifer",
        "Linda",
        "Elizabeth",
        "William",
        "James",
        "Robert",
        "John",
        "Michael",
        "Anthony",
        "Andrew",
        "Ashley",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.smallestKey()).toBe("Andrew");
    });

    test("should return an the smallest key in a large tree", () => {
      const words = Array.from({ length: 1_000 }, () => randomWord());
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.smallestKey()).toBe([...words].sort()[0]);
    });
  });

  describe("floor(query)", () => {
    test("should return a key equal to the query", () => {
      const words = [
        "Anthony",
        "Andrew",
        "Ashley",
        "Ashlee",
        "Ashlei",
        "Ashlex",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.floor("Ashley")).toBe("Ashley");
    });

    test("should return a key closest to the query", () => {
      const words = [
        "Anthony",
        "Andrew",
        "Ashlexz",
        "Ashlee",
        "Ashle",
        "Ashlexzam",
        "Ashlez",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.floor("Ashley")).toBe("Ashlexzam");
    });

    test("should return a prefix when it's the closest to the query", () => {
      const words = [
        "Anthony",
        "Andrew",
        "Ashle",
        "Ashlezam",
        "Ashlezaa",
        "Ashliaa",
      ];
      words.forEach((word, i) => tree.set(word, i));
      expect(tree.floor("Ashley")).toBe("Ashle");
    });

    test("after removing the key closest to the query should return next closest", () => {
      const words = ["Anthony", "Andrew", "Flooz", "Fli", "Flask"];
      words.forEach((word, i) => tree.set(word, i));
      tree.remove("Fli");
      expect(tree.contains("Fli")).toBe(false);
      expect(tree.floor("Floor")).toBe("Flask");
    });

    test("should able to select the floor key of a large tree", () => {
      const words = new Set(Array.from({ length: 10_000 }, () => randomWord()));
      words.forEach((word) =>
        tree.set(word, Math.floor(Math.random() * 10_000))
      );
      const query = "mono";

      if (tree.contains(query)) {
        expect(tree.floor(query)).toBe(query);
      } else {
        const keys = [...tree.keys(), query].sort();
        expect(tree.floor(query)).toEqual(keys[keys.indexOf(query) - 1]);
      }
    });
  });
});
