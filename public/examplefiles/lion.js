const canvas = document.getElementById('canvas');
const CANVAS_WIDTH=window.innerWidth;
const CANVAS_HEIGHT=document.documentElement.clientHeight;
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
const data = document.getElementById('x');
const ctx = canvas.getContext('2d');
let animationId;
data.innerHTML='he';
let SensorX=0;
let SensorY=0;
const ufo=document.getElementById('ufo');
let player = {
    width:96,
    height:67,
    x:1,
    y:0,
}
window.addEventListener('deviceorientation',handleOrientation);
function handleOrientation(event){
    SensorX=event.gamma;
    SensorY=event.beta;
   
}

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    
    if(SensorX>0){
        if(player.x+player.width<=CANVAS_WIDTH ){player.x+=SensorX};
    }
    if(SensorX<0){
        if(player.x>0 ){player.x+=SensorX};
    }
    if(SensorY>0){
        if(player.y+player.height<=CANVAS_HEIGHT  ){player.y+=SensorY}
    }
    if(SensorY<0){
        if(player.y>0 ){player.y+=SensorY};
    }
    // player.y+=SensorY;
    ctx.fillStyle='black'
    ctx.drawImage(ufo,0,0,player.width,player.height,player.x,player.y,96,67);
    ctx.fillStyle='red';
    ctx.fillStyle='green';
   
     data.innerHTML=animationId;    
    animationId = window.requestAnimationFrame(animate);
    
}

function stopAnimation(){
    window.cancelAnimationFrame(animationId);
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    animationId=undefined;
}

function checkCollision(player,object){
    if(object.x<player.x+player.width &&
                   object.x + object.width > player.x &&
                   object.y<player.y+player.height &&
                   object.y + object.height >player.y){return true}


            
}

animate();