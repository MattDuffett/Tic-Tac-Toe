


class GameState {
    constructor(board, c) {
        this.board = board;
        this.turn = true; //True for player 1s turn false for player 2
        this.text = "Player 1 Turn"
        
    }
    update() {
        this.board.update();
        document.getElementById("Text").innerHTML = this.text;
    }
    render(c) {
        this.board.render(c);
    }
}

class GamePlay extends GameState {
    constructor(board, c) {
        super(board, c);
        this.clicked = false; //stops lots of calls being made when clicking.
        this.switchGameMode = false;
    }
    update() {
        super.update();
        if (leftMouseDown & !this.clicked) {
            this.clicked = true;
            this.makeTurn();
        }
        if (!leftMouseDown) {
            this.clicked = false;
        }
        if (this.turn) {
            this.text = "Player 1 Turn"
        } else {
            this.text = "Player 2 Turn"
        }
    }
    render(c) {
        super.render(c);
    }

    makeTurn() {
        if (this.board.makeTurn(this.turn, mouse.x, mouse.y)) {
            if (this.board.checkWinConditions(this.turn)) {
                this.switchGameMode = true;
            } else if (this.board.checkDraw()) {
                this.switchGameMode = true;
                this.turn = -1;
            } else {
                this.turn = !this.turn;
            }
        }
    }
}

class GameOver extends GameState {
    constructor(board, c, turn) {
        super(board, c);
        this.turn = turn
        if (this.turn == -1) {
            this.text = "Draw Game"
        } else if (this.turn) {
            this.text = "Player 1 Wins!!"
        } else {
            this.text = "Player 2 Wins!!"
        }
        document.getElementById("Text").innerHTML = this.text;
    }
    update() {
        super.update();
    }
    render(c) {

        super.render(c);

    }
}