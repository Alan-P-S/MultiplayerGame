import { Bullet } from "./bullet.js";
const socket = io();
export class Network{
    constructor(game){
        this.game = game;
        this.otherPlayerData = [];
        this.otherPlayerBulletData = [];
        this.image;
        this.id = Math.random()*60;
        this.bulletId;
        this.socket = socket;
        this.socket.on("players",e=>{       
            this.otherPlayerData[e.id]=e;
            
        })
        this.socket.on('bullets',e=>{
            // this.bulletId = Math.random()*100;
            // this.otherPlayerBulletData[e.id]=e;
            // console.log(this.otherPlayerBulletData);
            console.log('bullet recieved',e);
            this.game.bullets.push(new Bullet(e.x,e.y,e.dx,e.dy,e.game));
        })
        this.socket.on('playerDisconnect',(id)=>{
            this.otherPlayerData = this.otherPlayerData.filter(p=>p.id!==id);
        })
        this.fps = 20;
        this.frameInterval =1000/this.fps;
        this.frameTimer=0;
        this.maxFrame=11;
    }

    update(deltatime)
    {
        this.socket.emit('player',{
            id:this.socket.id,
            name:this.game.player.name,
            health:this.game.player.health,
            x:this.game.player.x,
            y:this.game.player.y,
            frameX:this.game.player.frameX,
            frameY:this.game.player.frameY,
            width:this.game.player.width,
            height:this.game.player.height,
            spriteWidth:this.game.player.spriteWidth,
            spriteHeight:this.game.player.spriteHeight,
            death:this.game.player.score,
            image:this.game.player.image.id,
        });
        
        ///the conditions include the interval between bullet and check player is pressing shooting key
        // this.game.bullets.forEach(b=>{
            //  this.socket.emit('bullet',{x:b.startX,y:b.startY,dx:b.dx,dy:b.dy,game:{width:b.game.width,height:b.game.height}})
        // })
        // if(this.game.laser.frameTimer>this.game.laser.frameInterval&&this.game.controller.keys.includes('ArrowUp')){
        //     this.socket.emit('bullet',{x:this.game.laser.startX,y:this.game.laser.startY,dx:this.game.laser.dx,dy:this.game.laser.dy,game:{width:this.game.width,height:this.game.height}});
        // } 
        
        if(this.frameTimer>this.frameInterval){
            this.frameTimer=0;
            if(this.frameX<this.maxFrame){
                this.frameX++;
            }
            else{
                this.frameX=0;
            }
        }else{
            this.frameTimer+=deltatime
        }
        this.game.bullets.forEach(b=>{
            Object.values(this.otherPlayerData).forEach(p=>{
                this.checkcollision(b,p);
                
            })
        })//check other player collision with the bullets..
    }
    
    draw(context)
    {
        Object.values(this.otherPlayerData).forEach(player=>{
            console.log(player);
            this.image=document.getElementById(player.image);
            context.drawImage(this.image,this.frameX*player.spriteWidth,player.frameY*player.spriteHeight,player.spriteWidth,player.spriteHeight,player.x,player.y,player.width,player.height);
            context.fillStyle='orange'
            context.fillRect(player.x,player.y,player.health,20)
            context.fillStyle='yellow';
            context.font='20px AmongusFont';
            context.fillText(`${player.name} ${player.death}`,player.x,player.y);
        })

        Object.values(this.otherPlayerBulletData).forEach(b=>{
            context.fillRect(b.x,b.y,b.width,b.height);
        })

    
         

    }
    checkcollision(bullet,player){
            
                if(player.x<bullet.x+bullet.width &&
                   player.x + player.width > bullet.x &&
                   player.y<bullet.y+bullet.height &&
                   player.y + player.height >bullet.y
                ){
                    console.log('collision');
                    bullet.markerfordeletion = true;
                }
            
            
    }
}