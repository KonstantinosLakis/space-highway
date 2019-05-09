
function Player(){
  this.x = width / 2;
  this.y = height  - 2 * scl;
  this.hp = 100;
  this.speed = 10;
  this.lastTimeHit = 0;
  this.invincible = false;
  this.targetX = this.x;
  this.show = function(){
    rect(this.x + scl, this.y - scl, width / 10, height / 100);
    fill(0, 255, 0);
    rect(this.x + scl, this.y - scl, width / 10 *(this.hp / 100), height / 100);
    fill(255);
    if (this.invincible){
      fill(255, 0 ,0);
    }
    var angle = map(this.targetX - this.x, - width * 2 / 3, width * 2 / 3, - PI / 4, PI / 4);
    push();
    translate(this.x, this.y);
    rotate(angle);
    if(random(1) < 0.5 || !this.invincible)
    image(bikeImg, 0, 0, scl,  2 * scl);
    pop();
    fill(255);
  }
  this.target = 0;
  this.move = function(){
    this.targetX = this.target * width / 3 + width / 2;
    if (Math.abs(this.x - this.targetX) > this.speed){
      if (this.x > this.targetX){
        this.x -= this.speed;
      } else {
        this.x += this.speed;
      }
    }
  }
  this.avoidDeath = function(){
    if(frameCount - this.lastTimeHit < 2 * enemyStep){
      this.invincible = true;
    } else {
      this.invincible = false;
    }
  }
  this.checkForCollisions = function(){
    for(var i = 0; i < enemies.length; i ++){
      var e = enemies[i];
      if (Math.abs(this.x - e.x) < scl && !this.invincible){
        if (Math.abs(this.y - e.y) < scl){
          this.lastTimeHit = frameCount;
          e.die();
          this.hp = Math.max(0, this.hp - 33);
          if (this.hp == 0){
            playing = false;
            song.amp(0.2);
          }
          buzzer.play();
        }
      }
    }
  }
}
