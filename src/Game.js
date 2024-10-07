
import React, { useState } from 'react';
import Board from './Board.js';
import MoveMessagesHistory from './MoveMessagesHistory.js';

/*
  Represents the TicTacToe Game on the TicTacToe
  Game web page
*/
export default function Game() {
   
    console.log("Game");


const express = require('express');
const app = express();
const mysql = require('mysql');
  
// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'testdb'
});

app.get('/user', (req, res) => {
    const userId = req.query.id;

    // Vulnerable query: Unsanitized user input directly in SQL query
    const query = `SELECT * FROM users WHERE id = '${userId}'`;

    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database error');
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



    // game 'state' memory managed by react
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0); // most recent player's click on game board
    const xIsNext = currentMove % 2 === 0; // put 'X' or 'O' next in the game board's square
    const currentSquares = history[currentMove]; // complete history of player's moves
    const [moveSortOrder, setMoveSortOrder] = useState(0); // ascending/descending
    const [moveNoPositionAssociation, setMoveNoPositionAssociation] = useState([]); // move no -> position index

    let displayLastMoveLine = false;

    // function handle sent to child so it can return the
    // last move line
    function getDataFromChild(tempDisplayLastMoveLine)
    {
      console.log("displayMoveLine from child: ", tempDisplayLastMoveLine);
      displayLastMoveLine = tempDisplayLastMoveLine;
    }

    // returns position index where squares != nextSquares
    // (assumes squares and nextSquares are only different by one position)
    function diffSquares(squares, nextSquares)
    {
      console.log("diffSquares");

      for (let i = 0; i < 9; i++)
      {
        if (squares[i] !== nextSquares[i])
          return i;
      }

      return null;
    }

    // displays and handles mouse input on gamee board and displays move
    // history BUT does not handle clicks on the "toggle move history order"
    function handlePlay(nextSquares) {
      console.log("handlePlay");

      let diffSquaresPosition = diffSquares(currentSquares, nextSquares);
      let movePositionTemp = moveNoPositionAssociation;
      movePositionTemp[currentMove] = diffSquaresPosition;
      setMoveNoPositionAssociation(movePositionTemp);
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      console.log(nextHistory);
    }

    // handles click on "toggle move history order" button
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

    // returns content for entire game board, move messages, and toggle move order button
    return (
      <div className="game">
        <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} sendDataToParent={getDataFromChild} />
        </div>
        <div className="game-info">
        <MoveMessagesHistory history={history} currentMove={currentMove} setCurrentMove={setCurrentMove} moveNoPositionAssociation={moveNoPositionAssociation} displayLastMoveLine={displayLastMoveLine} />
        </div>
        <ul>
        <button onClick={() => toggleMoveHistoryOrder()} type="submit">Toggle Move History Order</button>
        </ul>
      </div>
    );
  }

