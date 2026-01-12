import {Death} from "./deathanimation.js";
export class Bullet{
    constructor(x,y,dx,dy,game){
        this.startX=x;
        this.startY=y;
        this.dx = dx; /// (playerwidth / 2) - bulletwidth/2
        this.dy =dy; /// (playerheight / 2) - bulletheight/2
        this.game = game
        this.id=Math.random()*100;
        this.length=60;
        this.speed=25;
        this.angle = Math.atan2(this.dy-this.startY,this.dx-this.startX);
        this.width = 10;
        this.height = 10;
        this.x=this.startX+this.length*Math.cos(this.angle);
        this.y=this.startY+this.length*Math.sin(this.angle);
        this.markerfordeletion = false;
        console.log("bx:",this.x);
        console.log("by:",this.y);
        console.log("bw",this.width);
        console.log("bh",this.height)
    }

    update(){
        //check if it is offscreen
        if(this.x>this.game.width || this.x <0 || this.y> this.game.height || this.y < 0){
            this.markerfordeletion = true;
        }

         this.x=this.startX+this.length*Math.cos(this.angle);
         this.y=this.startY+this.length*Math.sin(this.angle);
         this.length+=this.speed;
         ///check bullet collision with other player data
         

    }
    draw(context){
        context.fillStyle = 'red';
        context.fillRect(this.x,this.y,this.width,this.height);
    }

    
}