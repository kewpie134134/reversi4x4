import React from "react";

type Cell = "black" | "white" | null;
type Props = {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
  validMoves: [number, number][];
};

const Board: React.FC<Props> = ({ board, onCellClick, validMoves }) => {
  const corners = [
    [0, 0],
    [0, board.length - 1],
    [board.length - 1, 0],
    [board.length - 1, board.length - 1],
  ];
  const isFirstTwoTurns = board.flat().filter((c) => c !== null).length <= 5;
  return (
    <div className="board">
      {board.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          const isCorner = corners.some(([cr, cc]) => cr === rIdx && cc === cIdx);
          const isInitial =
            board.flat().filter((c) => c !== null).length === 4;
          const isValid =
            validMoves.some(([vr, vc]) => vr === rIdx && vc === cIdx) && !(isInitial && isCorner);
          const isCornerBan = isFirstTwoTurns && isCorner;
          return (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`cell${isValid ? " valid" : ""}${isCornerBan ? " corner-ban" : ""}`}
              onClick={() => {
                if (isCornerBan) return;
                onCellClick(rIdx, cIdx);
              }}
            >
              {isCornerBan ? (
                <span className="corner-x">✕</span>
              ) : cell ? (
                <div className={`stone ${cell === "white" ? "white" : ""}`}></div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
