import "./App.css";
import { useState } from "react";

function Board() {
  const [isX, setIsX] = useState(true);
  const [cells, setCells] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [winner, setWinner] = useState(null);

  function handleClick(index) {
    if (cells[index] || winner) {
      return;
    }

    const copyCells = cells.slice();
    if (isX) {
      copyCells[index] = "X";
      setIsX(false);
    } else {
      copyCells[index] = "O";
      setIsX(true);
    }
    setWinner(calculateWinner(copyCells));
    setCells(copyCells);
  }

  return (
    <div>
      <div className="step">Ход: {isX ? "X" : "O"}</div>
      <div className="board">
        {cells.map(function (item, index) {
          return (
            <div
              key={index}
              className="cells"
              onClick={() => {
                handleClick(index);
              }}>
              {item}
            </div>
          );
        })}
      </div>
      <div className="winner">{winner ? "Победил: " + winner : undefined}</div>
    </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function App() {
  return <Board />;
}

export default App;
