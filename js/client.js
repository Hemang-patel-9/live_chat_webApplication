const socket = io("http://localhost:8000");

var audio = new Audio("ting.mp3");
const form = document.getElementById("send-container");
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const name = prompt("Enter your name to join us!");
const appendDiv = (message,position)=>{
	const msgele = document.createElement("div");
	msgele.innerHTML=message;
	msgele.classList.add("message");
	msgele.classList.add(position);
	messageContainer.append(msgele);
	if(position=="left")
	{
		audio.play();
	}
}
form.addEventListener("submit",(e)=>{
	e.preventDefault();
	const message = messageInput.value;
	appendDiv(`You: ${message}`,'right');
	socket.emit("send",message);
	messageInput.value="";
});
socket.emit("new-user-joined",name);

socket.on("user-joined",(name)=>{
	appendDiv(`${name} joined the chat`,'right');
});
socket.on("receive",(data)=>{
	appendDiv(`${data.name}:${data.message}`,'left');
});
socket.on("left",(data)=>{
	appendDiv(`${data.name} Left the Chat`,'left');
});