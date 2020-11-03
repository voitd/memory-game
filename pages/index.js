// This app write on ELM like structures: helpers, logic, view, styles in one file
import React, { useState } from "react";
import * as Cell from "../components/Cell";
import * as Board from "../components/Board";

export default () => {
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

const GameView = () => {
  const [state, setState] = useState({ status: Status.Stoped });

  const { status } = state;

  const cellA1 = { symbol: "A", status: Cell.Status.Open };
  const cellA2 = { symbol: "A", status: Cell.Status.Done };
  const cellB1 = { symbol: "B", status: Cell.Status.Closed };
  const cellB2 = { symbol: "B", status: Cell.Status.Closed };
  const cellC1 = { symbol: "C", status: Cell.Status.Closed };
  const cellC2 = { symbol: "C", status: Cell.Status.Failed };

  const board = [cellA1, cellA2, cellB1, cellB2, cellC1, cellC2];

  const handleStartingClick = (e) => {
    if (status != Status.Running) {
      setState(startGame);
    }
  };

  return (
    <div onClick={handleStartingClick}>
      <ScreenBoxView status={status} board={board} />
    </div>
  );
};

const ScreenBoxView = ({ status, board }) => {
  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} onClickAt={() => null} />;

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
