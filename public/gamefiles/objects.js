export class Obj{
    constructor(x,y,w,h,color){
        this.x=x;
        this.y=y;
        this.width=w;
        this.height=h;
        this.color=color
        this.flag=false;
    }

    update(deltatime){
       
        
    }
    draw(context){
        context.fillStyle=this.color;
        context.fillRect(this.x,this.y,this.width,this.height);
    }
}