console.log("you have to manually start the serve");
console.log("goto projectName > nodeServer.\nnow run command \" nodemon \"")
const socket = io("http://localhost:8888");
var audio = new Audio("ting.mp3");
const form = document.getElementById("send-container");
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
let nameArr = [];

const name = prompt("Enter your name to join us!");
const appendDiv = (message,position)=>{
	const msgele = document.createElement("div");
	msgele.innerHTML=message;
	msgele.classList.add("message");
	msgele.classList.add(position);
	messageContainer.append(msgele);
	if(position=="left")
	{
		msgele.style.color="white";
		audio.play();
	}
	else
	{
		msgele.style.color="white";
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
	appendDiv(`${name??"someone"} joined the chat`,'center');
	nameArr.push(name);
	document.getElementById("names").innerHTML = nameArr
});
socket.on("receive",(data)=>{
	appendDiv(`${data.name}: ${data.message}`,'left');
});
socket.on("left",(data)=>{
	appendDiv(`${data.name??"someone"} Left the Chat`,'center');
	let index = nameArr.indexOf(data.name);
	nameArr.splice(index,1);
});

//just js
document.getElementById("leave").addEventListener("click",()=>
{
	alert("called");
	window.location.href="https://www.google.com";
});