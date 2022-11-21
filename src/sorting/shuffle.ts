import { swap } from "../util/swap";

/** reference https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = 1; i < arr.length; i++) {
    swap(arr, i, Math.floor((i + 1) * Math.random()));
  }

  return arr;
}
