const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { info } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Integration = Run when the client connects via frontend
io.on('connection', (socket) => {
    /* Triggers when somebody access the endpoint */
    console.log('We have a new connection!');

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);

        const error = true;
        
        if (error){        
            callback({error: 'error'});
        }
    });

    /* Triggers when somebody leaves the page or connection */
    socket.on('disconnect', () => {
        console.log('User have left!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));