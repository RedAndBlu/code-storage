import { createTournamentRounds } from "../../src/stuff/round-robin-tournament";

describe("createTournamentRounds()", () => {
  const participants = "abcdefghij".split("");
  const rounds = createTournamentRounds(participants);

  test("should create (teams - 1) rounds", () => {
    expect(rounds.length).toBe(participants.length - 1);
  });

  test("for every round each participant play once", () => {
    rounds.forEach((round) => {
      expect(new Set(round.flat()).size).toBe(participants.length);
    });
  });

  test("shouldn't return duplicate matches", () => {
    const matchCounter = new Set<string>();

    rounds.forEach((round) => {
      round.forEach(([p1, p2]) => {
        const match1 = `${p1}-$${p2}`;
        const match2 = `${p2}-$${p1}`;
        expect(matchCounter.has(match1)).toBe(false);
        expect(matchCounter.has(match2)).toBe(false);
        matchCounter.add(match1);
        matchCounter.add(match2);
      });
    });
  });
});
