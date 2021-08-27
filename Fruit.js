class Fruit extends Autonomous{
  points;
  constructor(){
    super(Math.random()*(screenWidth-60)+30)
    this.radius=30;
    this.speedY=Math.random()*2+3
    this.accY=1
    this.spriteXOffset=-30;
    this.spriteYOffset=-30;
    this.spriteWidth=60;
    this.spriteLength=60;
    const randomizer = Math.random()
    if(randomizer<0.3){
      this.sprite=orange
      this.points= 5
    }else if(randomizer<0.6){
      this.sprite=apple
      this.points= 10
    }else if(randomizer<0.8){
      this.sprite=watermelon
      this.points= 20
    }else if(randomizer<0.95){
      this.sprite=strawberry
      this.points= 30
    }else{
      this.sprite=banana
      this.points= 100
    }
  }
  
  update(){
    if(this.y>(screenHeight)){
      lives--
      updateUI(score,lives)
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
      if(this.points!==100){
        score+=this.points
      }else{
        score*=2
      }
      this.despawn=true;
      updateUI(score,lives)
    }
  }
}