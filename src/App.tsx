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
import Top from "./Top";

type Mode = "human" | "cpu";
type CpuLevel = "easy" | "hard";
type Card = { id: number; name: string };

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
  const [showTop, setShowTop] = useState(true);

  // カード関連（山札は共通、手札・捨て札は個別）
  const [deck, setDeck] = useState<Card[]>([]);
  const [handBlack, setHandBlack] = useState<Card[]>([]);
  const [handWhite, setHandWhite] = useState<Card[]>([]);
  const [trashBlack, setTrashBlack] = useState<Card[]>([]);
  const [trashWhite, setTrashWhite] = useState<Card[]>([]);
  const [cardPlayed, setCardPlayed] = useState(false);

  // 「ドロー中」状態を追加
  const [drawing, setDrawing] = useState(false);

  // 山札初期化＆黒白それぞれ2枚ドロー
  useEffect(() => {
    if (!showTop) {
      // 共通山札を生成・シャッフル
      const initialDeck = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `カード${i + 1}`,
      }));
      for (let i = initialDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [initialDeck[i], initialDeck[j]] = [initialDeck[j], initialDeck[i]];
      }
      setHandBlack([initialDeck[0], initialDeck[1]]);
      setHandWhite([initialDeck[2], initialDeck[3]]);
      setDeck(initialDeck.slice(4));
      setTrashBlack([]);
      setTrashWhite([]);
      setCardPlayed(false);
    }
  }, [showTop]);

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

  // 自分のターン開始時に1秒待ってから1枚ドロー（共通山札）
  useEffect(() => {
    if (showTop || gameOver) return;
    if (!cardPlayed) {
      setDrawing(true); // ドロー中フラグON
      const timer = setTimeout(() => {
        if (currentPlayer === "black" && deck.length > 0) {
          setHandBlack((prev) => [...prev, deck[0]]);
          setDeck((prev) => prev.slice(1));
        }
        if (currentPlayer === "white" && deck.length > 0) {
          setHandWhite((prev) => [...prev, deck[0]]);
          setDeck((prev) => prev.slice(1));
        }
        setDrawing(false); // ドロー完了
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [currentPlayer]);

  // カードを出す
  const handlePlayCard = (cardId: number) => {
    if (cardPlayed || gameOver || drawing) return; // ドロー中は出せない
    if (currentPlayer === "black") {
      const card = handBlack.find((c) => c.id === cardId);
      setHandBlack((prev) => prev.filter((c) => c.id !== cardId));
      if (card) setTrashBlack((prev) => [...prev, card]);
    } else {
      const card = handWhite.find((c) => c.id === cardId);
      setHandWhite((prev) => prev.filter((c) => c.id !== cardId));
      if (card) setTrashWhite((prev) => [...prev, card]);
    }
    setCardPlayed(true);
  };

  // 共通の手番処理
  const doMove = (row: number, col: number, player: "black" | "white") => {
    if (!cardPlayed) return; // カードを出していないと置けない
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
    setCardPlayed(false); // 次のターンのためリセット
  };

  // クリック時
  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;
    if (isCpuTurn) return; // CPUの手番はクリック不可
    doMove(row, col, currentPlayer);
  };

  // CPUの自動手番（カードを出してからコマを置く）
  useEffect(() => {
    if (!isCpuTurn || gameOver || showTop) return;
    if (handWhite.length === 0 && cpuColor === "white") return;
    if (handBlack.length === 0 && cpuColor === "black") return;

    // 1. カードを1枚出す
    setTimeout(() => {
      if (cpuColor === "white") {
        setHandWhite((prev) => prev.filter((_, i) => i !== 0));
      } else {
        setHandBlack((prev) => prev.filter((_, i) => i !== 0));
      }
      setCardPlayed(true);

      // 2. 少し待ってからコマを置く
      setTimeout(() => {
        const moves = getValidMoves(board, cpuColor);
        if (moves.length === 0) {
          setCurrentPlayer(cpuColor === "black" ? "white" : "black");
          setCardPlayed(false);
          return;
        }

        let row: number, col: number;
        if (cpuLevel === "easy") {
          // ひっくり返せる数が最大の手
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
          // hard: 角優先
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
            [row, col] =
              cornerMoves[Math.floor(Math.random() * cornerMoves.length)];
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
            [row, col] =
              bestMoves[Math.floor(Math.random() * bestMoves.length)];
          }
        }
        doMove(row, col, cpuColor);
      }, 600); // カードを出してから少し待つ
    }, 600); // カードを出すまで少し待つ
    // eslint-disable-next-line
  }, [isCpuTurn, handBlack, handWhite, board, gameOver, showTop, cpuLevel]);

  const handleReset = () => {
    setShowTop(true); // トップ画面に戻る
    setBoard(getInitialBoard());
    setCurrentPlayer("black");
    setScore(countStones(getInitialBoard()));
    setGameOver(false);
    setAnimate(false);
    setDeck([]);
    setHandBlack([]);
    setHandWhite([]);
    setCardPlayed(false);
  };

  useEffect(() => {
    // モードやCPU色が変わったらリセット
    setBoard(getInitialBoard());
    setCurrentPlayer(cpuColor === "black" ? "white" : "black");
    setScore(countStones(getInitialBoard()));
    setGameOver(false);
    setAnimate(false);
    setDeck([]);
    setHandBlack([]);
    setHandWhite([]);
    setCardPlayed(false);
  }, [mode, cpuColor]);

  // トップページ
  if (showTop) {
    return (
      <Top
        mode={mode}
        setMode={setMode}
        cpuLevel={cpuLevel}
        setCpuLevel={setCpuLevel}
        cpuColor={cpuColor}
        setCpuColor={setCpuColor}
        onStart={() => setShowTop(false)}
      />
    );
  }

  // ゲーム画面
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
      <div style={{ marginBottom: 8, textAlign: "right", color: "#00adb5" }}>
        山札: {deck.length}枚
      </div>
      <div style={{ margin: "16px 0", display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 12 }}>
          {currentPlayer === "black" ? "黒" : "白"}の手札:
        </span>
        {(currentPlayer === "black" ? handBlack : handWhite).map((card) => (
          <button
            key={card.id}
            style={{
              background: "#fff",
              color: "#222",
              borderRadius: 8,
              padding: "6px 12px",
              marginRight: 8,
              boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
              fontWeight: "bold",
              opacity: !cardPlayed && !drawing ? 1 : 0.7,
              cursor: cardPlayed || drawing ? "not-allowed" : "pointer",
            }}
            disabled={cardPlayed || drawing}
            onClick={() => handlePlayCard(card.id)}
          >
            {card.name}
          </button>
        ))}
        {drawing && (
          <span style={{ color: "#00adb5", marginLeft: 8 }}>
            カードをドロー中...
          </span>
        )}
        {(currentPlayer === "black" ? handBlack : handWhite).length === 0 &&
          !drawing && <span style={{ color: "#bbb" }}>なし</span>}
      </div>
      <div style={{ margin: "8px 0", display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 12 }}>黒の捨て札:</span>
        {trashBlack.map((card) => (
          <span
            key={card.id}
            style={{
              background: "#eee",
              color: "#888",
              borderRadius: 8,
              padding: "4px 10px",
              marginRight: 6,
              fontSize: "0.95em",
              border: "1px solid #ccc",
            }}
          >
            {card.name}
          </span>
        ))}
        {trashBlack.length === 0 && <span style={{ color: "#bbb" }}>なし</span>}
      </div>
      <div style={{ margin: "8px 0", display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 12 }}>白の捨て札:</span>
        {trashWhite.map((card) => (
          <span
            key={card.id}
            style={{
              background: "#eee",
              color: "#888",
              borderRadius: 8,
              padding: "4px 10px",
              marginRight: 6,
              fontSize: "0.95em",
              border: "1px solid #ccc",
            }}
          >
            {card.name}
          </span>
        ))}
        {trashWhite.length === 0 && <span style={{ color: "#bbb" }}>なし</span>}
      </div>
      <ScoreBoard
        score={score}
        currentPlayer={playerName}
        onReset={handleReset}
      />
      <div className={`board-wrapper${animate ? " gameover-animate" : ""}`}>
        <Board
          board={board}
          onCellClick={handleCellClick}
          validMoves={validMoves}
        />
      </div>
      {gameOver && <div className="result">{resultMsg}</div>}
      <p style={{ color: "#ff5555", textAlign: "center", marginBottom: 10 }}>
        ※お互い最初のターンは4つの角にコマを置くことはできません。
      </p>
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
