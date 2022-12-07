interface Item {
  value: number;
  weight: number;
}

// https://en.wikipedia.org/wiki/Knapsack_problem
// Greedy approximation algorithm
// this version sorts the items in decreasing order of value per unit of weight,
// v / w. It then proceeds to insert them into the sack, starting with
// as many copies as possible of the first kind of item until there is
// no longer space in the sack for more
export function knapsack(items: Item[], weight: number): Item[] {
  items.sort((a: Item, b: Item) => b.value / b.weight - a.value / a.weight);
  const selected: Item[] = [];

  for (let i: number = 0; i < items.length && items[i].weight <= weight; i++) {
    weight -= items[i].weight;
    selected.push(items[i]);
  }

  return selected;
}
