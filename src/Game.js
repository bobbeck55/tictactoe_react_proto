
import React, { useState } from 'react';
import Board from './Board.js';

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0); // most recent player's click on game board
    const xIsNext = currentMove % 2 === 0; // put 'X' or 'O' next in the game board's square
    const currentSquares = history[currentMove]; // complete history of player's moves
    const [moveSortOrder, setMoveSortOrder] = useState(0); // ascending/descending
    const [moveNoPositionAssociation, setMoveNoPositionAssociation] = useState([]); // move no -> position index

    let displayLastMoveLine = false;

    function getDataFromChild(tempDisplayLastMoveLine)
    {
      console.log("displayMoveLine from child: ", tempDisplayLastMoveLine);
      displayLastMoveLine = tempDisplayLastMoveLine;
    }

    const moves = history.map((squares, move) => {

        let description;
        if ((move === history.length-1) && !displayLastMoveLine)
        {
          return ("");
        }

        if (move > 0) {
            if (currentMove === move)
            {
                description = 'You are at move #' + move;
            } else {
                description = 'Go to move #' + move;
            }
        } else {
          if (move === currentMove)
          {
            description = "You are at game start";
          }
          else
          {
            description = 'Go to game start';
          }
        }
        
        let diffSquaresPosition = moveNoPositionAssociation[move];
        console.log(diffSquaresPosition);

        let row, column;
        if (diffSquaresPosition !== undefined)
        {
          row = Math.ceil((diffSquaresPosition+1) / 3);
          column = (diffSquaresPosition+1) - (row-1)*3;
          description += ", (" + row + ", " + column + ")";

          return (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
          );
        }
        else
        {
          return (
            <li key="">
              {description}
            </li>
          );
        }
      });


    function handlePlay(nextSquares) {
      let diffSquaresPosition = diffSquares(currentSquares, nextSquares);
      let movePositionTemp = moveNoPositionAssociation;
      movePositionTemp[currentMove] = diffSquaresPosition;
      setMoveNoPositionAssociation(movePositionTemp);
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      console.log(nextHistory);
    }


    function toggleMoveHistoryOrder()
    {
      console.log("handleToggleMoveHistoryOrder")
      const nextHistory = [...history.slice(0, currentMove + 1)]
      nextHistory.reverse();
      setHistory(nextHistory);
      setMoveSortOrder(!moveSortOrder);
      const nextMoveNoPositionAssociation = [...moveNoPositionAssociation];
      nextMoveNoPositionAssociation.reverse();
      setMoveNoPositionAssociation(nextMoveNoPositionAssociation);
      console.log(nextHistory);
    }

    function jumpTo(nextMove) {
      console.log("jumpTo - nextMove: ", nextMove);
      setCurrentMove(nextMove);
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} sendDataToParent={getDataFromChild} />
        </div>
        <div className="game-info">
        <ol> {moves} </ol>
        </div>
        <ul>
        <button onClick={() => toggleMoveHistoryOrder()} type="submit">Toggle Move History Order</button>
        </ul>
      </div>
    );
  }

  // returns position index where squares != nextSquares
  // (assumes squares and nextSquares are only different by one position)
  function diffSquares(squares, nextSquares)
  {

    for (let i = 0; i < 9; i++)
    {
      if (squares[i] !== nextSquares[i])
        return i;
    }

    return null;
  }
