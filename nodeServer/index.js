const express = require("express");
const app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http,{
	cors:
	{
		origin:"*",
	},
});
const users = {};

io.on("connection",(socket)=>{
	socket.on("new-user-joined",(name)=>{
		users[socket.id] = name;
		socket.broadcast.emit("user-joined",name);
	});
	socket.on("send",(message)=>{
		socket.broadcast.emit("receive",{message:message,name: users[socket.id]});
	});
	socket.on("disconnect",(message)=>{
		socket.broadcast.emit("left",{message:message,name:users[socket.id]});
		delete users[socket.id];
	});
});
app.get("/",(req,res)=>{
	res.send("<h1>Group chat application.</h1>");
});
http.listen(8888, () => {
	console.log("Server connect on port 8888");
})

