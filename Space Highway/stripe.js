
function Stripe(lane){
  this.x = width / 2 - width / 3 + width / 6 + lane * width / 3;
  this.y = -scl;
  this.die = function(){
    if (this.y > height + scl){
      stripes.splice(stripes.indexOf(this), 1);
    }
  }
  this.reallyDie = function(){
    stripes.splice(stripes.indexOf(this), 1);
  }
  this.show = function(){
    fill(255,0,255);
    rect(this.x, this.y, scl / 3, 2 * scl);
    fill(255);
  }
  this.move = function(){
    this.y += enemySpeed;
  }
}
