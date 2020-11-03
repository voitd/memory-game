import React from "react";
import * as R from "rambda";
import * as Cell from "./Cell";

// Logic
export const setStatusAt = R.curry((i, status, board) =>
  R.set(R.lensPath(`${i}.status`), status, board)
);

// View
export const BoardView = ({ board, onClickAt }) => {
  return (
    <div className="board">
      {board.map((cell, i) => {
        return <Cell.View key={i} cell={cell} onClick={() => onClickAt(i)} />;
      })}
    </div>
  );
};

export const ScreenView = ({ className, children }) => {
  return <div className={`screen ${className}`}>{children}</div>;
};
