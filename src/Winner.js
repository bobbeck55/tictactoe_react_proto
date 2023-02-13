  
  
/*
    calculate the winner of the tictactoe game
*/
export function calculateWinner(squares) {
    
    console.log("calculateWinner");

    // in-memory representation of game board
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