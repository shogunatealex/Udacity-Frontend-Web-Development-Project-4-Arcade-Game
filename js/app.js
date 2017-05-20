// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.possibleY = ["100", "200", "300"];
    this.possibleSpeed = ["300", "400", "200"]
    this.speed = speed;
    this.changeImage = 0;
    this.currentSprite = "images/riku1.png";
    this.sprites = ["images/riku1.png", "images/riku2.png", "images/riku3.png", "images/riku4.png", "images/riku5.png"];
    this.image = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.changeImage += 1;
    if (this.changeImage % 5 == 0){
      this.image = (this.image  + 1) % 5 ;
    }
    this.currentSprite = this.sprites[this.image];
    this.x += (this.speed * dt);
    if(this.x >= 600){
      this.y = this.possibleY[Math.floor((Math.random() * 3))];
      this.speed = this.possibleSpeed[Math.floor((Math.random() * 3))];
      this.x = -200;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.currentSprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 300;
    this.y = 200;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.changeImage = 0;
    this.currentSprite = "images/riku1.png";
    this.sprites = ["images/riku1.png", "images/riku2.png", "images/riku3.png", "images/riku4.png", "images/riku5.png"];
    this.image = 0;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy = new Enemy(-100, 100, 300);
var enemy2 = new Enemy(-200, 200, 300);
var enemy3 = new Enemy(-100, 200, 200);
var enemy4 = new Enemy(-300, 200, 400);
var enemy5 = new Enemy(-100, 100, 200);
var enemy6 = new Enemy(-100, 300, 200);
var allEnemies = [enemy, enemy2, enemy3, enemy4];

// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
