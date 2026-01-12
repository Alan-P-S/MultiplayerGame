import { Bullet } from "./bullet.js";
import { BloodHit } from "./bloodhit.js";
export class Player{
    constructor(game){
        this.game = game
        this.image= document.getElementById('player');
        this.name = window.prompt('Enter Your name');
        this.speed = 0.15;
        this.frameX=0;
        this.frameY=2;
        this.maxFrame=11;
        this.recoil = 0.15;
        this.bullets = 40;
        this.bulletover = false;
        this.fps = 20;
        this.frameInterval =1000/this.fps;
        this.frameTimer=0;
        this.collied=false;
        this.x = 0;
        this.y = 0;
        this.vy=0;
        this.weight=1;
        this.spriteWidth =178;
        this.spriteHeight =221;
        this.width = 60;
        this.height = 60;
        this.health=100;
        this.score=0;
    }

    update(input,deltatime){

        this.oldx = this.x;
        this.oldy=this.y;
        if(input.length==0){this.frameY=2;this.maxFrame=0;}else{this.maxFrame=11;}
        if(this.x+this.width>=this.game.width){
            this.x=this.x;
        }else{
            if(input.includes('d')){this.x+=this.speed*deltatime;this.frameY=0;}
        }
        if(this.y+this.height>=this.game.height){
            this.y=this.y;
        }else{
            if(input.includes('s')) {this.y+=this.speed*deltatime;this.frameY=0}
        }
        if(this.x<=0){
            this.x=this.x;
        }else{
            if(input.includes('a') ){this.x-=this.speed*deltatime;this.frameY=1;}
            
        }
        if(this.y<=0){
            this.y=this.y;
        }else{
            if(input.includes('w')) {this.y-=this.speed*deltatime;this.frameY=0}
        }
        
        //vertical movement
        // this.y+=this.vy;
        
        
        
        if(!this.onGround()){
            this.vy+=this.weight;
        }
        else{
        this.vy=0;
        }
      
        if(this.y>this.game.height-this.height) this.y=this.game.height-this.height
       
        
        if(input.includes('r') && this.bullets==0){
                    this.bullets=50;
                    console.log(this.bullets)
        }

        if(input.includes('Shift')){
            this.speed=0.30;
        }else{this.speed=0.15}
        

        ///animation update
        if(this.frameTimer>this.frameInterval){
            this.frameTimer=0;
            if(this.frameX<this.maxFrame){
            this.frameX++;
            }
            else{
            this.frameX=0;
            }
        }else{
            this.frameTimer+=deltatime;
        }
        this.game.objects.forEach(o=>{o.update()})
        this.game.objects.forEach(o=>{this.checkCollision(o)});
        this.game.bullets.forEach(bullet=>{this.checkbulletCollision(bullet)});
    }

    draw(context){
        
        // context.strokeRect(this.x,this.y,this.width,this.height)
        context.fillStyle='blue';
        context.fillRect(this.x-25,this.y,this.health,20);
        context.drawImage(this.image,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
        context.fillStyle='white';
        context.font='20px AmongusFont'
        context.fillText(`${this.name} ${this.score}`,this.x,this.y);
        // context.fillRect(this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }

    onGround(){
        return ( this.y+this.height >= this.game.height );
    }

    checkCollision(object)
    {
        if(object.x<this.x+this.width &&
                   object.x + object.width > this.x &&
                   object.y<this.y+this.height &&
                   object.y + object.height >this.y
        ){
                this.collied=true;  
                this.resolveCollision(object);    
        }else{
            this.collied=false;
        }
    }
    resolveCollision(object){
        var vectorX,vectorY;

        vectorX = (object.x+object.width*0.5) - (this.x+this.width*0.5);
        vectorY = (object.y+object.height*0.5) - (this.y+this.height*0.5);

        if(vectorY * vectorY > vectorX * vectorX){

            if(vectorY>0){
                
                this.y=object.y-this.height;
            }
            else{
                this.y = object.y+object.height;
            }
        }
        else{
            if(vectorX>0){
                this.x=object.x-this.width;
            }
            else{
                this.x=object.x+object.width;
                
            }
        }
    }

    checkbulletCollision(bullet){
        if(bullet.x<this.x+this.width &&
                   bullet.x + bullet.width > this.x &&
                   bullet.y<this.y+this.height &&
                   bullet.y + bullet.height >this.y
        ){
            console.log(`bulletX:${bullet.x}`,`bulletY:${bullet.y}`,`bulletW:${bullet.width}`,`bulletH:${bullet.height}`)
            console.log(`playerX:${this.x}`,`playerY:${this.y}`,`playerW:${this.width}`,`playerH:${this.height}`)
            console.log('health decreased')
            this.health-=1;
            this.game.bloodhits.push(new BloodHit(this.game));
            if(this.health<=0)
            {
                this.health=100;
                this.score+=1;
                // this.x=0;
                // this.y=0;
            }
            bullet.markerfordeletion = true;
        }
        this.game.objects.forEach(obj=>{
            if(bullet.x<obj.x+obj.width &&
                   bullet.x + bullet.width > obj.x &&
                   bullet.y<obj.y+obj.height &&
                   bullet.y + bullet.height >obj.y){
                    bullet.markerfordeletion=true;
                   }
        })
    }

}