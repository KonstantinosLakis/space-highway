
function Enemy(){
  this.lane = Math.round(random(2));
  this.x = (this.lane - 1) * width / 3 + width / 2;
  this.y = -scl;
  var imgIndex = Math.round(random(enemyImages.length - 1));
  this.img = enemyImages[imgIndex];
  this.speed = random(enemySpeed, enemySpeed + 2);
  this.show = function(){
    image(this.img, this.x, this.y, scl, scl);
  }
  this.move = function(){
    this.y += this.speed;
  }
  this.die = function(){
    enemies.splice(enemies.indexOf(this), 1);
  }
  this.checkForDeath = function(){
    if (this.y > height){
      this.die();
    }
  }
}
