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
      <h2>Score</h2>
      <p>Black: {score.black}</p>
      <p>White: {score.white}</p>
      <h3>Current Player: {currentPlayer}</h3>
    </div>
  );
};

export default ScoreBoard;
