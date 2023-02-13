

export default function  MoveMessagesHistory(props)
{ 
    console.log("MoveMessagesHistory");

    const history = props.history;
    const currentMove = props.currentMove; 
    const setCurrentMove = props.setCurrentMove;
    const moveNoPositionAssociation = props.moveNoPositionAssociation;
    const displayLastMoveLine = props.displayLastMoveLine;

    // handles click on a "go to move #" message
    function jumpTo(nextMove) {
        console.log("jumpTo - nextMove: ", nextMove);
        setCurrentMove(nextMove);
    }

    // loop through history array and generate a message
    // for display to the right of the board
    let moveHistoryContent = history.map((squares, move) => {

      let description;
      if ((move === history.length - 1) && !displayLastMoveLine) {
        return ("");
      }

      if (move > 0) {
        if (currentMove === move) {
          description = 'You are at move #' + move;
        } else {
          description = 'Go to move #' + move;
        }
      } else {
        if (move === currentMove) {
          description = "You are at game start";
        }

        else {
          description = 'Go to game start';
        }
      }

      let diffSquaresPosition = moveNoPositionAssociation[move];

      let row, column;
      if (diffSquaresPosition !== undefined) {
        row = Math.ceil((diffSquaresPosition + 1) / 3);
        column = (diffSquaresPosition + 1) - (row - 1) * 3;
        description += ", (" + row + ", " + column + ")";

        // return "go to move#" message
        return ( <li key={move}><button onClick={() => jumpTo(move)}>{description}</button></li> );

        
      }
      else
      {

        // return "go to move#" message
        return (
          <li key="">{description}</li>
        )

      }


    });

    return <ol>{moveHistoryContent}</ol>;
}