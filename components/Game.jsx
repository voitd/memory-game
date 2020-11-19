import React, { useEffect, useState } from 'react';
import * as Cell from './Cell';
import * as Board from './Board';
import * as R from 'rambda';

//Logic
const Status = {
  Stopped: 'Stopped',
  Running: 'Running',
  Won: 'Won',
  Lost: 'Lost',
};

const startGame = (state) => ({
  board: Board.makeRandom(3, 4),
  secondsLeft: 60,
  status: Status.Running,
});

//FIXME: rewirte to normal curry function without Rambda
const canOpenCell = R.curry((i, state) => {
  return Board.canOpenAt(i, state.board);
});

const openCell = (i) => (state) => ({
  ...state,
  board: Board.setStatusAt(i, Cell.Status.Open, state.board),
});

const succedStep = (state) => ({
  ...state,
  board: Board.setStatusBy(Cell.isOpen, Cell.Status.Done, state.board),
});

const failStep1 = (state) => ({
  ...state,
  board: Board.setStatusBy(Cell.isOpen, Cell.Status.Failed, state.board),
});

const failStep2 = (state) => ({
  ...state,
  board: Board.setStatusBy(Cell.isFailed, Cell.Status.Closed, state.board),
});

const hasWinningCond = (state) =>
  R.filter(Cell.isDone, state.board).length === state.board.length;

const hasLosingCond = (state) => !state.secondsLeft;

const setStatus = R.curry((status, state) => ({ ...state, status }));

const nextSecond = (state) => ({
  ...state,
  secondsLeft: Math.max(state.secondsLeft - 1, 0),
});

// View
export const View = () => {
  const [state, setState] = useState({
    ...startGame(),
    status: Status.Stopped,
  });

  const { board, status, secondsLeft } = state;

  const handleStartingClick = () => {
    if (status !== Status.Running) {
      setState(startGame);
    }
  };

  const handleRunnigClick = (i) => {
    if (status === Status.Running && canOpenCell(i, state)) {
      setState(openCell(i));
    }
  };

  //Winning/Losing conditions
  useEffect(
    () => {
      if (Status.Running === status) {
        if (hasWinningCond(state)) {
          return setState(setStatus(Status.Won));
        } else if (hasLosingCond(state)) {
          return setState(setStatus(Status.Lost));
        }
      }
    },
    [state]
  );

  useEffect(
    () => {
      if (Board.areOpensEqual(board)) {
        setState(succedStep);
      } else if (Board.areOpensDifferent(board)) {
        setState(failStep1);
        setTimeout((_) => {
          setState(failStep2);
        }, 500);
      }
    },
    [board]
  );

  useEffect(
    () => {
      let timer = null;
      if (status === Status.Running && !timer) {
        timer = setInterval((_) => {
          setState(nextSecond);
        }, 1000);
      }
      return () => {
        clearInterval(timer);
      };
    },
    [status]
  );

  return (
    <div onClick={handleStartingClick}>
      <ScreenLineView status={status} secondsLeft={secondsLeft} />
      <ScreenBoxView
        status={status}
        board={board}
        onClickAt={handleRunnigClick}
      />
    </div>
  );
};

const ScreenLineView = ({ status, secondsLeft }) => {
  return (
    <div className="status-line">
      <div>{status === Status.Running ? '=)' : 'Lets Go!'}</div>
      <div className="timer">
        {status === Status.Running && `Seconds left: ${secondsLeft}`}
      </div>
    </div>
  );
};

const ScreenBoxView = ({ status, board, onClickAt }) => {
  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} onClickAt={onClickAt} />;

    case Status.Stopped:
      return (
        <Board.ScreenView className="gray">
          <div>
            <h1>Memory Game</h1>
            <p className="small" style={{ textAlign: 'center' }}>
              Click anywhere to start!
            </p>
          </div>
        </Board.ScreenView>
      );

    case Status.Won:
      return (
        <Board.ScreenView className="green">
          <div>
            <h1>Victory!</h1>
            <p className="small" style={{ textAlign: 'center' }}>
              Click anywhere to try again!
            </p>
          </div>
        </Board.ScreenView>
      );

    case Status.Lost:
      return (
        <Board.ScreenView className="gray">
          <div>
            <h1>Defeat!</h1>
            <p className="small" style={{ textAlign: 'center' }}>
              Click anywhere to try again!
            </p>
          </div>
        </Board.ScreenView>
      );
  }
};
