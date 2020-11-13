import React, { useEffect, useState } from "react";
import * as Cell from "../components/Cell";
import * as Board from "../components/Board";
import * as R from "rambda";

const Layout = () => {
  return (
    <>
      <GameView />
    </>
  );
};

//Logic

const Status = {
  Stoped: "Stoped",
  Running: "Running",
  Won: "Won",
  Lost: "Lost",
};

const initialBoard = [
  { symbol: "A", status: Cell.Status.Closed },
  { symbol: "A", status: Cell.Status.Closed },
  { symbol: "B", status: Cell.Status.Closed },
  { symbol: "B", status: Cell.Status.Closed },
  { symbol: "C", status: Cell.Status.Closed },
  { symbol: "C", status: Cell.Status.Closed },
];

const startGame = ({ state }) => ({
  board: initialBoard,
  status: Status.Running,
});

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

// View
const GameView = () => {
  const [state, setState] = useState({
    board: initialBoard,
    status: Status.Running,
    secondsLeft: 60,
  });

  const { board, status, secondsLeft } = state;

  const handleStartingClick = () => {
    if (status != Status.Running) {
      setState(startGame);
    }
  };

  const handleRunnigClick = (i) => {
    if (status == Status.Running && canOpenCell(i, state)) {
      setState(openCell(i));
    }
  };

  useEffect(
    (_) => {
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
      <div>{status == Status.Running ? "=)" : "Lets Go!"}</div>
      <div className="timer">
        {status == Status.Running && `Seconds left: ${secondsLeft}`}
      </div>
    </div>
  );
};

const ScreenBoxView = ({ status, board, onClickAt }) => {
  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} onClickAt={onClickAt} />;

    case Status.Stoped:
      return (
        <Board.ScreenView className="gray">
          <div>
            <h1>Memory Game</h1>
            <p className="small" style={{ textAlign: "center" }}>
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
            <p className="small" style={{ textAlign: "center" }}>
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
            <p className="small" style={{ textAlign: "center" }}>
              Click anywhere to try again!
            </p>
          </div>
        </Board.ScreenView>
      );
  }
};

export default Layout;
