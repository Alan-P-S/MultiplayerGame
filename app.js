// curl -k https://localhost:8000/
import http from 'http'
import fs from 'fs'
import express from 'express'
import {Server} from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
  res.render('index');
})
app.get('/scoreboard',(req,res)=>{
  res.render('scoreboard');
})
app.get('/angle',(req,res)=>{
  res.render('angle');
})
app.get('/lion',(req,res)=>{
  res.render('lion');
})



app.get('/image',(req,res)=>{
    const imagePath = path.join(__dirname,'images','bullet.png');
    res.sendFile(imagePath,(err)=>{if(err){console.log('Error in image');res.status(404).send('Image not found')}});
})

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'), ///for https server
// };

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on('connection',socket=>{
  console.log(socket.id);
  socket.on('player',(e)=>{
    socket.broadcast.emit('players',e);
  })
  socket.on('bullet',(e)=>{
    console.log(e);
    socket.broadcast.emit('bullets',e);
  })

  socket.on('disconnect',()=>{
    console.log('Disconnected: ',socket.id);

    io.emit('playerDisconnect',socket.id)
  })
})



httpServer.listen(5000,()=>{
  console.log("Server started: 5000");
})