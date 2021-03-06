class Player extends Character{
  speedX=0;
  accX=1;
  constructor(x,y){
    super(x,y)
    this.radius=30,
    this.sprite=alienRight;
    this.spriteXOffset=-30;
    this.spriteYOffset=-50;
    this.spriteWidth=60;
    this.spriteLength=100;
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