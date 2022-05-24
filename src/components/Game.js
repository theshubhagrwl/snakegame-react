import React, { useState } from "react";
import "../App.css";

const Game = () => {
  const height = 10;
  const width = 10;
  const initialRows = [];
  for (let i = 0; i < height; i++) {
    initialRows.push([]);
    for (let j = 0; j < width; j++) {
      initialRows[i].push([""]);
    }
  }

  const [rows, setRows] = useState(initialRows);

  const displayRows = rows.map((row) => (
    <div className="boardRow">
      {row.map((cell, index) => {
        if (cell == "") {
          return <div className="emptyCell"></div>;
        } else {
          return <div className="foodCell"></div>;
        }
      })}
    </div>
  ));

  const changeDirection = (e) => {
    let { keyCode } = e;
    if (keyCode === 37) {
      console.log("left");
    }
    if (keyCode === 38) {
      console.log("up");
    }
    if (keyCode === 39) {
      console.log("right");
    }
    if (keyCode === 40) {
      console.log("down");
    }
  };

  window.addEventListener("keydown", changeDirection);

  return (
    <>
      <div>Hi Welcome to the Snake Game</div>
      {displayRows}
    </>
  );
};

export default Game;
