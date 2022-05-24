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
  const [hasEaten, setHasEaten] = useState(false);
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
  const [direction, setDirection] = useState(null);

  const displayRows = rows.map((row) => (
    <div className="boardRow">
      {row.map((cell, index) => {
        if (cell == "s") {
          return <div key={index} className="snakeCell"></div>;
        }
        if (cell == "f") {
          return <div key={index} className="foodCell"></div>;
        } else {
          return <div key={index} className="emptyCell"></div>;
        }
      })}
    </div>
  ));

  const changeDirection = (e) => {
    let { keyCode } = e;
    if (keyCode === 37) {
      console.log("left");
      setDirection("left");
    }
    if (keyCode === 38) {
      console.log("up");
      setDirection("up");
    }
    if (keyCode === 39) {
      console.log("right");
      setDirection("right");
    }
    if (keyCode === 40) {
      console.log("down");
      setDirection("down");
    }
  };

  window.addEventListener("keydown", changeDirection);

  const foodPosition = () => {
    let x = Math.round(Math.random() * (height - 1) + 0);
    let y = Math.round(Math.random() * (height - 1) + 0);
    return { x, y };
  };

  const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = "s";
    });
    setRows(newRows);
  };

  const moveSnake = () => {
    const newSnake = [];
    if (direction === "right") {
      newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % width });
    }
    if (direction === "left") {
      newSnake.push({ x: snake[0].x, y: (snake[0].y - 1 + width) % width });
    }
    if (direction === "top") {
      newSnake.push({ x: (snake[0].x - 1 + height) % height, y: snake[0].y });
    }
    if (direction === "bottom") {
      newSnake.push({ x: (snake[0].x + 1) % height, y: snake[0].y });
    }
    snake.forEach((cell) => {
      newSnake.push(cell);
    });
    setSnake(newSnake);
    displaySnake();
  };

  const displayFood = () => {
    const newRows = initialRows;
    let { x, y } = foodPosition();
    newRows[x][y] = "f";
    setRows(newRows);
  };

  return (
    <>
      <div>Hi Welcome to the Snake Game</div>
      {displayRows}
      <button onClick={displayFood}>Food</button>
      {/* <button onClick={displaySnake}>Food</button> */}
      <button onClick={moveSnake}>move it move it</button>
      {/* {console.log(rows)} */}
    </>
  );
};

export default Game;
