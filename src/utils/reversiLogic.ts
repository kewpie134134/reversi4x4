export const BOARD_SIZE = 4;

export type Cell = "black" | "white" | null;
export type BoardType = Cell[][];

export function getInitialBoard(): BoardType {
  const board: BoardType = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  board[1][1] = "white";
  board[2][2] = "white";
  board[1][2] = "black";
  board[2][1] = "black";
  return board;
}

export const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export function getFlippable(
  board: BoardType,
  row: number,
  col: number,
  player: "black" | "white"
): [number, number][] {
  if (board[row][col] !== null) return [];
  const opponent = player === "black" ? "white" : "black";
  let toFlip: [number, number][] = [];
  for (const [dx, dy] of directions) {
    let r = row + dx;
    let c = col + dy;
    const temp: [number, number][] = [];
    while (
      r >= 0 &&
      r < BOARD_SIZE &&
      c >= 0 &&
      c < BOARD_SIZE &&
      board[r][c] === opponent
    ) {
      temp.push([r, c]);
      r += dx;
      c += dy;
    }
    if (
      temp.length > 0 &&
      r >= 0 &&
      r < BOARD_SIZE &&
      c >= 0 &&
      c < BOARD_SIZE &&
      board[r][c] === player
    ) {
      toFlip = toFlip.concat(temp);
    }
  }
  return toFlip;
}

export function countStones(board: BoardType) {
  let black = 0,
    white = 0;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === "black") black++;
      if (board[r][c] === "white") white++;
    }
  }
  return { black, white };
}

export function getValidMoves(
  board: BoardType,
  player: "black" | "white"
): [number, number][] {
  const moves: [number, number][] = [];
  const corners = [
    [0, 0],
    [0, board.length - 1],
    [board.length - 1, 0],
    [board.length - 1, board.length - 1],
  ];
  // 盤面に石が5個以下（最初の2ターン）は角禁止
  const isFirstTwoTurns = board.flat().filter((c) => c !== null).length <= 5;

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      if (isFirstTwoTurns && corners.some(([cr, cc]) => cr === r && cc === c))
        continue; // 初期は角禁止
      if (getFlippable(board, r, c, player).length > 0) {
        moves.push([r, c]);
      }
    }
  }
  return moves;
}

export function isGameOver(board: BoardType): boolean {
  return (
    getValidMoves(board, "black").length === 0 &&
    getValidMoves(board, "white").length === 0
  );
}
