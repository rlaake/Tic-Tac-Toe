const gameController = (() => {

    let player1, player2, currentPlayer, won;

    const Player = (mark, name) => {
        if (name.length === 0) {
            if (mark === 'o') {
                name = 'Player 1';
            } else {
                name = 'Player 2';
            }
        }
    
        return {mark, name};
    };
    
    const gameBoard = (() => {
    
        let board = [];
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
                    for(let j = 0; j < 3; j++) {
                        winningCombo.push(winningCombos[i][j]);
                    }
                    return true;
                }
            }
            return false;
        }
    
        const clearBoard = () => {
            for(let i = 0; i < 9; i++) {
                board.pop();
                winningCombo.pop();
            }
        }
    
        return {placeMark, hasWinner, clearBoard, winningCombo};
    })();
    
    const displayController = (() => {
    
        const squares = document.querySelectorAll(".square");
        const players = document.getElementsByClassName('player-names');
        const header = document.getElementsByTagName('header');
        const playerNames = [];
    
        const placeMark = (mark, location) => {
            squares[location].classList.add(mark);
        }
    
        const drawLine = (squares) => {
    
        }
    
        const clearBoard = () => {
            squares.forEach(square => {
                square.classList.remove('x');
                square.classList.remove('o');
            });
        }
    
        const updateNames = (player1, player2) => {
            players[0].setAttribute('type', 'hidden');
            players[1].setAttribute('type', 'hidden');
            showName(player1, 0);
            showName(player2, 1);
        }
    
        const showName = (player, pos) => {
            let p = document.createElement('div')
            p.setAttribute('class', 'name');
            playerNames.push(p);
            if (pos === 0) {
                p.innerHTML = player.name + ': O';
                header[0].insertBefore(p, header[0].childNodes[0]);
                p.classList.add('isTurn');
            } else {
                p.innerHTML = player.name + ': X';
                header[0].appendChild(p);
            }
        }
    
        const switchPlayers = () => {
            playerNames[0].classList.toggle('isTurn');
            playerNames[1].classList.toggle('isTurn');
        }
    
        return {placeMark, drawLine, clearBoard, squares, players, updateNames, switchPlayers};
    
    })();

    const startGame = () => {
        attachListeners();
        player1 = Player('o', displayController.players[0].value);
        player2 = Player('x', displayController.players[1].value);
        currentPlayer = player1;
        let btn = document.getElementById('new-game');
        btn.removeEventListener('click', startGame);
        btn.innerHTML = 'Reset Game';
        btn.addEventListener('click', resetGame);
        displayController.updateNames(player1, player2);
    }

    const switchPlayers = (p1, p2, cp) => {
        displayController.switchPlayers();
        return cp == p1 ? p2 : p1;
    }

    const attachListeners = () => {
        displayController.squares.forEach(square => {
            square.addEventListener('click', clickHandler);
        });
    }

    const removeListeners = () => {
        displayController.squares.forEach(square => {
            square.removeEventListener('click', clickHandler);
        });
    }

    const resetGame = () => {
        displayController.clearBoard();
        gameBoard.clearBoard();
        attachListeners();
        if (won) {
            currentPlayer = switchPlayers(player1, player2, currentPlayer);
            won = false;
        }
    }

    const clickHandler = function(e) {
        if(gameBoard.placeMark(currentPlayer.mark, parseInt(e.target.id))) {
            displayController.placeMark(currentPlayer.mark, parseInt(e.target.id));
            if(gameBoard.hasWinner()) {
                displayController.drawLine(gameBoard.winningCombo);
                removeListeners();
                won = true;
                return;
            }
            currentPlayer = switchPlayers(player1, player2, currentPlayer);
        }
    }

    document.getElementById('new-game').addEventListener('click', startGame);

})();

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