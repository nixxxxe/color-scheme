import React, { useState, useEffect } from "react";
import "./App.css";

const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "skyblue",
  "pink",
  "purple",
  "violet",
];

function App() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [bottomRowCounts, setBottomRowCounts] = useState(Array(9).fill(0));
  const [isRolling, setIsRolling] = useState(false);
  const [rollingInProgress, setRollingInProgress] = useState(false);

  useEffect(() => {
    let interval;

    const rollColor = () => {
      const randomIndex = Math.floor(Math.random() * 9);
      setSelectedColorIndex(randomIndex);
    };

    if (isRolling) {
      setRollingInProgress(true);
      interval = setInterval(rollColor, 100);
    } else {
      clearInterval(interval);
      if (rollingInProgress) {
        updateBottomRow(selectedColorIndex);
      }
      setRollingInProgress(false);
    }

    return () => clearInterval(interval);
  }, [isRolling, rollingInProgress, selectedColorIndex]);

  const handleRollButtonClick = () => {
    setIsRolling(!isRolling);
    if (!isRolling) {
      setSelectedColorIndex(null);
    }
  };

  const updateBottomRow = (index) => {
    const newBottomRowCounts = [...bottomRowCounts];
    if (index !== null) {
      newBottomRowCounts[index]++;
    }
    setBottomRowCounts(newBottomRowCounts);
  };

  const buttonText = isRolling ? "STOP ROLL" : "START ROLL";

  return (
    <div className="App">
      <div className="numContainer">
        <div className="numRow">
          {COLORS.map((color, index) => (
            <div
              key={index}
              className="numBox"
              style={{ backgroundColor: color }}
            >
              {bottomRowCounts[index]}
            </div>
          ))}
        </div>
      </div>
      <div className="gridContainer">
        <div className={`grid${isRolling ? " rolling" : ""}`}>
          {COLORS.map((color, index) => (
            <div
              key={index}
              className={`gridSquare ${
                selectedColorIndex === index ? "selected" : ""
              }`}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
      <button className="rollBtn" onClick={handleRollButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default App;