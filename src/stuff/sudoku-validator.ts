export function validSolution(board: number[][]) {
  return validBlocks(board) && validRows(board) && validCols(board);
}

function add(sz: number, v: number, set: Set<number>) {
  if (v > 0 && v <= sz) {
    set.add(v);
  }

  return set;
}

function validCols(board: number[][]) {
  return board.every((_, col) => validCol(board, col));
}

function validCol(board: number[][], col: number) {
  return (
    board.reduce((s, row) => add(board.length, row[col], s), new Set<number>())
      .size === board.length
  );
}

function validRows(board: number[][]) {
  return board.every((_, row) => validCol(board, row));
}

function validRow(board: number[][], row: number) {
  return (
    board[row].reduce((s, v) => add(board.length, v, s), new Set<number>())
      .size === board.length
  );
}

function validBlocks(board: number[][]) {
  const sz = Math.round(board.length / 3);

  for (let i = 0; i < board.length; i += sz) {
    for (let j = 0; j < board.length; j += sz) {
      if (!validBlock(board, i, i + sz, j, j + sz)) {
        return false;
      }
    }
  }

  return true;
}

function validBlock(
  board: number[][],
  row: number,
  toRow: number,
  col: number,
  toCol: number
) {
  const set = new Set<number>();

  for (let i = row; i < toRow; i++) {
    for (let j = col; j < toCol; j++) {
      add(board.length, board[i][j], set);
    }
  }

  return set.size === board.length;
}
