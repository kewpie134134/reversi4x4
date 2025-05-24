import React from "react";

type Cell = "black" | "white" | null;
type Props = {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
};

const Board: React.FC<Props> = ({ board, onCellClick }) => (
  <div className="board">
    {board.map((row, rIdx) =>
      row.map((cell, cIdx) => (
        <div
          key={`${rIdx}-${cIdx}`}
          className="cell"
          onClick={() => onCellClick(rIdx, cIdx)}
        >
          {cell && (
            <div className={`stone ${cell === "white" ? "white" : ""}`}></div>
          )}
        </div>
      ))
    )}
  </div>
);

export default Board;
