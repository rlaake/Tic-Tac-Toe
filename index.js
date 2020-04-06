const Player = (mark) => {
    this.mark = mark;

    return {mark};
};

const gameBoard = (() => {

    const board = [];
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let winningCombo = [];

    const placeMark = (mark, location) => {
        if(location <= 8 && location >= 0 && board[location] === undefined) {
            board[location] = mark;
            return true;
        } else {
            return false;
        }
    }

    const hasWinner = () => {
        for(let i = 0; i < winningCombos.length; i++) {
            if(board[winningCombos[i][0]] === board[winningCombos[i][1]] && board[winningCombos[i][1]] === board[winningCombos[i][2]] && board[winningCombos[i][0]] !== undefined) {
                winningCombo = winningCombos[i];
                return true;
            }
        }
        return false;
    }

    const clearBoard = () => {
        board = [];
        winningCombo = [];
    }

    return {placeMark, hasWinner, clearBoard, winningCombo};
})();

const displayController = (() => {

    const squares = document.querySelectorAll(".square");

    const placeMark = (mark, location) => {
        squares[location].classList.add(mark);
    }

    const drawLine = (squares) => {

    }

    const clearBoard = () => {
        squares.forEach(square => {
            square.classList.remove(mark);
        });
    }

    const getSquares = () => squares;

    return {placeMark, drawLine, clearBoard, getSquares};

})();

const gameController = ((Player, gameBoard, displayController) => {

    player1 = Player('o');
    player2 = Player('x');
    currentPlayer = player1;


    const switchPlayers = (p1, p2, cp) => {
        return cp == p1 ? p2 : p1;
    }

    const endGame = () => {
        displayController.getSquares().forEach(square => {
            square.removeEventListener('click', clickHandler);
        });

    }

    const clickHandler = function(e) {
        if(gameBoard.placeMark(currentPlayer.mark, parseInt(e.target.id))) {
            displayController.placeMark(currentPlayer.mark, parseInt(e.target.id));
            currentPlayer = switchPlayers(player1, player2, currentPlayer);
            if(gameBoard.hasWinner()) {
                console.log(gameBoard.winningCombo);
                displayController.drawLine(gameBoard.winningCombo);
                endGame();
            }
        }
    }

    displayController.getSquares().forEach(square => {
        square.addEventListener('click', clickHandler);
    });


})(Player, gameBoard, displayController);

/* Module pattern
const module = (() => {
    const publicVariable = 1;
    const privateVariable = 2;
    const publicFunction = () => privateVariable + privateFunction();
    const privateFunction = () => publicVariable + privateVariable;
    return {publicVariable, publicFunction};
})();

module.publicVariable  // -> 1
module.privateVariable // -> ERROR
module.publicFunction  // -> 5
module.privateFunction // -> ERROR
*/

/* Factory Function Pattern
const FactoryFunction = (name, level) =>{
    let health = level * 2;
    const getName = () => name;
    const die = () => console.log("dead");
    return {getName}
};

const Nat = Player('Nat', 20);
const Robb = Player('Robb', 36);
Nat.health    // -> ERROR
Nat.die()     // -> ERROR
Nat.getName() // -> 'Nat'
*/