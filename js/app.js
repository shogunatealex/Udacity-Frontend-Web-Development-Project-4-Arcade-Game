// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // used to randomly place the evil rikus
    this.possibleY = ["118", "201", "284"];
    // used to determine their speed from random
    this.possibleSpeed = ["300", "400", "200", "500"]
    // their speed
    this.speed = speed;
    // used to slow the changing of the sprite for a better animation
    this.changeImage = 0;
    // the current sprite shown

    this.currentSprite = "images/riku1.png";

    // the possible sprites that can be used, used for animating the runs
    this.sprites = ["images/riku1.png", "images/riku2.png", "images/riku3.png", "images/riku4.png", "images/riku5.png"];

    // used to select the image from the this.sprites array
    this.image = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // update the change image by one
    this.changeImage += 1;
    // every 5 iterations, change the sprite image
    if (this.changeImage % 5 == 0){
      this.image = (this.image  + 1) % 5 ;
    }
    // set the sprite to the selected sprite
    this.currentSprite = this.sprites[this.image];
    // move it its speed * the dt predetermined
    this.x += (this.speed * dt);
    // if riku reaches the end of the screen reset his speed to random and his position to random
    if(this.x >= 600){
      this.y = this.possibleY[Math.floor((Math.random() * 3))];
      this.speed = this.possibleSpeed[Math.floor((Math.random() * 4))];
      this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.currentSprite), this.x, this.y);
};


var Player = function() {
    // holds whether sora won or not
    this.win = 0;
    // controls his death animation
    this.animation = 0;
    // determines if any direction key has been selected

    this.left = 0;
    this.right = 0;
    this.up = 0;
    this.down = 0;
    // his starting position
    this.x = 230;
    this.y = 450;

    // holds whether sora is dead or not
    this.dead = 0;

    // used as with enemy, to make animation run smoother
    this.changeImage = 0;
    // the current sprite sora uses
    this.currentSprite = "images/sora.png";

    // his dead animation sprites
    this.deadSprites = ["images/soradead1.png", "images/soradead2.png", "images/soradead3.png", "iamges/soradead4.png"];

    // used to select the image frome the deadSprites
    this.image = 0;
};

Player.prototype.handleInput = function(key){
    // checks if sora will run off the screen if not, sets the flag
    if(key == "left"){
      if(this.x - 101 < 0){

      }
      else{
            this.left = 1;
      }
    }
    else if(key == "right"){
      if (this.x + 101 > 500){

      }
      else{
            this.right = 1;
      }

    }
    else if (key == "up"){
      if(this.y - 83 < 83){
        player.win = 1;
      }
      else{
        this.up = 1;
      }

    }
    else if( key == "down"){
      if(this.y + 83 > 450){

      }
      else{
        this.down = 1;
      }
    }
    // if sora is dead and "c" is pressed it will reset him
    else if(key == "continue" && player.dead == 1){
      player.dead = 0;
      player.currentSprite = "images/sora.png";
    }
}
// draws sora
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.currentSprite), this.x, this.y);
}

Player.prototype.update = function(){
  // if sora is dead run through his death animation and reset his position to start
  if (player.dead == 1){
    this.changeImage += 1;
    if(this.changeImage % 20 == 0){
      this.animation = (this.animation + 1) % 3;
      this.currentSprite = this.deadSprites[this.animation];
    }
    this.x = 230;
    this.y = 450;
  }
  // if the direction flags are up, then move in that direction
  if(this.left == 1){
    this.x -= 101;
    this.left = 0;
  }
  else if(this.right == 1){
    this.x += 101;
    this.right = 0;
  }
  else if (this.up == 1){
    this.y -= 83;
    this.up = 0;
  }
  else if (this.down == 1){
    this.y += 83;
    this.down = 0;
  }
}

// Now instantiate your objects.
var enemy = new Enemy(-100, 118, 300);
var enemy2 = new Enemy(-200, 201, 300);
var enemy3 = new Enemy(-100, 201, 200);
var enemy4 = new Enemy(-300, 201, 500);
var enemy5 = new Enemy(-100, 118, 200);
var allEnemies = [enemy, enemy2, enemy3, enemy4, enemy5];

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        67: 'continue'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
