import React from "react";

// Logic
export const Status = {
  Open: "Open",
  Closed: "Closed",
  Done: "Done",
  Failed: "Failed",
};

export const isOpen = (cell) => cell.status == Status.Open;
export const isClosed = (cell) => cell.status == Status.Closed;
export const isDone = (cell) => cell.status == Status.Done;
export const isFailed = (cell) => cell.status == Status.Failed;
export const isBlocked = (cell) => isOpen(cell) || isFailed(cell);

//View

export const View = ({ cell, onClick }) => {
  const { symbol, status } = cell;
  return (
    <div className={`cell ${classByStatus(status)}`} onClick={onClick}>
      {status === Status.Closed ? "" : symbol}
    </div>
  );
};

export const classByStatus = (status) => status.toLowerCase();
