import React from "react";

interface CellProps {
  value: "black" | "white" | null;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  const getCellClass = () => {
    if (value === "black") return "cell black";
    if (value === "white") return "cell white";
    return "cell empty";
  };

  return (
    <div className={getCellClass()} onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
