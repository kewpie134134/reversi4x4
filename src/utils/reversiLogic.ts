const BOARD_SIZE = 4;
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

type Cell = {
  row: number;
  col: number;
};

type Board = number[][];

export const initializeBoard = (): Board => {
  const board: Board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(EMPTY)
  );
  board[1][1] = WHITE;
  board[1][2] = BLACK;
  board[2][1] = BLACK;
  board[2][2] = WHITE;
  return board;
};

export const isValidMove = (
  board: Board,
  cell: Cell,
  player: number
): boolean => {
  if (board[cell.row][cell.col] !== EMPTY) return false;

  const opponent = player === BLACK ? WHITE : BLACK;
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 },
  ];

  for (const { row, col } of directions) {
    let r = cell.row + row;
    let c = cell.col + col;
    let foundOpponent = false;

    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      if (board[r][c] === opponent) {
        foundOpponent = true;
      } else if (board[r][c] === player) {
        if (foundOpponent) return true;
        break;
      } else {
        break;
      }
      r += row;
      c += col;
    }
  }
  return false;
};

export const makeMove = (board: Board, cell: Cell, player: number): Board => {
  const newBoard = board.map((row) => [...row]);
  newBoard[cell.row][cell.col] = player;

  const opponent = player === BLACK ? WHITE : BLACK;
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 },
  ];

  for (const { row, col } of directions) {
    let r = cell.row + row;
    let c = cell.col + col;
    const cellsToFlip: Cell[] = [];

    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      if (newBoard[r][c] === opponent) {
        cellsToFlip.push({ row: r, col: c });
      } else if (newBoard[r][c] === player) {
        for (const { row: flipRow, col: flipCol } of cellsToFlip) {
          newBoard[flipRow][flipCol] = player;
        }
        break;
      } else {
        break;
      }
      r += row;
      c += col;
    }
  }
  return newBoard;
};

export const getValidMoves = (board: Board, player: number): Cell[] => {
  const validMoves: Cell[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, { row, col }, player)) {
        validMoves.push({ row, col });
      }
    }
  }
  return validMoves;
};

export const countScores = (board: Board): { black: number; white: number } => {
  let black = 0;
  let white = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell === BLACK) black++;
      else if (cell === WHITE) white++;
    }
  }

  return { black, white };
};
