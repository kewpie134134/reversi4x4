import React from "react";

type Props = {
  score: { black: number; white: number };
  currentPlayer: string; // 日本語で渡される
};

const ScoreBoard: React.FC<Props> = ({ score, currentPlayer }) => (
  <div className="score-board">
    <h3>
      黒: {score.black} 白: {score.white}
    </h3>
    <h3>現在の手番: {currentPlayer}</h3>
  </div>
);

export default ScoreBoard;
