import React from "react";
import * as R from "rambda";
import * as L from "../lib";
import * as Cell from "./Cell";

// Logic
export const setStatusAt = R.curry((i, status, board) =>
  R.set(R.lensPath(`${i}.status`), status, board)
);

export const getStatusAt = R.curry((i, board) => {
  return R.view(R.lensPath(`${i}.status`), status, board);
});

export const setStatusBy = R.curry((predFn, status, board) => {
  return R.map((cell) => {
    return predFn(cell) ? { ...cell, status } : cell;
  }, board);
});

// getStatusBy(isOpen, board) -> ["Open", "Open"]
export const getStatusBy = R.curry((predFn, board) => {
  return R.chain((cell) => {
    return predFn(cell) ? [...cell, status] : [];
  }, board);
});

export const getSymbolsBy = R.curry((predFn, board) => {
  return R.chain((cell) => (predFn(cell) ? [cell.symbol] : []), board);
});

export const canOpenAt = R.curry((i, board) => {
  return (
    i < board.length &&
    Cell.isClosed(board[i]) &&
    getStatusBy(Cell.isBlocked, board).length < 2
  );
});

export const areOpensEqual = (board) => {
  const openSymbol = getSymbolsBy(Cell.isOpen, board);
  return openSymbol.length >= 2 && L.allEquals(openSymbol);
};

export const areOpensDifferent = (board) => {
  const openSymbol = getSymbolsBy(Cell.isOpen, board);
  return openSymbol.length >= 2 && !L.allEquals(openSymbol);
};

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
