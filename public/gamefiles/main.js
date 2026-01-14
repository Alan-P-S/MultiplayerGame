import { Controller } from "./controller.js"

// import { Enemy } from "./enemies.js"
import { Network } from "./network.js"
import {Laser} from "./laser.js"
import { Player } from "./player.js"
import { Gun } from "./gun.js"
import { Obj } from "./objects.js"
import { BloodHit } from "./bloodhit.js"
const canvas = document.getElementById('canvas')
const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 500

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
 
const ctx = canvas.getContext('2d');

class Game {
    constructor() {
        this.width = CANVAS_WIDTH;
        this.height = CANVAS_HEIGHT;
        this.player = new Player(this);
        this.controller = new Controller();
        this.network = new Network(this);
        this.laser = new Laser(this);
        this.gun = new Gun(this);
        this.bloodhits =[];
        this.objects = [new Obj(250,250,100,100,''),new Obj(410,250,100,100,'grey'),new Obj(570,250,100,100,'grey'),new Obj(100,430,250,250,'grey')];
        this.enemies = [];
        this.deathAnimations = [];
        this.timer = 0;
        this.enemyInterval = 1000;
        this.bullets = [];
    }

    update(deltaTime) {
        //update bullets.
        this.bullets.forEach(b => {
            b.update();
        });
        this.player.update(this.controller.keys, deltaTime);
        this.laser.update(this.controller.click,deltaTime)
        this.network.update(deltaTime);
        //filter enemies,bullets,deathanimations
        this.bullets = this.bullets.filter(b => !b.markerfordeletion);
        this.enemies = this.enemies.filter(enemy => !enemy.markerfordeletion);
        this.deathAnimations = this.deathAnimations.filter(d => !d.markerfordeletion);
        this.bloodhits = this.bloodhits.filter(hits=>!hits.markerfordeletion);

        //update bloodhits,enemies,deathanimations
        this.bloodhits.forEach(hit=>{
            hit.update(deltaTime);
        })
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
        })
        this.deathAnimations.forEach(d => {
            d.update(deltaTime);
        })


       
        // if (this.timer > this.enemyInterval && Math.random() > 0.8) {
        //     this.timer = 0;
        //     this.bloodhits.push(new BloodHit(this));
        // }
        // else {
        //     this.timer += deltaTime;
        // }

        ///Gun update
        this.gun.update(this.controller.click);
        
    }

    draw(context) {
        this.player.draw(context);
        this.laser.draw(context);
        this.gun.draw(context);
        this.objects.forEach(o=>{o.draw(context)});
        this.bullets.forEach(b => {
            b.draw(context);
        })
        this.bloodhits.forEach(hit=>{
            hit.draw(context);
        })
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        })
        this.deathAnimations.forEach(d => {
            d.draw(context)
        })
        this.network.draw(context);
    }
}

const game = new Game();
let lasttime = 0
let deltatime = 0
function animate(timestamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   
    // console.log("time: "+deltatime);
    deltatime = timestamp - lasttime;
    lasttime = timestamp;
    game.update(deltatime);
    game.draw(ctx);
    requestAnimationFrame(animate);

}
console.log(18 % 18)
animate(0);