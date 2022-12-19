import { Trie } from "../../src/data-structure/search-trie-rway";
import { randomWord } from "../../src/util/random-word";

describe("TernarySearchTree", () => {
  let trie = new Trie<number>();

  beforeEach(() => (trie = new Trie<number>()));

  describe(".size", () => {
    test("should return 0 when empty", () => {
      expect(trie.size).toBe(0);
    });

    test("should return the amount of keys in the tree", () => {
      trie.set("key", 2).set("poppy", 5).set("star", 10);
      expect(trie.size).toBe(3);
    });

    test("should return the correct size after removal of keys", () => {
      trie.set("next", 19).set("nexy", 20).set("nexos", 21);
      expect(trie.size).toBe(3);
      trie.remove("next");
      expect(trie.size).toBe(2);
    });
  });

  describe(".set(key, value)", () => {
    test("should not add the given key when empty", () => {
      expect(trie.contains("")).toBe(false);
      trie.set("", 10);
      expect(trie.contains("")).toBe(false);
    });

    test("should add the given key with value", () => {
      expect(trie.get("TOI 700 d")).toBe(undefined);
      trie.set("TOI 700 d", 101);
      expect(trie.get("TOI 700 d")).toBe(101);
      expect(trie.size).toBe(1);
    });

    test("should update the value of given key when it already exists", () => {
      trie.set("K2-72e", 1);
      trie.set("K2-72e", 9);
      expect(trie.size).toBe(1);
      expect(trie.get("K2-72e")).toBe(9);
    });

    test("should be able to add a large arbitrary amount of keys", () => {
      const words = new Set(Array.from({ length: 10_000 }, () => randomWord()));
      let i = 0;

      words.forEach((word) => expect(trie.get(word)!).toBe(undefined));
      words.forEach((word) => trie.set(word, i++));
      i = 0;
      words.forEach((word) => expect(trie.get(word)!).toBe(i++));
      expect(trie.size).toBe(words.size);
    });

    test("should be able to be used in combination with .remove(key)", () => {
      const words = ["TRAPPIST-1d", "TRAPPIST-2d", "TRAPPIST-O", "TRAPPI"];
      trie.set(words[0], 0).set(words[1], 1).set(words[2], 2);
      expect(trie.size).toBe(3);
      expect(trie.get(words[0])).toBe(0);
      expect(trie.get(words[1])).toBe(1);
      expect(trie.get(words[2])).toBe(2);

      trie.remove(words[0]).remove(words[1]).remove(words[2]);
      expect(trie.contains(words[0])).toBe(false);
      expect(trie.contains(words[1])).toBe(false);
      expect(trie.contains(words[2])).toBe(false);
      expect(trie.size).toBe(0);

      trie.set(words[3], 3);
      expect(trie.get(words[3])).toBe(3);
      expect(trie.size).toBe(1);
    });
  });

  describe(".remove(key)", () => {
    test("should not remove when the key don't exists", () => {
      trie.set("Gliese 1061 d", 10);
      trie.remove("Gliese 1061 c");
      expect(trie.contains("Gliese 1061 c")).toBe(false);
      expect(trie.contains("Gliese 1061 d")).toBe(true);
    });

    test("should remove the given key", () => {
      trie.set("Ross 128 b", 10);
      expect(trie.contains("Ross 128 b")).toBe(true);
      trie.remove("Ross 128 b");
      expect(trie.contains("Ross 128 b")).toBe(false);
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

      words.forEach((k, i) => trie.set(k, i));
      words.forEach((k) => expect(trie.contains(k)).toBe(true));
      expect(trie.size).toBe(words.length);
      words.forEach((k) => trie.remove(k));
      words.forEach((k) => expect(trie.contains(k)).toBe(false));
      expect(trie.size).toBe(0);
    });

    test("should be able to remove a large amount of keys", () => {
      const words = new Set(Array.from({ length: 10_000 }, () => randomWord()));

      words.forEach((word) =>
        trie.set(word, Math.floor(Math.random() * 10_000))
      );
      expect(trie.size).toBe(words.size);

      words.forEach((word) => trie.remove(word));
      words.forEach((word) => expect(trie.contains(word)).toBe(false));
      expect(trie.size).toBe(0);
    });
  });

  describe("keys()", () => {
    test("should return an empty array when the tree is empty", () => {
      expect(trie.keys()).toEqual([]);
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
      words.forEach((k, i) => trie.set(k, i));
      expect(trie.keys()).toEqual(words.sort());
    });

    test("should be able to collect large amount od keys", () => {
      const words = new Set(Array.from({ length: 1_000 }, () => randomWord()));
      words.forEach((word) =>
        trie.set(word, Math.floor(Math.random() * 10_000))
      );
      expect(trie.keys()).toEqual([...words].sort());
    });
  });

  describe("keysWithPrefix(prefix)", () => {
    test("should return an empty array when the tree is empty", () => {
      expect(trie.keys()).toEqual([]);
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
      words.forEach((word, i) => trie.set(word, i));
      expect(trie.keysWithPrefix("Fox")).toEqual([]);
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
      words.forEach((word, i) => trie.set(word, i));
      expect(trie.keysWithPrefix("Wolf")).toEqual([
        "Wolf",
        "Wolf 1061c",
        "Wolfman",
        "Wolfy",
      ]);
    });
  });

  describe("longestPrefixOf(query)", () => {
    test("should return an empty string when the tree is empty", () => {
      expect(trie.longestPrefixOf("query")).toBe("");
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
      words.forEach((word, i) => trie.set(word, i));
      expect(trie.longestPrefixOf("EPIC")).toBe("");
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
      words.forEach((word, i) => trie.set(word, i));
      expect(trie.longestPrefixOf("Gliese 1061")).toBe("Gliese");
    });
  });
});
