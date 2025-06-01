import React from "react";

type Props = {
  score: { black: number; white: number };
  currentPlayer: string; // 日本語で渡される
  onReset: () => void;
};

const ScoreBoard: React.FC<Props> = ({ currentPlayer, onReset }) => (
  <div
    className="score-board"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <button onClick={onReset} style={{ marginRight: "auto" }}>
      最初から始める
    </button>
    <h3 style={{ margin: 0 }}>現在の手番: {currentPlayer}</h3>
  </div>
);

export default ScoreBoard;
