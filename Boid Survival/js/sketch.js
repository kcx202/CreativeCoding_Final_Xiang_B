let timer = 5000;
let score = 0;
let hunterset = [];
let foodset = [];
var boom = null;
let hunterNum = 1; // Starting number of hunters
let hunterSeperation = 2; // Distance between hunters
let hunterForce = 1;
let hunterSpace =20;
var temp = 0;
let menu = 0; // State of screen
let spawnRate = 2500; // Time delay for hunters spawns


function setup() {
  createCanvas(1000, 550);
	boxset = new Group();
  moveUp = false;
  moveDown = false;
  moveRight = false;
  moveLeft = false;
  p1 = new player(); // Creates the player object
  for (let i = 0; i < hunterNum; i++) { // spawns the starting number of hunters
    hunterspawn();
  }
}

function draw() {
  background(90,177,187); //Draws the background and all the buttons
  fill(30,39,73);
  rect(50, 100, 200, 75,25,25);
  fill(39,52,105);
  rect(50, 250, 200, 75,25,25);
  fill(48,52,63);
  rect(50, 400, 200, 75,25,25);
  textSize(50)
  fill(255);
  textAlign(CENTER);
  text('START', 150, 155);
  textSize(26);
  text('INSTRUCTIONS', 150, 300);
  textSize(35);
  text('Settings', 150, 450);
  textSize(70);
  text('COOL GAME', 600, 200);
  text('TITLE', 600, 300);
  textSize(15);
  text('and a really awesome description that follows that shows wittiness and creativity', 600, 350);
  text('by Kevin Xiang', 600, 380);
  textAlign(LEFT);


  if (menu == 1) { // gamescreen
    gameloop();
    if (mouseButton == RIGHT) {
      menu = 0
    }
  }
  if (menu == 2) { //instruction screen
    background(129, 141, 146)
    textSize(20)
    textAlign(CENTER);
    text('Press ENTER to return to main menu', width/2, 30)
    textAlign(LEFT);
    textSize(30)
    text('1. You are being hunted. Flee from the hunters.', 50, 150)
    text('2. Move your ship using arrow keys to avoid them as long as you can', 50, 200)
    text('3. Collect orbs to destroy the hunters and earn bonus points!', 50, 250)
    text('4. Survive.', 50, 300)
  }
  if (menu == 3) { // death screen
    background(228,87,46)
    textSize(75)
    textAlign(CENTER)
    text('U ded lol', width/2, height / 2)
    textSize(20)
    text('Better luck next time.', width/2, 30)
    text('Score:'+score, width/2, height / 2 + 50)
    text('Press ENTER for main menu or SPACEBAR to play again', width/2, height-50)
  }
  if (menu == 4) { // settings screen
    background(129, 141, 146)
    textAlign(CENTER);
    rectMode(CENTER);
    fill(30,39,73);
    rect(width/2, 130, 200, 80,25,25);
    fill(39,52,105);
    rect(width/2, 250, 200, 80,25,25);
    fill(48,52,63);
    rect(width/2, 370, 200, 80,25,25);
    fill(255);
    textSize(40)
    text('NORMAL', width/2, 145);
    textSize(40)
    text('HARD', width/2, 265);
    textSize(30)
    fill(220,3,3);
    text('NIGHTMARE', width/2, 385);
    fill(255);
    textSize(20)
    text('Press ENTER to return to main menu', width/2, 30)
    if (mouseButton == RIGHT) {
      reset();
      menu = 0
    }
  }
}

