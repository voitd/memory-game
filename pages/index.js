import React from "react";
import * as Cell from "../components/Cell";
// This app write on ELM like structures: helpers, logic, view, styles in one file

export default function Loyaut() {
  const cellOpen = { symbol: "A", status: Cell.Status.Open };
  const cellDone = { symbol: "B", status: Cell.Status.Done };
  const cellClosed = { symbol: "C", status: Cell.Status.Closed };
  const cellFailed = { symbol: "D", status: Cell.Status.Failed };

  return (
    <div>
      <Cell.View cell={cellOpen} />
      <Cell.View cell={cellClosed} />
      <Cell.View cell={cellDone} />
      <Cell.View cell={cellFailed} />
    </div>
  );
}
