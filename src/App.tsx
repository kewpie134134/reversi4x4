import { useEffect, useState } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";

type Cell = "black" | "white" | null;
type BoardType = Cell[][];

const BOARD_SIZE = 4;

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

function getValidMoves(board: BoardType, player: "black" | "white") {
  const moves: [number, number][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (getFlippable(board, r, c, player).length > 0) {
        moves.push([r, c]);
      }
    }
  }
  return moves;
}

function isGameOver(board: BoardType) {
  return (
    getValidMoves(board, "black").length === 0 &&
    getValidMoves(board, "white").length === 0
  );
}

type Mode = "human" | "cpu";

function App() {
  const [board, setBoard] = useState<BoardType>(getInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"black" | "white">(
    "black"
  );
  const [score, setScore] = useState(countStones(getInitialBoard()));
  const [gameOver, setGameOver] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mode, setMode] = useState<Mode>("cpu");

  const validMoves = getValidMoves(board, currentPlayer);

  // 勝敗判定とアニメーション
  useEffect(() => {
    if (isGameOver(board)) {
      setGameOver(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 2000);
    } else {
      setGameOver(false);
    }
  }, [board]);

  // コンピュータの自動手番
  useEffect(() => {
    if (gameOver) return;
    if (mode === "cpu" && currentPlayer === "white") {
      const moves = getValidMoves(board, "white");
      if (moves.length > 0) {
        // ランダムに1手選ぶ
        const [row, col] = moves[Math.floor(Math.random() * moves.length)];
        setTimeout(() => doMove(row, col, "white"), 500); // 0.5秒待つ
      } else {
        // パス
        setCurrentPlayer("black");
      }
    }
    // eslint-disable-next-line
  }, [currentPlayer, board, gameOver, mode]);

  // 共通の手番処理
  const doMove = (row: number, col: number, player: "black" | "white") => {
    const toFlip = getFlippable(board, row, col, player);
    if (toFlip.length === 0) return;

    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = player;
    toFlip.forEach(([r, c]) => {
      newBoard[r][c] = player;
    });
    setBoard(newBoard);
    setScore(countStones(newBoard));
    setCurrentPlayer(player === "black" ? "white" : "black");
  };

  // クリック時
  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;
    // 人vsCPUの場合、白は自動なのでクリック不可
    if (mode === "cpu" && currentPlayer === "white") return;
    doMove(row, col, currentPlayer);
  };

  const handleReset = () => {
    setBoard(getInitialBoard());
    setCurrentPlayer("black");
    setScore(countStones(getInitialBoard()));
    setGameOver(false);
    setAnimate(false);
  };

  // モード変更時にリセット
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as Mode);
    setBoard(getInitialBoard());
    setCurrentPlayer("black");
    setScore(countStones(getInitialBoard()));
    setGameOver(false);
    setAnimate(false);
  };

  let resultMsg = "";
  if (gameOver) {
    if (score.black > score.white) resultMsg = "黒の勝ち！";
    else if (score.white > score.black) resultMsg = "白の勝ち！";
    else resultMsg = "引き分け！";
  }

  return (
    <div className="app">
      <h1>4x4 Reversi Game</h1>
      <div style={{ marginBottom: 10 }}>
        <label>
          対戦モード：
          <select value={mode} onChange={handleModeChange}>
            <option value="cpu">人 vs コンピュータ</option>
            <option value="human">人 vs 人</option>
          </select>
        </label>
      </div>
      <button onClick={handleReset}>最初から始める</button>
      <ScoreBoard score={score} currentPlayer={currentPlayer} />
      <div className={`board-wrapper${animate ? " gameover-animate" : ""}`}>
        <Board
          board={board}
          onCellClick={handleCellClick}
          validMoves={validMoves}
        />
      </div>
      {gameOver && <div className="result">{resultMsg}</div>}
      <div style={{ marginTop: 10 }}>
        {mode === "cpu" ? "あなた：黒　コンピュータ：白" : "黒：先手　白：後手"}
      </div>
    </div>
  );
}

export default App;
