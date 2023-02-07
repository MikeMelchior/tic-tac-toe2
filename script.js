const gameBoard = (() => {
    
    let board = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];

    const addMove = (marker, index) => {
        board[index] = marker;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i ++) {
            board[i] = '';
        }
    };

    return {
        board,
        addMove,
        resetBoard,
    }
})()