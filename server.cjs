const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const readline = require('readline');
const tailFile = require('tail-file');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
      cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});

const filePath = '~/Desktop/Fun/mad_market_maker/service/abci_build/persistent_data/logs/aea_0.txt';

// Serve the HTML file for testing the WebSocket connection
const TailFile = require('@logdna/tail-file');
const tail = new TailFile(filePath)

var cors = require('cors');
app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected');


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


// we return index.html

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}
);
// we watch the file
// we broadcast the new line to all the connected clients

tail.on('data', (data) => {
    const string = data.toString().trim();
    // we split on new line and emit each line
    string.split('\n').forEach((line) => {
        console.log("Emitting line")
        console.log(line);
        io.emit('line', line);
    });
}
);

// we start the server making sure to enable cors

// we enable cors as so; 



// we start the server




server.listen(8080, () => {
    console.log(`Listening on port 8080`);
    tail.start().catch((err) => {
    console.error('Cannot start tailing. Does the file exist?', err);
  });
}

);
