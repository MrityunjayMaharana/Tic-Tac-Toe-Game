import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

// Square Component
function Square({ value, onSquareClick }) {
  return (
    <motion.button
      onClick={onSquareClick}
      className="square third-color"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {value}
    </motion.button>
  );
}

// Board Component
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  function handleClick(i) {
    // if already filled or winner exist return
    if (squares[i] || checkWinner(squares)) {
      return;
    }

    // Store the updated value
    let updatedSquares = squares.slice();

    // Check turn
    if (turn) {
      updatedSquares[i] = "X";
      setTurn(false);
    } else {
      updatedSquares[i] = "O";
      setTurn(true);
    }

    // Update the original array
    setSquares(updatedSquares);
  }

  // Function to calculate winner
  function checkWinner(squares) {
    // Winning Condition
    const winningCondition = [
      // Horizontal win
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical win
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal win
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCondition.length; i++) {
      const [a, b, c] = winningCondition[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  // Function to check if the board is full (draw)
  function isBoardFull(squares) {
    return squares.every((square) => square !== null);
  }

  // Reset the Board and update scores
  function resetBoard() {
    setSquares(Array(9).fill(null));
    if (checkWinner(squares) === "X") {
      setXScore(xScore + 1);
    } else if (checkWinner(squares) === "O") {
      setOScore(oScore + 1);
    }
    setTurn(true);
  }

  // Reset the Board and update scores
  function restartBoard() {
    setSquares(Array(9).fill(null));
    alert('Your Scores will start from 0 again !!!');
    setOScore(0);
    setXScore(0);
    setTurn(true);
  }

  // Status
  let status;
  const winner = checkWinner(squares);
  if (winner) {
    status = `Winner is ${winner} !!!`;
  } else if (isBoardFull(squares)) {
    status = "It's a draw!";
  } else {
    status = `Next is ${turn ? "X" : "O"}'s turn`;
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>

      <div className="scoreboard">
        <p>
          X Score: <span>{xScore}</span>{" "}
        </p>
        <hr />
        <p>
          O Score: <span>{oScore}</span>{" "}
        </p>
      </div>
      <motion.div
        className="status first-color"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {status}
      </motion.div>

      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="btn">
      <motion.button
        className="reset second-color"
        onClick={resetBoard}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        New Board
      </motion.button>
      <motion.button
        className="restart"
        onClick={restartBoard}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Restart
      </motion.button>
      </div>
      
    </>
  );
}

export default Board;
