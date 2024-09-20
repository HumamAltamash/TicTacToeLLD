import PieceType from './PieceType'

export class PlayingPiece {
    pieceType: PieceType;

    constructor(pieceType: PieceType) {
        this.pieceType = pieceType;
    }
}

export class PlayingPieceX extends PlayingPiece {
    constructor() {
        super(PieceType.X);
    }
}

export class PlayingPieceO extends PlayingPiece {
    constructor() {
        super(PieceType.O);
    }
}
