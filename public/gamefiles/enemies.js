// import { Death } from "./deathanimation.js";

export class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.image = document.getElementById("enemy");
        this.spriteWidth = 64;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.spriteHeight = 64;
        this.healthWidth=60;
        this.healthHeight=10;
        this.frameX = 0;
        this.frameY = 0;
        this.x = Math.random() * (game.width - this.width);
        this.speed = 0.01;
        this.y = -this.height;
        this.markedForDeletion = false;
    }

    update(deltatime) {
        this.y += this.speed * deltatime;
        if (this.y + this.height > this.game.height) {
            this.markedForDeletion = true;
        }

        document.getElementById('enemy').style.backgroundColor='blue';
    

        ////Sprite animation loop
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < 6) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
        } else {
            this.frameTimer += deltatime;
        }
    }

    draw(context) {
        if(this.healthWidth<40){
            context.fillStyle = '#ff0022ff';
        }else if(this.healthWidth<60){
            context.fillStyle = '#ffc400ff';
        }
        else{
            context.fillStyle = '#00ff80ff';
        }
        
        context.fillRect(this.x,this.y+this.height+2,this.healthWidth,this.healthHeight);
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

}