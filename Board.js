class Board {
    constructor(size) {
        this.tiles = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.size = size;
    }

    checkWinConditions(player) {
        if (this.tiles[0] == player & this.tiles[1] == player & this.tiles[2] == player) {
            return true;
        }
        if (this.tiles[0 + 3] == player & this.tiles[1 + 3] == player & this.tiles[2 + 3] == player) {
            return true;
        }
        if (this.tiles[0 + 2 * 3] == player & this.tiles[1 + 2 * 3] == player & this.tiles[2 + 2 * 3] == player) {
            return true;
        }
        if (this.tiles[0] == player & this.tiles[0 + 3] == player & this.tiles[0 + 2 * 3] == player) {
            return true;
        }
        if (this.tiles[1] == player & this.tiles[1 + 3] == player & this.tiles[1 + 2 * 3] == player) {
            return true;
        }
        if (this.tiles[2] == player & this.tiles[2 + 3] == player & this.tiles[2 + 2 * 3] == player) {
            return true;
        }
        if (this.tiles[0] == player & this.tiles[1 + 1 * 3] == player & this.tiles[2 + 2 * 3] == player) {
            return true;
        }
        if (this.tiles[2] == player & this.tiles[1 + 1 * 3] == player & this.tiles[0 + 2 * 3] == player) {
            return true;
        }

        return false;
    }

    checkDraw() {
        var sum = 0;
        for (var i = 0; i < 9; i++) {
            if (this.tiles[i] == -1) {
                sum++;
            }
        }
        if (sum == 0) {
            return true;
        }

        return false;
    }

    makeTurn(player, x, y) {
        if (x < 0 | x > 3 * this.size) {
            return false;
        }
        if (y < 0 | y > 3 * this.size) {
            return false;
        }
        x = Math.floor(x / this.size);
        y = Math.floor(y / this.size);

        if (this.tiles[x + 3 * y] == -1) {
            this.tiles[x + y * 3] = player;
            return true;
        }
        return false;
    }

    update() {

    }

    render(c) {
        c.beginPath();
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                c.rect(x * this.size, y * this.size, this.size, this.size);
            }
        }
        c.strokeStyle = '#000000';
        c.stroke();
        for (var i = 0; i < this.tiles.length; i++) {
            x = i % 3;
            y = parseInt(i / 3);
            if (this.tiles[i] == true) {
                c.beginPath();
                c.arc(this.size / 2 + this.size * x, this.size / 2 + this.size * y, this.size / 2, 0, Math.PI * 2);
                c.strokeStyle = '#ff0000';
                c.stroke()
            } else if (this.tiles[i] == false) {
                c.beginPath();
                c.moveTo(x * this.size, + y * this.size);
                c.lineTo(this.size + x * this.size, + this.size + y * this.size);
                c.moveTo(this.size + x * this.size, + y * this.size);
                c.lineTo(x * this.size, + this.size + y * this.size);
                c.strokeStyle = '#000000'
                c.stroke();
            }
        }
    }
}