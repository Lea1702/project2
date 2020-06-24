function createBoard () {
    let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    return board;
}

async function nextMove (x, y, player, board) {
    if (board[y][x] !== " ") {
        return "error";
    }
    else {
        board[y][x] = player;
        return board;
    }
}

async function isBoardFull (board){
    for (const row in board){
        if (board[row].includes(" ")) {
            return false;
        }
    }
    return true;
}

function printBoard (board){
    console.log("-------------");
    for (let row = board.length-1; row >= 0 ; row --) {
        let printRow = "| ";
        board[row].forEach(square =>
            printRow = printRow.concat(square, ' | ')
        );
        console.log(printRow);
        console.log("-------------");
    }
}

function rotatePlayers(playerTurn) {
    let player = playerTurn.shift();
    playerTurn.push(player);
    return playerTurn;
}

module.exports = {
    createBoard,
    nextMove,
    isBoardFull,
    printBoard,
    rotatePlayers
};