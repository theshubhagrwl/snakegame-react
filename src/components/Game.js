import React, { useRef, useState, useEffect } from "react";
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

  const foodPosition = () => {
    let x = Math.round(Math.random() * (height - 1) + 0);
    let y = Math.round(Math.random() * (height - 1) + 0);
    return { x, y };
  };

  const [rows, setRows] = useState(initialRows);
  // const [hasEaten, setHasEaten] = useState(false);
  const [snake, setSnake] = useState([
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ]);
  const [direction, setDirection] = useState("down");
  const [food, setFood] = useState(foodPosition);

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

  const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = "s";
    });
    //food info will be lost, so set the food position also
    newRows[food.x][food.y] = "f";
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
    if (direction === "up") {
      newSnake.push({ x: (snake[0].x - 1 + height) % height, y: snake[0].y });
    }
    if (direction === "down") {
      newSnake.push({ x: (snake[0].x + 1) % height, y: snake[0].y });
    }
    snake.forEach((cell) => {
      newSnake.push(cell);
    });
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(foodPosition);
    } else if (snake.length > 2) {
      newSnake.pop();
    } else {
      console.log("snake moving");
    }
    setSnake(newSnake);
    displaySnake();
  };

  // const requestRef = useRef();
  // const prevRef = useRef();

  // const animate = () => {
  //   if (prevRef.current !== undefined || prevRef.current !== null) {
  //     // prevRef.current = moveSnake;
  //     // moveSnake();
  //     // prevRef.current();
  //   }
  //   prevRef.current = moveSnake;
  //   requestRef.current = requestAnimationFrame(animate);
  // };

  // useEffect(() => {
  //   requestRef.current = requestAnimationFrame(animate);
  //   return () => cancelAnimationFrame(requestRef.current);
  // }, []);

  useInterval(moveSnake, 200);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        // let id = requestAnimationFrame(tick);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

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
