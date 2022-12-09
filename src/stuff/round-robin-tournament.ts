import { shuffle } from "../sorting/shuffle";

type Match<T> = [T, T];

// https://en.wikipedia.org/wiki/Round-robin_tournament
// returns a single round-robin schedule
export function createTournamentRounds<T>(participants: T[]): Match<T>[][] {
  participants = shuffle([...participants]);
  const rounds = [];

  for (let round = 0; round < participants.length - 1; round++) {
    rounds.push(createRound(participants));
    participants = rotate(participants);
  }

  return rounds;
}

// a bit different implementation of https://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
// return an array pairing all participants from the start of first half with the end of the
// second half (participants[n] with participants[last - n]) the result is the same
function createRound<T>(participants: T[]): Match<T>[] {
  const round: Match<T>[] = [];

  for (let i = 0; i < participants.length / 2; i++) {
    round.push([participants[i], participants[participants.length - 1 - i]]);
  }

  return round;
}

// a bit different implementation of https://en.wikipedia.org/wiki/Round-robin_tournament#Scheduling_algorithm
// return a new array moving every participants in circle to the next index
// (loop back the last one), the only requirement is for array[0] to remain fixed
// exp: ["a", "b", "c", "d"] => ["a", "d", "b", "c"]
function rotate<T>(participants: T[]): T[] {
  const rotated = [participants[0]];

  for (let i = 1; i < participants.length; i++) {
    // idx 0 is fixed only the rest can rotate
    rotated[(i + 1) % participants.length || 1] = participants[i];
  }

  return rotated;
}
