import React from "react";

interface ScoreBoardProps {
  score: {
    black: number;
    white: number;
  };
  currentPlayer: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, currentPlayer }) => {
  return (
    <div className="scoreboard">
      <h2>石の数</h2>
      <p>黒: {score.black}</p>
      <p>白: {score.white}</p>
      <h3>現在の手番: {currentPlayer}</h3>
    </div>
  );
};

export default ScoreBoard;
