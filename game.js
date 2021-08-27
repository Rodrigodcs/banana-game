
const screenWidth = window.innerWidth>500?500:window.innerWidth;
const screenHeight = window.innerHeight-4;
const scoreUI = document.querySelector(".score")

const wrapper = document.querySelector(".wrapper")
const canvas = document.querySelector("#canvas");
canvas.width = screenWidth;
canvas.height = screenHeight;
const context = canvas.getContext("2d");

document.querySelector('body').addEventListener("keydown",(event)=>{
  if(event.key === "ArrowLeft"){
    console.log("ESQUERDA")
    player.speedX =-0.08
  }
  if(event.key === "ArrowRight"){
    console.log("DIREITA")
    player.speedX=0.08
  }
})
document.querySelector('body').addEventListener("keyup",()=>{
  console.log("soltou")
  player.speedX=0;
  player.accX=1
})

canvas.addEventListener("click",(event)=>{
  console.log(event)
})

let intervalId;

let score = 0;

let time =0;

let player = {
  x: screenWidth / 2,
  y: screenHeight * 5/6,
  speedX: 0,
  accX: 1,
  radius: 30,
  color: "blue",
};

let fruits = []

let bombs = []

function spawnFruit(){
  const fruit = {
    x:Math.random()*(screenWidth-60)+30,
    y:0,
    radius:30,
    speedY:Math.random()*2+3,
    accY:1,
    despawn:false,
  }
  const randomizer = Math.random()
  if(randomizer<0.3){
    fruit.color="orange"
    fruit.points= 5
  }else if(randomizer<0.6){
    fruit.color="pink"
    fruit.points= 10
  }else if(randomizer<0.8){
    fruit.color="green"
    fruit.points= 20
  }else if(randomizer<0.95){
    fruit.color="red"
    fruit.points= 30
  }else{
    fruit.color="yellow"
    fruit.points= 200
  }
  fruits.push(fruit)
}

function spawnBomb(){
  const bomb = {
    x:Math.random()*(screenWidth-60)+30,
    y:0,
    radius:30,
    color:"black",
    speedY:Math.random()*2+3,
    accY:1,
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

function Image(){
  context.drawImage(image,canvas.width/2, canvas.height/2)
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

function updatePlayer(){
  player.x=player.x+player.speedX*player.accX
  if(player.x<30){
    player.x=30
  }
  if(player.x>screenWidth-30){
    player.x=screenWidth-30
  }
  if(player.speedX!==0){
    player.accX+=4
  }
}

function updateFruits(){
  fruits.forEach(f=>{
    if(f.y>(screenHeight)){
      f.speedY=0
      f.despawn=true
    }
    f.y+=f.speedY*f.accY
    f.accY+=0.01
  })
}

function updateBombs(){
  bombs.forEach(b=>{
    if(b.y>(screenHeight)){
      b.speedY=0
      b.despawn=true
    }
    b.y+=b.speedY*b.accY
    b.accY+=0.01
  })
}

function checkFruitColisionWithPlayer(){
  fruits.forEach(fruit=>{
    const distance = Math.sqrt(
      (player.x - fruit.x) ** 2 + (player.y - fruit.y) ** 2
    );
    if(distance < player.radius + fruit.radius){
      console.log(fruit.points)
      score+=fruit.points
      fruit.despawn=true;
      updateScore()
    }
  })
}

function checkBombColisionWithPlayer(){
  let colided = false
  bombs.forEach(bomb=>{
    const distance = Math.sqrt(
      (player.x - bomb.x) ** 2 + (player.y - bomb.y) ** 2
    );
    if(distance < player.radius + bomb.radius){
      console.log("BOOOMBAAA")
      colided = true
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
    spawnFruit()
    spawnFruit()
    spawnBomb()
    spawnBomb()
  }
}



function gameOver(){
  clearInterval(intervalId);
console.log("PERDEUUU")}


function gameLoop() {
  updatePlayer()
  updateFruits()
  updateBombs()

  clearScreen()
  drawPlayer()
  drawnFruits()
  drawnBombs()

  checkFruitColisionWithPlayer()
  if(checkBombColisionWithPlayer()){
    gameOver()
  }

  despawnFruits()
  despawnBombs()

  checkTime()
}

startGame();
   