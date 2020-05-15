const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getTheCurrentUser, userLeaves, getRoomUsers} = require('./utils/users');
//const main = require('./public/js/main');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chatt admin';

// Run when a client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username,room}) => {
        const user = userJoin(socket.id ,username,room);

        //Anslutning to the correct room
        socket.join(user.room);

        // Welcome current user
        socket.emit('message', formatMessage(botName,
            'welcome To my new chatt!'));

        // Broadcast to notiy when a user connects
        socket.broadcast.to(user.room)
        .emit('message', formatMessage(botName,
            ` ${user.username} has joined the chat`));

        // send users and room info
        io.to(user.room).emit('roomUsers' , {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        //msg = main.rc4(msg, main.key);
        const user = getTheCurrentUser(socket.id);
        io.to(user.room).emit('message',
        formatMessage( user.username, msg));
    });

    // This runs when the client disconnects
    socket.on('disconnect', () => {
        const user = userLeaves(socket.id);

        if(user) {
            io.to(user.room).emit('message', formatMessage(botName,
                `${user.username} has left the chat!`));
            // send users and room info
         io.to(user.room).emit('roomUsers' , {
            room: user.room,
            users: getRoomUsers(user.room)
         });
    }})
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
