class Character{
  x;
  y;
  radius;
  sprite;
  spriteXOffset=0;
  spriteYOffset=0;
  spriteLength=0;
  spriteWidth=0;
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  draw() {
    context.drawImage(this.sprite,this.x+this.spriteXOffset, this.y+this.spriteYOffset,this.spriteWidth,this.spriteLength)
  }
}