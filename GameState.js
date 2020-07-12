


class GameState {
    constructor(board,c) {
        this.board = board;
        this.objects = [];
        this.turn = true; //True for player 1s turn false for player 2
        this.text = "Player 1 turn"
        this.resetButton = new Button(50,50,100,50,"Reset Game");
        this.objects.push(this.resetButton);
    }
    update() {
        this.board.update();
        this.objects.forEach(function(object) {
            object.update();
        });
        
    }
    render(c) {
        this.board.render(c);
        this.objects.forEach(function(object) {
            object.render(c);
        });
        c.fillStyle = "#000000"
        c.fillText(this.text,200,100)
    }
}

class GamePlay extends GameState {
    constructor(board,c) {
        super(board,c);
        this.clicked = false; //stops lots of calls being made when clicking.
        this.switchGameMode = false;
    }
    update(){
        super.update();
        if(leftMouseDown & !this.clicked){
            this.clicked = true;
            this.makeTurn();
        }
        if(!leftMouseDown){
            this.clicked = false;
        }
        if(this.turn){
            this.text = "Player 1 turn"
        } else {
            this.text = "Player 2 turn"
        }
    }
    render(c) {
        super.render(c);
    }

    makeTurn() {
        if(this.board.makeTurn(this.turn,mouse.x,mouse.y)){
            if(this.board.checkWinConditions(this.turn)){
                this.switchGameMode = true;
            } else {
                this.turn = !this.turn;
            }
        }
    }
}

class GameOver extends GameState {
    constructor(board,c,turn) {
        super(board,c);
        this.turn = turn
        if(this.turn){
            this.text = "Player 1 Wins!!"
        } else {
            this.text = "Player 2 Wins!!"
        }
    }
    update(){
        super.update();
    }
    render(c) {
        
        super.render(c);
        
    }
}