const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

let point1={x:100,y:100}
let point2={x:140,y:150}
let angle = 0;
angle = Math.atan2(point2.y-point1.y,point2.x-point1.x);
let length=0;

console.log(Math.cos(angle))
// console.log(angle*180/Math.PI)
function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.beginPath()
    ctx.moveTo(point2.x,point2.y);
    ctx.lineTo(point1.x,point1.y);
    ctx.stroke()
    let x = point1.x + length * Math.cos(angle);
    let y = point1.y + length * Math.sin(angle);
    
    length+=1
    ctx.fillRect(x,y,10,10);
    ctx.font="20px Arial"
    ctx.fillText(`y:${Math.floor(y)}`,10,20)
    ctx.fillText(`x:${Math.floor(x)}`,10,40)
    

    requestAnimationFrame(animate);
}

animate(0);