"use client";
import React, { FC, useState } from "react";
import "./page.css";

enum Step {
  X = "X",
  O = "O",
  NONE = "",
}

type Position = { x: number; y: number };
type SquareProps = {
  step: Step;
  onClick: () => void;
};

const Square: FC<SquareProps> = ({ step, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      <h1>{step}</h1>
    </button>
  );
};
function isGameEnd(steps: { [key: string]: Step }) {
  const endPatterns = [
    ["00", "01", "02"],
    [10, 11, 12],
    [20, 21, 22],
    ["00", 10, 20],
    ["01", 11, 21],
    ["02", 12, 22],
    ["00", 11, 22],
    [20, 11, "02"],
  ];
  for (let i = 0; i < endPatterns.length; i++) {
    const element = endPatterns[i];
    const mapped = element.map((el) => (!steps ? null : steps[el]));
    if (
      !mapped.includes(undefined) &&
      !mapped.includes(null) &&
      allEqual(mapped)
    ) {
      return true;
    }
  }
  return false;
}
type BoardProps = { h: number; w: number };

const Board: FC<BoardProps> = ({ h = 3, w = 3 }) => {
  const [steps, setSteps] = useState<{ [key: string]: Step }>();
  const [currentStep, setCurrentStep] = useState<Step.O | Step.X>(Step.X);
  const [gameOver, setGameOver] = useState(false);
  console.log("qqqqqqqqqqq");

  function onClick(x: number, y: number) {
    if (!steps?.[`${x}${y}`]) {
      const newSteps = { ...steps, [`${x}${y}`]: currentStep };
      if (isGameEnd(newSteps)) {
        setGameOver(true);
      }
      if (gameOver) return;
      setSteps(newSteps);
      12;
      setCurrentStep((currentStep) =>
        currentStep === Step.X ? Step.O : Step.X
      );
    }
  }

  const rangeH = range(h);
  const rangeW = range(w);

  return (
    <>
      <h1 style={{ visibility: gameOver ? "visible" : "hidden" }}>
        Game Over!
      </h1>
      <br />
      <div className="board">
        {zip(rangeH, rangeW).map((xs, y) =>
          xs.map((_, x) => (
            <Square
              key={`${x}${y}`}
              step={steps?.[`${x}${y}`] ?? Step.NONE}
              onClick={() => onClick(x, y)}
            />
          ))
        )}
      </div>
    </>
  );
};

const range = (n: number) => Array.from(Array(n).keys());
const zip = (array1: number[], array2: number[]) =>
  array1.map((_, i) => array2);
const allEqual = (arr: Array<any>) =>
  arr.every((v) => v === arr[0]) || arr.length === 0;

export default Board;
