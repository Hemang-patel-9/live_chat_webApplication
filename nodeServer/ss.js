// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
	console.log('User connected');

	socket.on('chat-message', (message) => {
		// Handle incoming chat messages
		io.emit('chat-message', message); // Broadcast the message to all connected clients
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(3000, () => {
	console.log('Server listening on port 3000');
});