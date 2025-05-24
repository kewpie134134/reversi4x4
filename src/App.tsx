import { useState } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";

type Cell = "black" | "white" | null;
type BoardType = Cell[][];

const BOARD_SIZE = 4;

// 初期配置
function getInitialBoard(): BoardType {
  const board: BoardType = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  board[1][1] = "white";
  board[2][2] = "white";
  board[1][2] = "black";
  board[2][1] = "black";
  return board;
}

// 8方向
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

// 挟める石を返す
function getFlippable(
  board: BoardType,
  row: number,
  col: number,
  player: "black" | "white"
) {
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

function countStones(board: BoardType) {
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

function App() {
  const [board, setBoard] = useState<BoardType>(getInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"black" | "white">(
    "black"
  );
  const [score, setScore] = useState(countStones(getInitialBoard()));

  const handleCellClick = (row: number, col: number) => {
    const toFlip = getFlippable(board, row, col, currentPlayer);
    if (toFlip.length === 0) return; // 挟めない場合は無効

    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = currentPlayer;
    toFlip.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer;
    });
    setBoard(newBoard);
    setScore(countStones(newBoard));
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
  };

  return (
    <div className="app">
      <h1>4x4 Reversi Game</h1>
      <ScoreBoard score={score} currentPlayer={currentPlayer} />
      <Board board={board} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;
