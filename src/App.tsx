import { useEffect, useState } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";
import {
  getInitialBoard,
  getFlippable,
  countStones,
  getValidMoves,
  isGameOver,
} from "./utils/reversiLogic";
import type { BoardType } from "./utils/reversiLogic";

type Mode = "human" | "cpu";
type CpuLevel = "easy" | "hard";

function App() {
  const [board, setBoard] = useState<BoardType>(getInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"black" | "white">(
    "black"
  );
  const [score, setScore] = useState(countStones(getInitialBoard()));
  const [gameOver, setGameOver] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mode, setMode] = useState<Mode>("cpu");
  const [cpuColor, setCpuColor] = useState<"black" | "white">("white");
  const [cpuLevel, setCpuLevel] = useState<CpuLevel>("hard");

  const validMoves = getValidMoves(board, currentPlayer);
  const opponent = currentPlayer === "black" ? "white" : "black";
  const opponentValidMoves = getValidMoves(board, opponent);

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

  // パス・終了判定
  useEffect(() => {
    if (gameOver) return;
    if (validMoves.length === 0) {
      if (opponentValidMoves.length === 0) {
        setGameOver(true);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 2000);
      } else {
        setCurrentPlayer(opponent);
      }
    }
    // eslint-disable-next-line
  }, [board, currentPlayer, gameOver]);

  // 現在の手番がCPUかどうか
  const isCpuTurn = mode === "cpu" && currentPlayer === cpuColor;

  // コンピュータの自動手番
  useEffect(() => {
    if (gameOver) return;
    if (isCpuTurn) {
      const moves = getValidMoves(board, cpuColor);
      if (moves.length > 0) {
        let row: number, col: number;
        if (cpuLevel === "easy") {
          // easy: ひっくり返せる数が最大の手を選ぶ
          let max = -1;
          let bestMoves: [number, number][] = [];
          for (const [r, c] of moves) {
            const flipCount = getFlippable(board, r, c, cpuColor).length;
            if (flipCount > max) {
              max = flipCount;
              bestMoves = [[r, c]];
            } else if (flipCount === max) {
              bestMoves.push([r, c]);
            }
          }
          [row, col] = bestMoves[Math.floor(Math.random() * bestMoves.length)];
        } else {
          // hard: 角が取れるなら角、なければひっくり返せる数が最大の手
          const corners: [number, number][] = [
            [0, 0],
            [0, board.length - 1],
            [board.length - 1, 0],
            [board.length - 1, board.length - 1],
          ];
          const cornerMoves = moves.filter(([r, c]) =>
            corners.some(([cr, cc]) => cr === r && cc === c)
          );
          if (cornerMoves.length > 0) {
            [row, col] = cornerMoves[Math.floor(Math.random() * cornerMoves.length)];
          } else {
            let max = -1;
            let bestMoves: [number, number][] = [];
            for (const [r, c] of moves) {
              const flipCount = getFlippable(board, r, c, cpuColor).length;
              if (flipCount > max) {
                max = flipCount;
                bestMoves = [[r, c]];
              } else if (flipCount === max) {
                bestMoves.push([r, c]);
              }
            }
            [row, col] = bestMoves[Math.floor(Math.random() * bestMoves.length)];
          }
        }
        setTimeout(() => doMove(row, col, cpuColor), 500);
      } else {
        // パス
        setCurrentPlayer(cpuColor === "black" ? "white" : "black");
      }
    }
    // eslint-disable-next-line
  }, [currentPlayer, board, gameOver, mode, cpuColor, cpuLevel]);

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
    if (isCpuTurn) return; // CPUの手番はクリック不可
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
  };

  useEffect(() => {
    // モードやCPU色が変わったらリセット
    setBoard(getInitialBoard());
    setCurrentPlayer(cpuColor === "black" ? "white" : "black");
    setScore(countStones(getInitialBoard()));
    setGameOver(false);
    setAnimate(false);
  }, [mode, cpuColor]);

  let resultMsg = "";
  if (gameOver) {
    if (score.black > score.white) resultMsg = "黒の勝ち！";
    else if (score.white > score.black) resultMsg = "白の勝ち！";
    else resultMsg = "引き分け！";
  }

  const playerName = currentPlayer === "black" ? "黒" : "白";

  return (
    <div className="app">
      <h1>4x4 オセロゲーム</h1>
      <div style={{ marginBottom: 10 }}>
        <label>
          対戦モード：
          <select value={mode} onChange={handleModeChange}>
            <option value="cpu">人 vs コンピュータ</option>
            <option value="human">人 vs 人</option>
          </select>
        </label>
        {mode === "cpu" && (
          <>
            <label style={{ marginLeft: 10 }}>
              先攻・後攻：
              <select
                value={cpuColor}
                onChange={(e) =>
                  setCpuColor(e.target.value as "black" | "white")
                }
              >
                <option value="white">あなたが先攻（黒）</option>
                <option value="black">あなたが後攻（白）</option>
              </select>
            </label>
            <label style={{ marginLeft: 10 }}>
              コンピュータの強さ：
              <select
                value={cpuLevel}
                onChange={(e) => setCpuLevel(e.target.value as CpuLevel)}
              >
                <option value="easy">ふつう</option>
                <option value="hard">つよい</option>
              </select>
            </label>
          </>
        )}
      </div>
      <button onClick={handleReset}>最初から始める</button>
      <ScoreBoard score={score} currentPlayer={playerName} />
      <div className={`board-wrapper${animate ? " gameover-animate" : ""}`}>
        <Board
          board={board}
          onCellClick={handleCellClick}
          validMoves={validMoves}
        />
      </div>
      {gameOver && <div className="result">{resultMsg}</div>}
      <div style={{ marginTop: 10 }}>
        {mode === "cpu"
          ? cpuColor === "white"
            ? "あなた：黒（先攻）　コンピュータ：白（後攻）"
            : "あなた：白（後攻）　コンピュータ：黒（先攻）"
          : "黒：先手　白：後手"}
      </div>
    </div>
  );
}

export default App;
