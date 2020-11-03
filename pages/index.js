// This app write on ELM like structures: helpers, logic, view, styles in one file
import React, { useState } from "react";
import * as Cell from "../components/Cell";
import * as Board from "../components/Board";

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

const openCell = (i) => (state) => ({
  ...state,
  board: Board.setStatusAt(i, Cell.Status.Open, state.board),
});

const GameView = () => {
  const [state, setState] = useState({
    board: initialBoard,
    status: Status.Stoped,
  });

  const { board, status } = state;

  const handleStartingClick = () => {
    if (status != Status.Running) {
      setState(startGame);
    }
  };

  const handleRunnigClick = (i) => {
    if (status == Status.Running) {
      setState(openCell(i));
    }
  };

  return (
    <div onClick={handleStartingClick}>
      <ScreenBoxView
        status={status}
        board={board}
        onClickAt={handleRunnigClick}
      />
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
