export class Controller{
    constructor(game){
        this.game = game;
        this.keys = [];
        this.click=[];
        window.addEventListener('keydown',(e)=>{
            if((e.key=='ArrowUp' || 
                e.key=='ArrowDown' ||
                e.key=='ArrowLeft' ||
                e.key=='ArrowRight' ||
                e.key=='w' ||
                e.key=='a'||
                e.key=='s'||
                e.key=='d' ||
                e.key=='Shift'||
                e.key=='r')&&this.keys.indexOf(e.key)===-1){
                this.keys.push(e.key);
                
                
            }
        });
        window.addEventListener('keyup',(e)=>{
            console.log(e.key)
            if((e.key=='ArrowUp' || 
                e.key=='ArrowDown' ||
                e.key=='ArrowLeft' ||
                e.key=='ArrowRight' ||
                e.key=='w' ||
                e.key=='a'||
                e.key=='s'||
                e.key=='d' ||
                e.key=='Shift'||
                e.key=='r')){
                    this.keys.splice(this.keys.indexOf(e.key),1);
                }
        })
        document.getElementById('canvas').addEventListener('mousemove',(e)=>{
            this.click.splice(0,1);
            this.click.push(e);
            
            // console.log("Mouse down",this.click)
        })
        document.getElementById('canvas').addEventListener('mousedown',(e)=>{
            if(this.keys.indexOf('click')==-1){
                this.keys.push('click');
            }
        })
        document.getElementById('canvas').addEventListener('mouseup',(e)=>{
                this.keys.splice(this.keys.indexOf('click'),1);
            
        })
    }
}