function mouseClicked() { // Button interaction on main screen
  if (menu == 0) {
    if (mouseX < 200 && mouseX > 50) {
      if (mouseY < 175 && mouseY > 100) {
        reset();
        menu = 1
      }
      if (mouseY < 325 && mouseY > 250) {
        menu = 2
      }
      if (mouseY < 475 && mouseY > 400) {
        menu = 4
      }
    }
  }
  if (menu == 4) {
    if (mouseX < width/2+100 && mouseX > width/2-100) {
      if (mouseY > 90 && mouseY < 170) {
        reset();
        spawnRate = 2500
        menu = 0
      }
      if (mouseY > 210 && mouseY < 290) {
        reset();
        spawnRate = 1500
        menu = 0
      }
      if (mouseY > 330 && mouseY < 410) {
        reset();
        spawnRate = 500
        menu = 0
      }
    }
  }
}

function gameloop(){ //Code for the main game loop
  background(25);
  if (millis() >= spawnRate+timer) {
    hunterspawn();
    if (foodset.length < 1){
      foodset.push(new food(random(50,width-50), random(50,height-50)));
    }
    // this line is for killing hunters
		// hunterset.shift();
    score = score + 10;
    text(score,20,20);
    timer = millis();

  }
  //  if (Math.floor(millis()/1000)*1000 % 10000 === 0) {
  //  print(Math.floor(millis()/1000)*1000);
  // foodset.push(new food(spawnWidth, spawnHeight));
  //} been trying to get food to spawn, not working

  controls();
  scoreCounter();

  let playerLoc = createVector(p1.position.x, p1.position.y);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);

  // Call the appropriate steering behaviors for our agents
  for (let v of hunterset) {
    v.applyBehaviors(hunterset,playerLoc);
    v.update();
    v.borders();
    v.display();
  }
  for (let v of foodset) {
    v.display();
  }
  if (boom != null) {
    boom.update();
  }
  p1.update();
  p1.move();
  p1.display();
  p1.borders();

}

function scoreCounter() { // Score counter function, adds based on time and orbs
  if (millis() >= 2000+temp) {
    score = score + 10;
    temp = millis();
  }
  text('Score:'+score,20,20)
}

function collDetect(x1,y1,x2,y2) { // collision detection for the boid and player
  var d = dist(x1, y1, x2, y2);
	  if (d < 10) {
		   menu = 3
    }
}

function eatFood(x1,y1,x2,y2) { // collision detection for the player getting orbs
  var d = dist(x1, y1, x2, y2);
	  if (d < 15) {
      // explode(width/2,height/2);
      // explodeTemp = 0;
      boom = new explosion(hunterset[0].position.x,hunterset[0].position.y,boom);
      hunterset.shift();
      foodset.shift();
      score = score + 50;
    }
}

// function explode(x,y) { // first attempt at making the explosion
//   explodeTemp++;
//   push();
//   translate(x, y);
//   ellipse(0,0,temp,temp)
//   pop();
//   if (temp == 20){
//     return
//   }
// }
function keyPressed() {
  if (menu==3){
    if (keyCode === 32) {
      reset();
      menu = 1;
    }
    if (keyCode === 13) {
      reset();
      menu = 0;
    }
  }
  if (menu==2){
    if (keyCode === 13) {
      menu = 0;
    }
  }
  if (menu==4){
    if (keyCode === 13) {
      menu = 0;
    }
  }
}

function reset() { // resets the scene
  timer = 5000;
  score = 0;
  hunterset = [];
  foodset = [];
  hunterNum = 1;
  temp = 0;
  menu = 0;
  p1.position.x = width/2;
  p1.position.y = height/2;
  for (let i = 0; i < hunterNum; i++) { // spawns the starting number of hunters
    hunterspawn();
  }
}

function hunterspawn() { //functiont to spawn in the hunters
  var randPos = createVector(random(width),random(height));
  var d = dist(p1.position.x,p1.position.y,randPos.x,randPos.y)
  if (d <= 200){
    let diff = p5.Vector.sub(randPos,p1.position)
    diff.normalize();
    diff.mult(200);
    randPos = createVector(p1.position.x,p1.position.y).add(diff);
  }
  hunterset.push(new hunter(randPos.x, randPos.y));
}
