
function checkRows (board){
    let x;
    for (x = 0; x < board.length; x++){
        if (board[x].every( square => square === board[x][0] && square !== " ")) {
            return board[x][0];
        }
    }
    return null;
}

function checkDiagonals (board){
    let diagonals = [
        [board[0][0], board[1][1], board[2][2]],
        [board[2][0], board[1][1], board[0][2]]
    ]
    return checkRows(diagonals);
}

function checkColumns (board) {
    for (let y = 0; y < board.length; y++){
        let x = 1;
        let isOver = true;
        while (isOver && x<3) {
            if ( (board[x][y] !== board[x-1][y]) || board[x][y] === " "){
                isOver = false;
            } 
            else if (x === 2 ){
                return board[x][y];
            }
            else {
                 x = x + 1;
            }
        }
    }
    return null;
}


async function doWeHaveAWinner (board){
    let columnsWinner = checkColumns(board);
    let rowsWinner = checkRows(board);
    let diagonalsWinner = checkDiagonals(board);
    if (columnsWinner !== null)
    {
        return columnsWinner;
    }
    else if (rowsWinner !== null)
    {
        return rowsWinner;
    }
    else if (diagonalsWinner !== null)
    {
        return diagonalsWinner;
    }
    else {
        return null;
    }    
}


module.exports = {
    doWeHaveAWinner
}
