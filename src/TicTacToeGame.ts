import * as readline from 'readline';
import Board from './Board';
import Player from './Player';
import { PlayingPieceX, PlayingPieceO } from './PlayingPiece';

class TicTacToeGame {
    players: Player[];
    gameBoard: Board;
    currentPlayerIndex: number;
    rl: readline.Interface;

    constructor() {
        this.players = [];
        this.gameBoard = new Board(3); // 3x3 board for Tic Tac Toe
        this.currentPlayerIndex = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.initializeGame();
    }

    initializeGame(): void {
        const player1 = new Player("Player 1", new PlayingPieceX());
        const player2 = new Player("Player 2", new PlayingPieceO());
        this.players = [player1, player2];
        console.log("Game Initialized!");
    }

    async startGame(): Promise<void> {
        let winner: Player | null = null;
        let moveCount = 0;
        const totalMoves = this.gameBoard.size * this.gameBoard.size;

        while (moveCount < totalMoves && !this.isThereWinner()) {
            this.gameBoard.printBoard();

            const currentPlayer = this.players[this.currentPlayerIndex];
            console.log(`${currentPlayer.getName()}'s turn. Place your ${currentPlayer.getPlayingPiece().pieceType}`);
            
            const [row, column] = await this.getPlayerMove(); // Await user input
            const validMove = this.gameBoard.addPiece(row, column, currentPlayer.getPlayingPiece());

            if (validMove) {
                moveCount++;
                if (this.isThereWinner()) {
                    winner = currentPlayer;
                    break;
                }
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2; // Switch players
            } else {
                console.log("Invalid move! Try again.");
            }
        }

        this.gameBoard.printBoard();
        if (winner) {
            console.log(`${winner.getName()} wins!`);
        } else {
            console.log("It's a draw!");
        }
        this.rl.close(); // Close readline interface after the game ends
    }

    isThereWinner(): boolean {
        const lines = this.getWinningLines();

        for (const line of lines) {
            const [a, b, c] = line;
            if (this.gameBoard.board[a[0]][a[1]] &&
                this.gameBoard.board[a[0]][a[1]]?.pieceType === this.gameBoard.board[b[0]][b[1]]?.pieceType &&
                this.gameBoard.board[a[0]][a[1]]?.pieceType === this.gameBoard.board[c[0]][c[1]]?.pieceType) {
                return true;
            }
        }

        return false;
    }

    getWinningLines(): Array<[[number, number], [number, number], [number, number]]> {
        // Returns all possible winning combinations (rows, columns, diagonals)
        return [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];
    }

    getPlayerMove(): Promise<[number, number]> {
        return new Promise((resolve) => {
            this.rl.question('Enter your move (row and column, separated by a space): ', (input) => {
                const [row, column] = input.split(' ').map(Number);

                // Validate input: Check if row and column are within bounds and not NaN
                if (Number.isNaN(row) || Number.isNaN(column) || row < 0 || row >= this.gameBoard.size || column < 0 || column >= this.gameBoard.size) {
                    console.log("Invalid input. Please enter row and column as numbers between 0 and 2.");
                    resolve(this.getPlayerMove()); // Ask again if invalid
                } else {
                    resolve([row, column]);
                }
            });
        });
    }
}

export default TicTacToeGame;