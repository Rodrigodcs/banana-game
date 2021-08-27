
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
    player.image=alienLeft
  }
  if(event.key === "ArrowRight"){
    console.log("DIREITA")
    player.speedX=0.08
    player.image=alienRight
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

const backGround = "white"

let intervalId;

let score = 0;

let lives = 4;

let time =0;

class Player{
  x;
  y;
  speedX=0;
  accX=1;
  radius=30;
  image=alienRight;
  color=backGround;
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  draw() {
    context.drawImage(this.image,this.x-30, this.y-50,60,100)
  }
  update(){
    this.x=this.x+this.speedX*this.accX
    if(this.x<30){
      this.x=30
    }
    if(this.x>screenWidth-30){
      this.x=screenWidth-30
    }
    if(this.speedX!==0){
      this.accX+=4
    }
  }
}

class Fruit{
  x=Math.random()*(screenWidth-60)+30
  y=0
  radius=30
  color=backGround
  speedY=Math.random()*2+3
  accY=1
  despawn=false
  constructor(){
    const randomizer = Math.random()
    if(randomizer<0.3){
      this.image=orange
      this.points= 5
    }else if(randomizer<0.6){
      this.image=apple
      this.points= 10
    }else if(randomizer<0.8){
      this.image=watermelon
      this.points= 20
    }else if(randomizer<0.95){
      this.image=strawberry
      this.points= 30
    }else{
      this.image=banana
      this.points= 200
    }
  }
  drawn() {
    context.drawImage(this.image,this.x-30, this.y-30,60,60)
  }
  update(){
    if(this.y>(screenHeight)){
      lives--
      updateLives()
      if(lives<=0){
        gameOver()
      }
      this.speedY=0
      this.despawn=true
    }
    this.y+=this.speedY*this.accY
    this.accY+=0.01
  }
  checkColision(player){
    const distance = Math.sqrt(
      (player.x - this.x) ** 2 + (player.y - this.y) ** 2
    );
    if(distance < player.radius + this.radius){
      console.log(this.points)
      score+=this.points
      this.despawn=true;
      updateScore()
    }
  }
}

const player = new Player(screenWidth / 2,screenHeight * 5/6)

let fruits = []

let bombs = []

function spawnBomb(){
  const bomb = {
    x:Math.random()*(screenWidth-60)+30,
    y:0,
    radius:30,
    color:backGround,
    image: bombSprite,
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
  context.drawImage(sky,0, 0,canvas.width,canvas.height*5/6+35)
  context.drawImage(ground,0,canvas.height*5/6+35,canvas.width, canvas.height*1/6)
}

function drawPlayer() {
  context.drawImage(playerImage,player.x-30, player.y-50,60,100)
}

function drawnFruits() {
  fruits.forEach(f=>{
    f.drawn()
  })
}

function drawnBombs() {
  bombs.forEach(b=>{
    context.drawImage(b.image,b.x-40, b.y-80,120,120)
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
    f.update()
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
    fruit.checkColision(player)
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

function updateLives(){
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
    spawnBomb()
    spawnBomb()
  }
}



function gameOver(){
  clearInterval(intervalId);
console.log("PERDEUUU")}


function gameLoop() {
  player.update()
  updateFruits()
  updateBombs()
  

  clearScreen()
  player.draw()
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
   