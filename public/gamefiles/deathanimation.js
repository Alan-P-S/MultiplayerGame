export class Death{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.image=document.getElementById('deathAnimation');
        this.width=64;
        this.height=64;
        this.frameX=0;
        this.frameY=0;
        this.maxFrame=13;
        this.frameTimer=0;
        this.speed=0.01;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.spriteWidth=64;
        this.spriteHeight=64;
        this.markedfordeletion=false;
    }
    update(deltatime){
        
        this.y+=this.speed*deltatime;
        if(this.frameTimer>this.frameInterval){
            this.frameX++;
            this.frameTimer=0;
        }else{
            this.frameTimer+=deltatime;
        }
        if(this.frameX>this.maxFrame) this.markedfordeletion=true;
    }

    draw(context){
        context.drawImage(this.image,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}