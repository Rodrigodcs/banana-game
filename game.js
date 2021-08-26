
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
    player.x-=30
  }
  if(event.key === "ArrowRight"){
    console.log("DIREITA")
    player.x+=30
  }
})

let intervalId;

let score = 0;

let time =0;

let player = {
  x: screenWidth / 2,
  y: screenHeight * 3/4,
  radius: 50,
  color: "blue",
};

let fruits = []

let bombs = []

function spawnFruit(){
  const fruit = {
    x:Math.random()*screenWidth,
    y:0,
    radius:50,
    speedY:5,
    despawn:false,
  }
  const randomizer = Math.random()
  if(randomizer<0.3){
    //spawn orange
    fruit.color="orange"
    fruit.points= 5
  }else if(randomizer<0.6){
    //spawn maca
    fruit.color="pink"
    fruit.points= 10
  }else if(randomizer<0.8){
    //spawn melancia
    fruit.color="green"
    fruit.points= 20
  }else if(randomizer<0.95){
    //spawn morango
    fruit.color="red"
    fruit.points= 30
  }else{
    //spawn banana
    fruit.color="yellow"
    fruit.points= 200
  }
  fruits.push(fruit)
}

function spawnBomb(){
  const bomb = {
    x:Math.random()*screenWidth,
    y:0,
    radius:50,
    color:"black",
    speedY:5,
    despawn:false,
    points:-50,
  }
  bombs.push(bomb)
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
function drawnBombs() {
  bombs.forEach(b=>{
    drawCircle(b.x, b.y, b.radius, b.color)
  })
}

function updateFruits(){
  fruits.forEach(f=>{
    if(f.y>(screenHeight)){
      f.speedY=0
      f.despawn=true
    }
    f.y+=f.speedY
  })
}

function updateBombs(){
  bombs.forEach(b=>{
    if(b.y>(screenHeight)){
      b.speedY=0
      b.despawn=true
    }
    b.y+=b.speedY
  })
}

function checkFruitColisionWithPlayer(){
  let colided = false;
  fruits.forEach(fruit=>{
    const distance = Math.sqrt(
      (player.x - fruit.x) ** 2 + (player.y - fruit.y) ** 2
    );
    colided = distance < player.radius + fruit.radius
    if(colided){
      console.log(fruit.points)
      score+=fruit.points
      fruit.despawn=true;
      updateScore()
    }
  })
}

function checkBombColisionWithPlayer(){
  let colided = false;
  bombs.forEach(bomb=>{
    const distance = Math.sqrt(
      (player.x - bomb.x) ** 2 + (player.y - bomb.y) ** 2
    );
    colided = distance < player.radius + bomb.radius
    if(colided){
      score-=50
      bomb.despawn=true
      updateScore()
    }
  })
  return colided
}

function despawnFruits(){
  fruits = fruits.filter(fruit=> !fruit.despawn)
}

function despawnBombs(){
  bombs = bombs.filter(bomb=> !bomb.despawn)
}

function updateScore(){
  scoreUI.innerHTML="Score: "+score
}

function startGame() {
  
  clearInterval(intervalId);
  intervalId = setInterval(gameLoop, 1000 / 60);
}

function checkTime(){
  time++
  if(time%200===0){
    spawnFruit()
    spawnBomb()
  }
}


function gameLoop() {
  clearScreen()
  drawPlayer()
  drawnFruits()
  drawnBombs()
  updateFruits()
  updateBombs()
  checkFruitColisionWithPlayer()
  checkBombColisionWithPlayer()


  despawnFruits()
  despawnBombs()

  checkTime()
}

startGame();
   