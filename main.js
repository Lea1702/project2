const express = require('express');
const game = require('./game');
const checkForWinner = require('./checkForWinner');
const app = express();
const global = require('global');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

function initialize () {
    global.firstPlayer = "";
    global.secondPlayer = "";
    global.board = game.createBoard();
    global.playerTurn = [firstPlayer, secondPlayer];
    global.winner = null;
    game.printBoard(board);
}

app.get('/connection', function (req, res) {
    if (firstPlayer === "") {
        firstPlayer = "X";
        playerTurn[0] = firstPlayer;
        return res.status(200).send('Player X connected');
    }
    else if (secondPlayer === "")  {
        secondPlayer = "O";
        playerTurn[1] = secondPlayer;
        return res.status(200).send('Player O connected');
    }  
    return res.status(200).send('Players already connected');
});

app.get('/newGame', function (req, res) {
    initialize();
    return res.status(200).send('New game ! Please connect');
});

app.get('/status', async function (req, res) {
    if (winner != null) {
        return res.status(200).send(winner + " won the game !");
    }
    else {
        let isFull = await game.isBoardFull(board);
        if (isFull === true) {
            return res.status(200).send("Board is full : tie");
        }
        else {
            return res.status(200).send("Playing");
        }
    }
});


app.post('/nextMove', function (req, res) {
    if (playerTurn.includes("")) {
        return res.status(200).send("No players connected");
    }
    if (req.body.x > 2 || req.body.y > 2) {
        return res.status(400).send("Wrong (x,y) " );
    }
    game.nextMove(req.body.x, req.body.y, playerTurn[0], board).then(board => {
        if (board === "error") {
            return "error";
        }
        else {
            game.printBoard(board);
        }
        return board;
    })
    .then(board => {
        if (board === "error") {
            return res.status(400).send("This square is already taken" );
        }
        else {
            checkForWinner.doWeHaveAWinner(board).then(win => {
            if (win){
                winner = win;
                return res.status(200).send("We have a winner : " + winner);
            }
            else {
                game.isBoardFull(board).then(isFull => {
                    if (isFull === true) {
                        return res.status(200).send("Board full, game over");
                    }
                    else {
                        playerTurn = game.rotatePlayers(playerTurn);
                        return res.status(200).send("Next player turn");
                    }
                });          
             }
            }); 
        }  
    })          
    .catch(err => res.status(400).send("An error occured : ", err ));
});
 
app.listen(3000, function (){
    initialize();
}
);