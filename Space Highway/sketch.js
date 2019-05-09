var scl = 50;
var player;
var score = 0;
var playing = true;
var enemySpeed = 8;
var enemyStep = 20;
var enemies = [];
var stripes = [];
var bikeImg;
var enemyImages = [];
var bg;
var gameOver;
var song;
var buzzer;
function preload(){
  bikeImg = loadImage('images/bike.png');
  for (var i = 0; i < 3; i ++){
    enemyImages.push(loadImage('images/enemy' + String(i) + '.png'));
  }
  bg = loadImage('images/bg.png');
  gameOver = loadImage('images/gameOver.png');
  song = loadSound('sounds/song.mp3');
  buzzer = loadSound('sounds/buzzer.wav');
}
function setup(){
  rectMode(CENTER);
  imageMode(CENTER);
  createCanvas(380, window.innerHeight - 10);
  player = new Player();
  buzzer.amp(0.5);
  song.loop();
}

function draw() {
  if (playing){
    textSize(26);
    score += enemySpeed / 100;
    enemySpeed += 1 / 300;
    spawnEnemies();
    translate(width / 2, height / 2);
    background(bg);
    translate(- width / 2, - height / 2);
    drawStripes();
    player.avoidDeath();
    player.move();
    player.show();
    player.checkForCollisions();
    for(var i = enemies.length - 1; i >= 0; i--){
      var e = enemies[i];
      e.checkForDeath();
      e.move();
      e.show();
    }
    stroke(255, 0 ,255);
    strokeWeight(1.5);
    text('Score : ' + String(Math.floor(score)), width / 20, height / 20);
 } else {
   translate(width / 2, height / 2);
   background(gameOver);
   translate(- width / 2, - height / 2);
 }
}

function keyTyped(){
  if ((key == 'a' || key == 'A')){
    player.target = Math.max(-1, player.target - 1);
  }
  if ((key == 'd' || key == 'D')){
    player.target = Math.min(1, player.target + 1);
  }
  if (key == ' ' && !playing){
    console.log('pressed');
    restart();
  }
}

function spawnEnemies(){
  if (frameCount % enemyStep == 0){
    enemies.push(new Enemy);
    stripes.push(new Stripe(0));
    stripes.push(new Stripe(1));
  }
}

function drawStripes(){
  for (var i = stripes.length - 1 ; i >= 0; i --){
    var s = stripes[i];
    s.die();
    s.move();
    s.show();
  }
}


function restart(){
  player.x = width / 2;
  player.hp = 100;
  player.targetX = width / 2;
  for (var i = enemies.length - 1; i >= 0; i --){
    enemies[i].die();
  }
  for (var i = stripes.length - 1; i >= 0; i --){
    stripes[i].reallyDie();
  }
  score = 0;
  playing = true;
  enemyStep = 20;
  enemySpeed = 8;
  song.amp(1);
}
