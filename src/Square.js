
// Generates an individual 'square' on the tictactoe
// game board
export default function Square({ value, onSquareClick, highlightBoolean }) {


  if (highlightBoolean === "true")
  {
    return (
      <button className="square_highlighted" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  else
  {

    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );

  }


}
  