
import Square from './Square.js';
import { calculateWinner } from './Winner.js';

/*
  Represents the TicTacToe Board on the TicTacToe
  Game web page
*/
export default function Board({ xIsNext, squares, onPlay, sendDataToParent }) {

    // each time the 'Board' is rendered, calculate the winner and
    // update the 'Game' web page
    let {winner, a, b, c, draw} = calculateWinner(squares) || {};

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      if (draw === true)
        status = "Draw";
      else
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    }
    // send draw || winner status to 'Game' parent
    sendDataToParent(!(draw || winner));

    // handle a click on an individual 'square' on the TicTacToe
    // board
    function handleClick(i) {
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }

    /*
      generate the content of the 'Game' board from memory ('squares')
      and represent it using the 'Square' function
    */
    function getSquareRows(squares, handleClick, n) {
      let content = [];

      for (let i = 0; i < n; i++)
      {
        content.push(<div key={n*i+3*n} className="board-row"></div>);
        for (let j = 0; j < n; j++)
        {
          if (((n*i+j) === a) || ((n*i+j) === b) || ((n*i+j) === c))
          {
            content.push(<Square key={n*i+j} value={squares[n*i+j]} onSquareClick={() => handleClick(n*i+j)} highlightBoolean="true" />);
          } else {
            content.push(<Square key={n*i+j} value={squares[n*i+j]} onSquareClick={() => handleClick(n*i+j)} highlightBoolean="false" />);           
          }
        }
      }
      return content;
    }

    // return web page data
    return (
      <>
        <div className="status">{status}</div>
        {getSquareRows(squares, handleClick, 3)}
      </>
    );
  }

