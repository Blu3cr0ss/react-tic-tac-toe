import React, { FC, useState } from "react";
import Square from "./Square";
import { Step, isGameOver, zip, range } from "./util";
import { Button, Typography } from "antd";

const { Title } = Typography;

const Board: FC = () => {
  const [steps, setSteps] = useState<{ [key: string]: Step }>();
  const [currentStep, setCurrentStep] = useState<Step.O | Step.X>(Step.X);
  const [gameOver, setGameOver] = useState<any>(false);

  function onClick(x: number, y: number) {
    if (!steps?.[`${x}${y}`]) {
      const newSteps = { ...steps, [`${x}${y}`]: currentStep };
      const gameOverOutput = isGameOver(newSteps);
      if (gameOverOutput || gameOverOutput == " ") {
        setGameOver(gameOverOutput);
      }
      if (gameOver) return;
      setSteps(newSteps);
      setCurrentStep((currentStep) =>
        currentStep === Step.X ? Step.O : Step.X
      );
    }
  }
  function onReset() {
    setSteps(undefined);
    setCurrentStep(Step.X);
    setGameOver(false);
  }
  return (
    <>
      <Title
        style={{
          visibility: gameOver ? "visible" : "hidden",
        }}
        type="success"
      >
        {gameOver == " " ? "Draw" : "Winner: " + gameOver}
      </Title>
      <div className="board">
        {zip(range(3), range(3)).map((xs, y) =>
          xs.map((_, x) => (
            <Square
              key={`${x}${y}`}
              step={steps?.[`${x}${y}`] ?? Step.NONE}
              onClick={() => onClick(x, y)}
            />
          ))
        )}
        <br />
        <Button
          type="primary"
          style={{
            marginTop: "50px",
          }}
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </>
  );
};
export default Board;
