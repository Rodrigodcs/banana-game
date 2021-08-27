
const screenWidth = window.innerWidth>500?500:window.innerWidth;
const screenHeight = window.innerHeight-4;
const scoreUI = document.querySelector(".score")
const livesUI = document.querySelector(".lives")

const wrapper = document.querySelector(".wrapper")
const canvas = document.querySelector("#canvas");
canvas.width = screenWidth;
canvas.height = screenHeight;
const context = canvas.getContext("2d");

const sky = new Image();
sky.src="./assets/sky.png"

const ground = new Image();
ground.src="./assets/ground.png"

const alienLeft = new Image();
alienLeft.src="./assets/alien-left.png"

const alienRight = new Image();
alienRight.src="./assets/alien-right.png"

const banana = new Image();
banana.src="./assets/banana.png"

const orange = new Image();
orange.src="./assets/orange.png"

const apple = new Image();
apple.src="./assets/red-apple.png"

const watermelon = new Image();
watermelon.src="./assets/watermelon.png"

const strawberry = new Image();
strawberry.src="./assets/strawberry.png"

const bombSprite = new Image();
bombSprite.src="./assets/bomb.png"

document.querySelector('body').addEventListener("keydown",(event)=>{
  if(event.key === "ArrowLeft"){
    console.log("ESQUERDA")
    player.speedX =-0.08
    player.sprite=alienLeft
  }
  if(event.key === "ArrowRight"){
    console.log("DIREITA")
    player.speedX=0.08
    player.sprite=alienRight
  }
})

document.querySelector('body').addEventListener("keyup",()=>{
  player.speedX=0;
  player.accX=1
})

let intervalId;
let score = 0;
let lives = 4;
let time =0;

const player = new Player(screenWidth / 2,screenHeight * 5/6)
let fruits = []
let bombs = []

function drawBackground() {
  context.drawImage(sky,0, 0,canvas.width,canvas.height*5/6+35)
  context.drawImage(ground,0,canvas.height*5/6+35,canvas.width, canvas.height*1/6)
}

function drawFruits() {
  fruits.forEach(f=>{
    f.draw()
  })
}

function drawBombs() {
  bombs.forEach(b=>{
    b.draw()
  })
}

function updateFruits(){
  fruits.forEach(f=>{
    f.update()
  })
}

function updateBombs(){
  bombs.forEach(b=>{
    b.update()
  })
}

function checkFruitColisionWithPlayer(){
  fruits.forEach(f=>{
    f.checkColision(player)
  })
}

function checkBombColisionWithPlayer(){
  bombs.forEach(b=>{
    b.checkColision(player)
  })
}

function despawnFruits(){
  fruits = fruits.filter(fruit=> !fruit.despawn)
}

function despawnBombs(){
  bombs = bombs.filter(bomb=> !bomb.despawn)
}

function updateUI(score,lives){
  scoreUI.innerHTML="Score: "+score
  livesUI.innerHTML="Lives: "+lives
}

function startGame() {
  clearInterval(intervalId);
  intervalId = setInterval(gameLoop, 1000 / 60);
}

function checkTime(){
  time++
  if(time%200===0){
    fruits.push(new Fruit())
    fruits.push(new Fruit())
    bombs.push(new Bomb())
  }
}

function gameOver(){
  clearInterval(intervalId);
}

function gameLoop() {
  player.update()
  updateFruits()
  updateBombs()
  
  drawBackground()
  player.draw()
  drawFruits()
  drawBombs()
  
  checkFruitColisionWithPlayer()
  checkBombColisionWithPlayer()

  despawnFruits()
  despawnBombs()

  checkTime()
}

startGame();
   