
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const scoreUI = document.querySelector(".score")

const wrapper = document.querySelector(".wrapper")
const canvas = document.querySelector("#canvas");
canvas.width = screenWidth;
canvas.height = screenHeight;
const context = canvas.getContext("2d");

document.querySelector('body').addEventListener("keydown",(event)=>{
  if(event.key === "ArrowLeft"){
    console.log("ESQUERDA")
    player.x-=10
  }
  if(event.key === "ArrowRight"){
    console.log("DIREITA")
    player.x+=10
    spawnFruit()
  }
})

let intervalId;

let score = 0;

let player = {
  x: screenWidth / 2,
  y: screenHeight * 3/4,
  radius: 100,
  color: "red",
};

let fruits= []

function spawnFruit(){
  const fruit = {
    x:Math.random()*screenWidth,
    y:0,
    radius:50,
    color:"blue",
  }
  fruits.push(fruit)
}

function drawCircle(x, y, radius, color) {
  context.beginPath();
  context.fillStyle = color;
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

function clearScreen() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  drawCircle(player.x, player.y, player.radius, player.color);
}

function drawnFruits() {
  fruits.forEach(f=>{
    drawCircle(f.x, f.y, f.radius, f.color)
  })
}

function updateFruits(){
  fruits.forEach(f=>{
    f.y+=5
  })
}

function fruitColisionWithPlayer(fruit){
  const distance = Math.sqrt(
    (player.x - fruit.x) ** 2 + (player.y - fruit.y) ** 2
  );
  return distance < player.radius + fruit.radius
}

function distanceFromPlayer(fruit){
  const distance = Math.sqrt(
    (player.x - fruit.x) ** 2 + (player.y - fruit.y) ** 2
  );
}

function startGame() {
  
  clearInterval(intervalId);
  intervalId = setInterval(gameLoop, 1000 / 60);
}


function gameLoop() {
  clearScreen()
  drawPlayer()
  drawnFruits()
  updateFruits()
  console.log(fruits)
}

startGame();
   