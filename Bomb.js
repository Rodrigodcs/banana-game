class Bomb extends Autonomous{
  constructor(){
    super(Math.random()*(screenWidth-60)+30)
    this.accY=1
    this.speedY=Math.random()*2+3;
    this.radius=30
    this.spriteXOffset=-40;
    this.spriteYOffset=-80;
    this.spriteWidth=120;
    this.spriteLength=120;
    this.sprite=bombSprite;
  }
  
  update(){
    if(this.y>(screenHeight)){
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
      gameOver()
    }
  }
}