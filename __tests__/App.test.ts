import {
  getFlippable,
  getValidMoves,
  countStones,
  isGameOver,
  getInitialBoard,
  BOARD_SIZE,
} from "../src/utils/reversiLogic";

type Cell = "black" | "white" | null;
type BoardType = Cell[][];

function createEmptyBoard(): BoardType {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
}

describe("Reversi Logic", () => {
  it("getInitialBoard sets up the initial board", () => {
    const board = getInitialBoard();
    expect(board[1][1]).toBe("white");
    expect(board[2][2]).toBe("white");
    expect(board[1][2]).toBe("black");
    expect(board[2][1]).toBe("black");
    expect(board.flat().filter((c) => c === null).length).toBe(12);
  });

  it("countStones counts correctly", () => {
    const board = createEmptyBoard();
    board[0][0] = "black";
    board[0][1] = "white";
    expect(countStones(board)).toEqual({ black: 1, white: 1 });
  });

  it("getFlippable returns empty if cell is not empty", () => {
    const board = createEmptyBoard();
    board[0][0] = "black";
    expect(getFlippable(board, 0, 0, "white")).toEqual([]);
  });

  it("getFlippable returns correct horizontal flip", () => {
    const board = createEmptyBoard();
    board[0][1] = "white";
    board[0][2] = "black";
    expect(getFlippable(board, 0, 0, "black")).toEqual([[0, 1]]);
  });

  it("getFlippable returns correct vertical flip", () => {
    const board = createEmptyBoard();
    board[1][0] = "white";
    board[2][0] = "black";
    expect(getFlippable(board, 0, 0, "black")).toEqual([[1, 0]]);
  });

  it("getFlippable returns correct diagonal flip", () => {
    const board = createEmptyBoard();
    board[1][1] = "white";
    board[2][2] = "black";
    expect(getFlippable(board, 0, 0, "black")).toEqual([[1, 1]]);
  });

  it("getFlippable returns empty if no flippable stones", () => {
    const board = createEmptyBoard();
    expect(getFlippable(board, 0, 0, "black")).toEqual([]);
  });

  it("getValidMoves returns valid moves for initial board", () => {
    const board = getInitialBoard();
    const moves = getValidMoves(board, "black");
    expect(moves.length).toBeGreaterThan(0);
    moves.forEach(([r, c]) => {
      expect(board[r][c]).toBe(null);
    });
  });

  it("getValidMoves returns empty if no valid moves", () => {
    const board = createEmptyBoard();
    expect(getValidMoves(board, "black")).toEqual([]);
  });

  it("isGameOver returns false if there are valid moves", () => {
    const board = getInitialBoard();
    expect(isGameOver(board)).toBe(false);
  });

  it("isGameOver returns true if neither player has valid moves", () => {
    const board = createEmptyBoard();
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        board[r][c] = "black";
      }
    }
    expect(isGameOver(board)).toBe(true);
  });
});
