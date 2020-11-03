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

// switch (status) {
//   case Status.Open:
//     return "failed";
//   case Status.Closed:
//     return "closed";
//   case Status.Done:
//     return "done";
//   case Status.Failed:
//     return "failed";
// }
// };
