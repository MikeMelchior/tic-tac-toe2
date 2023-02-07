const gameBoard = (() => {
    
    let board = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];

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

const player = (name, marker) => {
    this.name = name;
    this.marker = marker;

}