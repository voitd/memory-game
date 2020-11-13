// This app write on ELM like structures: helpers, logic, view, styles in one file

import React from "react";
import * as Game from "../components/Game.jsx";

export default () => {
  return (
    <div>
      <Game.View />
    </div>
  );
};
