class Button {
    constructor(x,y,width,height,text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.clicked = false;
    }

    update() {
        if(leftMouseDown){
            if(mouse.x > this.x & mouse.x < this.x+this.width){
                if(mouse.y > this.y & mouse.y < this.y + this.height){
                    this.clicked = true;
                }
            }
        }
        if(!leftMouseDown){
            this.clicked = false;
        }
    }

    render(c) {
        c.beginPath();
        c.fillStyle = "#DDDDDD"
        c.fillRect(this.x,this.y,this.width,this.height);
        c.fillStyle = "#000000"
        c.fillText(this.text, this.x+10, this.y+this.height/2);
    }
}