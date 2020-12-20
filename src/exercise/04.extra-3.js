// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.extra-3.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

//Storing History of states

function Board({squares, onSquareClicked}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onSquareClicked(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ])

  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0,
  )

  const currentSquares = history[currentStep]

  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)
  function selectSquare(squareIndex) {
    if (winner || currentSquares[squareIndex]) {
      return
    }
    const historyCopy = [...history]

    const squaresCopy = [...currentSquares]
    squaresCopy[squareIndex] = nextValue

    historyCopy[currentStep + 1] = squaresCopy

    setHistory(historyCopy)
    setCurrentStep(currentStep + 1)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = history.map((sqs, index) => {
    const desc = index ? `Go to move #${index}` : 'Go to game start'
    const isCurrentStep = index === currentStep
    return (
      <li key={index}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(index)}>
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onSquareClicked={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  if (squares === undefined || squares === null || squares.length === 0) {
    return `Next player: ${nextValue}`
  }
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  if (squares === undefined || squares === null || squares.length === 0) {
    return 'X'
  }
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares) {
  if (squares === undefined || squares === null || squares.length === 0) {
    return null
  }
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
