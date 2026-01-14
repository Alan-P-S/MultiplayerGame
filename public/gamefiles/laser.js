import { Death } from "./deathanimation.js";
import { Bullet } from "./bullet.js";
import {socket} from "./socket.js"
export class Laser{
    constructor(game){
        this.game=game;
        this.dx=0;
        this.dy=0;
        this.bullets=0;
        this.width=0;
        this.height=0;
        this.x=0;
        this.y=0;
        this.length=500;
        this.frameTimer=0;
        this.fps =10;
        this.frameInterval=1000/this.fps;
        this.angle=0;
        this.startX=0;
        this.startY=0;
        this.socket=socket
    }

    update(input,deltatime){
        if(input.length>0){
            this.dx = input[0].offsetX;
            this.dy = input[0].offsetY;
            this.startX=this.game.player.x+(this.game.player.width/2);
            this.startY=this.game.player.y+(this.game.player.height/2);
            if(this.frameTimer>=this.frameInterval && this.game.controller.keys.includes('click')){
                console.log(this.frameInterval)
                this.game.bullets.push(new Bullet(this.startX,this.startY,this.dx,this.dy,this.game)); 
                console.log('StartX: ',this.startX);
                console.log('StartY: ',this.startY);
                console.log('DX: ',this.dx);
                console.log('DY: ',this.dy);
                this.socket.emit('bullet',{x:this.startX,y:this.startY,dx:this.dx,dy:this.dy,game:{width:this.game.width,height:this.game.height}})
                
                this.frameTimer=0;
            }
            else{
                // console.log("deltatime: ",deltatime)
                this.frameTimer+=deltatime;
            }
            

            this.angle=Math.atan2(this.dy-this.startY,this.dx-this.startX);
            this.x=this.startX+this.length*Math.cos(this.angle);
            this.y=this.startY+this.length*Math.sin(this.angle);
            this.bullets++
            // console.log("x: ",this.dx,"y: ",this.dy);

        }else{
            this.dx=0;
            this.dy=0;
            this.startX=0;
            this.startY=0;
        }
        
        this.checkcollision();
    }
    draw(context){
        
        // context.lineWidth = 1;
        // context.strokeStyle='white'
        // context.setLineDash([5,5]);
        // context.beginPath();
        // context.moveTo(this.startX,this.startY);
        // context.lineTo(this.dx,this.dy);
        // context.stroke();

        // context.beginPath();
        // context.moveTo(0,this.game.player.y+(this.game.player.width/2));
        // context.lineTo(this.game.width,this.game.player.y+(this.game.player.width/2));
        // context.stroke();
    }

    checkcollision(){
        
        this.game.enemies.forEach(enemy=>{
                if(this.dx<enemy.x+enemy.width &&
                   this.dx + this.width >enemy.x &&
                   this.dy<enemy.y+enemy.height &&
                   this.dy+ this.height >enemy.y
                ){
                    enemy.healthWidth+=-1;
                    if(enemy.healthWidth<0){
                        enemy.markerfordeletion = true;
                        this.game.deathAnimations.push(new Death(enemy.x,enemy.y));
                        console.log('working')
                    }
                    
                }
        })
    }
}