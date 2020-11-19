import React from 'react';
import * as R from 'rambda';
import * as L from '../lib';
import * as Cell from './Cell';

// Logic
export const getStatusAt = R.curry((i, board) => {
  return R.view(R.lensPath(`${i}.status`), board);
});

export const setStatusAt = R.curry((i, status, board) =>
  R.set(R.lensPath(`${i}.status`), status, board)
);

export const setStatusBy = R.curry((predFn, status, board) => {
  return R.map((cell) => (predFn(cell) ? { ...cell, status } : cell), board);
});

// getStatusBy(isOpen, board) -> ["Open", "Open"]
export const getStatusBy = R.curry((predFn, board) => {
  return R.chain((cell) => (predFn(cell) ? [cell.status] : []), board);
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

const charCodeA = 'A'.charCodeAt(0);

export const makeRandom = (m, n) => {
  if ((m * n) / 2 > 26) throw new Error('To big');
  if ((m * n) % 2) throw new Error('Must be even');

  return R.pipe(
    () => R.range(0, (m * n) / 2),
    R.map((i) => String.fromCharCode(i + charCodeA)),
    R.chain((x) => [x, x]),
    L.shuffle,
    R.map((symbol) => ({ symbol, status: Cell.Status.Closed }))
  );
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
