export class Gun{
    constructor(game){
        this.game=game,
        this.x=this.game.player.x;
        this.y=this.game.player.y;
        this.width=50;
        this.height=50;
        this.spriteWidth=150;
        this.spriteHeight=150;
        this.angle=0;
        this.dx=0;
        this.dy=0;
        this.image=document.getElementById('gun');
    }

    update(input){
        if(input.length>0){
            this.dx=input[0].offsetX;
            this.dy=input[0].offsetY;
            this.x=(this.game.player.x+25+this.game.player.width/2)-25;
            this.y=(this.game.player.y+25+this.game.player.height/2)-20;
            this.angle = Math.atan2(this.dy-this.y,this.dx-this.x);
        }
        
    }
    draw(context){
        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.angle);
        context.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight,this.x-(this.game.player.x+25+this.game.player.width/2),this.y-(this.game.player.y+25+this.game.player.height/2),this.width,this.height);
        context.restore();
    }
}