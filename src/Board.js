
import Square from './Square.js';

export default function Board({ xIsNext, squares, onPlay, sendDataToParent }) {

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
    sendDataToParent(!(draw || winner));

    function handleClick(i) {
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }

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

    return (
      <>
        <div className="status">{status}</div>
        {getSquareRows(squares, handleClick, 3)}
      </>
    );
  }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], a: a, b: b, c: c, draw: false };
    }
  }

  return { winner: null, a: null, b: null, c: null, draw: !squares.includes(null) }

}
