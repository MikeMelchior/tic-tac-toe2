const gameBoard = (() => {
    
    let board = ['', '', '',
                 '', '', '', 
                 '', '', ''];

    const getBoard = () => {
        return board;
    }

    const addMove = (marker, index) => {
        board[index] = marker;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i ++) {
            board[i] = '';
        }
    };

    return {
        getBoard,
        addMove,
        resetBoard,
    }
})()

const Player = (name) => {
    let score = 0;
    this.incrementScore = () => {
        score++
    }
    this.getScore = () => {
        return score;
    }
    return {name, incrementScore, getScore}
}

const displayController = (() => {

    const main = document.querySelector('.main');
    const content = document.querySelector('.content');
    const boardContainer = document.querySelector('.board-container');

    const createBoard = () => {

        const board = document.createElement('div');
        board.classList.add('game-board');

        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.classList.add(`${i}`,'square',`square${i}`);

            let marker = document.createElement('p');
            marker.classList.add('marker',`marker${i}`);
            marker.textContent = '';

            square.appendChild(marker);
            board.appendChild(square);
        }

        boardContainer.appendChild(board);
    }

    const createScoreBoard = () => {
            // scoreboard container
        const scoreboard = document.createElement('div');
        scoreboard.classList.add('score-board');
            // scoreboard title
        const title = document.createElement('p');
        title.textContent = 'Scoreboard';
            // create container for player names and scores
        const scoresDiv = document.createElement('div');
        scoresDiv.classList.add('scores-container');
                // create separate containers for each player with default text
            const playerOneContainer = document.createElement('div');
            playerOneContainer.classList.add('player-one');

            const playOneName = document.createElement('div');
            playOneName.textContent = 'Player One';
            const playOneScore = document.createElement('div');
            playOneScore.textContent = '0';

            playerOneContainer.append(playOneName, playOneScore);

            const playerTwoContainer = document.createElement('div');
            playerTwoContainer.classList.add('player-two');

            const playerTwoName = document.createElement('div');
            playerTwoName.textContent = 'Player Two';
            const playerTwoScore = document.createElement('div');
            playerTwoScore.textContent = '0';

            playerTwoContainer.append(playerTwoName, playerTwoScore);
            
        scoresDiv.append(playerOneContainer, playerTwoContainer);

        scoreboard.append(title, scoresDiv);
        content.appendChild(scoreboard);
    }

    const createNewWindow = (className) => {
        const window = document.createElement('div');
        window.classList.add('window',className);

        return window;
    }

    const createNewGameWindow = () => {
        const window = createNewWindow('new-game-window')

        const para = document.createElement('p');
        para.textContent = 'New Game';

        const button = document.createElement('button');
        button.classList.add('multiplayer');
        button.textContent = 'Multiplayer';

        const buttonTwo = document.createElement('button');
        buttonTwo.classList.add('vs-computer');
        buttonTwo.textContent = 'Vs. Computer';

        window.append(para, button, buttonTwo);
        main.appendChild(window);
    }

    const toggleNewGameWindow = () => {
        document.querySelector('.new-game-window').classList.toggle('hidden');
    }

    const createNameSelectWindow = () => {
        const nameSelectWindow = createNewWindow('name-select-window');
        // nameSelectWindow.classList.add('hidden');

            //create for for name input
        const form = document.createElement('form');

        const labelOne = document.createElement('label');
        labelOne.htmlFor = 'PlayOneName';
        labelOne.innerHTML = 'Player One Name:';

        const inputOne = document.createElement('input');
        inputOne.type = 'text';
        inputOne.name = 'PlayOneName';
        inputOne.id = 'PlayOneName';

        const labelTwo = document.createElement('label');
        labelTwo.htmlFor = 'PlayTwoName';
        labelTwo.innerHTML = 'Player Two Name:';

        const inputTwo = document.createElement('input');
        inputTwo.type = 'text';
        inputTwo.name = 'PlayTwoName';
        inputTwo.id = 'PlayTwoName';

        form.append(labelOne, inputOne, labelTwo, inputTwo)

        const buttonContainer = document.createElement('div');
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';

        buttonContainer.append(startButton, cancelButton);

        nameSelectWindow.append(form, buttonContainer)
        main.appendChild(nameSelectWindow);
    }

    createBoard();
    createScoreBoard();
    createNewGameWindow();
    createNameSelectWindow();

    return {
        toggleNewGameWindow
    }
})()


const game = (() => {

    let gameMode = null;
    let marker = null;

    const oMarker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9Z" /></svg>`
    const xMarker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,7L11,12L9,17H11L12,14.5L13,17H15L13,12L15,7H13L12,9.5L11,7H9Z" /></svg>`
    let currentMarker = null

    const newGame = () => {
        document.querySelectorAll('.square').forEach((square) => {
            square.textContent = '';
            let newSquare = square.cloneNode(true);
            square.parentNode.replaceChild(newSquare, square);
        })

        if (getGameMode() === 'multiplayer') {
            multiplayerGame();
        }
    }

    const setGameMode = (mode) => {
        gameMode = mode;
    }

    const getGameMode = () => {
        return gameMode;
    }

    const getMarker = () => {
        marker == 'x' ? marker = 'o' : marker = 'x';
        marker == 'x' ? currentMarker = xMarker : currentMarker = oMarker;
        return marker;
    }

    const checkForWin  = () => {
        let board = gameBoard.getBoard();
        if (board[0] !== '' && board[0] === board[1] && board[1] === board[2]
            || board[3] !== '' && board[3] === board[4] && board[4] === board[5]
            || board[6] !== '' && board[6] === board[7] && board[7] === board[8]
            || board[0] !== '' && board[0] === board[3] && board[3] === board[6]
            || board[1] !== '' && board[1] === board[4] && board[4] === board[7]
            || board[2] !== '' && board[2] === board[5] && board[5] === board[8]
            || board[0] !== '' && board[0] === board[4] && board[4] === board[8]
            || board[2] !== '' && board[2] === board[4] && board[4] === board[6]
            ) {
                winGame();
                newGame();
                return
            }
        if (gameBoard.getBoard().indexOf('') === -1) {
            tieGame();
            newGame();
        }
    }

    const winGame = () => {
        if (marker === 'x') {
            alert('Player one wins!');
        } else {
            alert('Player two wins!')
        }
    }

    const tieGame = () => {
        alert("It's a tie!")
    }

    const multiplayerGame = () => {
        setGameMode('multiplayer');
        document.querySelectorAll('.square').forEach((square) => {
            square.addEventListener('click', (e) => {
                    // if square has been played return
                if (e.target.textContent !== '') {
                    return 
                } else {
                    getMarker();
                        // update board object
                    gameBoard.addMove(marker, e.target.classList[0])
                        //display marker svg
                    e.target.innerHTML = currentMarker;
                        // and check for win and set timeout to allow winning marker to display
                    setTimeout(() => {
                        checkForWin();
                    }, 1);
                }
            })
        })
    }

    document.querySelector('.multiplayer').addEventListener('click', () => {
        setGameMode('multiplayer');
        newGame();
        displayController.toggleNewGameWindow();
    })

    document.querySelector('.vs-computer').addEventListener('click', () => {
        alert('Coming Soon!');
    })

    return {
    }
})()



