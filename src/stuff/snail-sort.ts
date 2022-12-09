const coord: [number, number][] = [
  [0, 1], // east
  [1, 0], // sud
  [0, -1], // west
  [-1, 0], // north
];

class Clockwise {
  dir = coord[0];

  rotate() {
    this.dir = coord[(coord.indexOf(this.dir) + 1) % coord.length];
  }
}

export function snailSort<T>(arr: T[][]): T[] {
  const rows = arr.length;
  const cols = arr[0].length;
  const visited = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );
  const rst = [];
  let move = new Clockwise();
  let trial = 0;
  let atR = 0;
  let atC = -1; // so the first toC get to 0

  while (trial < 2) {
    const toR = atR + move.dir[0];
    const toC = atC + move.dir[1];

    if (toC < 0 || toC >= cols || toR < 0 || toR >= rows || visited[toR][toC]) {
      trial++;
      move.rotate();
    } else {
      rst.push(arr[toR][toC]);
      visited[toR][toC] = true;
      atR = toR;
      atC = toC;
      trial = 0;
    }
  }

  return rst;
}
