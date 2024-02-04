const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(`Yeni bir kullanıcı bağlandı: ${socket.id}`);
  
    socket.on('hareket', (data) => {
      console.log(`Hareket alındı: ${data.id} => X: ${data.x}, Y: ${data.y}, Z: ${data.z}`);
      socket.broadcast.emit('hareket', data);
    });
  
    socket.on('disconnect', () => {
      console.log(`${socket.id} kullanıcısı bağlantıyı kesti.`);
      io.emit('kullanici_cikti', { id: socket.id });
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});