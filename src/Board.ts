import { PlayingPiece } from "./PlayingPiece";

class Board {
    size: number;
    board: (PlayingPiece | null)[][];

    constructor(size: number) {
        this.size = size;
        this.board = Array.from({ length: size }, () => Array(size).fill(null));
    }

    addPiece(row: number, column: number, playingPiece: PlayingPiece): boolean {
        if (this.board[row][column] === null) {
            this.board[row][column] = playingPiece;
            return true;
        }
        return false;
    }

    getFreeCells(): Array<[number, number]> {
        const freeCells: Array<[number, number]> = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === null) {
                    freeCells.push([i, j]);
                }
            }
        }
        return freeCells;
    }

    printBoard(): void {
        for (let i = 0; i < this.size; i++) {
            let row = '';
            for (let j = 0; j < this.size; j++) {
                row += this.board[i][j] ? this.board[i][j]?.pieceType : '_';
                row += ' ';
            }
            console.log(row);
        }
        console.log('');
    }
}

export default Board;