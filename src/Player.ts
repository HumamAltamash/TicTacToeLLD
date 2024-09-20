import { PlayingPiece } from "./PlayingPiece";

class Player {
    name: string;
    playingPiece: PlayingPiece;

    constructor(name: string, playingPiece: PlayingPiece) {
        this.name = name;
        this.playingPiece = playingPiece;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getPlayingPiece(): PlayingPiece {
        return this.playingPiece;
    }

    setPlayingPiece(playingPiece: PlayingPiece): void {
        this.playingPiece = playingPiece;
    }
}

export default Player