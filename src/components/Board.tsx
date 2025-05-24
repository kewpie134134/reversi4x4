import React from "react";

type Cell = "black" | "white" | null;
type Props = {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
  validMoves: [number, number][];
};

const Board: React.FC<Props> = ({ board, onCellClick, validMoves }) => (
  <div className="board">
    {board.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        const isValid = validMoves.some(
          ([vr, vc]) => vr === rIdx && vc === cIdx
        );
        return (
          <div
            key={`${rIdx}-${cIdx}`}
            className={`cell${isValid ? " valid" : ""}`}
            onClick={() => onCellClick(rIdx, cIdx)}
          >
            {cell && (
              <div className={`stone ${cell === "white" ? "white" : ""}`}></div>
            )}
          </div>
        );
      })
    )}
  </div>
);

export default Board;
