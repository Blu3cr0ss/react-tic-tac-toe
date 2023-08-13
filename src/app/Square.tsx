import React, { FC, useState } from "react";
import { Step } from "./util";
import { Button } from "antd";

type SquareProps = {
  step: Step;
  onClick: () => void;
};
const Square: FC<SquareProps> = ({ step, onClick }) => {
  return (
    <Button
      className="square"
      onClick={onClick}
      style={{
        borderRadius: "0",
      }}
      type={"default"}
    >
      {step}
    </Button>
  );
};

export default Square;
