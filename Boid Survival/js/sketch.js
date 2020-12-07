let timer = 5000;
let score = 0;
let hunterset = [];
let foodset = [];
let hunterNum = 1; // Starting number of hunters
let hunterSeperation = 2; // Distance between hunters
let hunterForce = 1;
let hunterSpace =20;
let debugBool = false;
let spawnWidth = 0;
let spawnHeight = 0;
var temp = 0;
let menu = 0


function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < hunterNum; i++) {
    spawnWidth = random(width);
    spawnHeight = random(height);
    if (spawnWidth < width/2){
      spawnWidth = 10;
    } else {
      spawnWidth = width-10;
    }
    if (spawnHeight < height/2){
      spawnWidth = 10;
    } else {
      spawnWidth = height-10;
    }
    hunterset.push(new hunter(spawnWidth, spawnHeight));
  }
  moveUp = false;
  moveDown = false;
  moveRight = false;
  moveLeft = false;
  p1 = new player();
}

function draw() {
  background(90,177,187);
  fill(30,39,73);
  rect(50, 100, 200, 75,25,25);
  fill(39,52,105);
  rect(50, 250, 200, 75,25,25);
  fill(48,52,63);
  rect(50, 400, 200, 75,25,25);
  textSize(50)
  fill(255);
  text('START', 70, 155);
  textSize(26);
  text('INSTRUCTIONS', 52, 300);
  text('Settings(WIP)', 70, 450);
  textSize(70);
  text('COOL GAME', 400, 250);
  text('TITLE', 500, 350);
  textSize(15);
  text('and probably cool graphics too if I have the time and creativity', 400, 400);
  text('by Kevin Xiang', 550, 430);


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
    text('Right Click to return to main menu', width/2, 30)
    textAlign(LEFT);
    textSize(30)
    text('1. You are being hunted. Flee from the hunters.', 50, 150)
    text('2. Move your ship using arrow keys to avoid them as long as you can', 50, 200)
    text('3. Collect orbs to destroy the hunters', 50, 250)
    text('4. Survive.', 50, 300)
    if (mouseButton == RIGHT) {
      menu = 0
    }
  }
  if (menu == 3) { // death screen
    background(228,87,46)
    textSize(75)
    textAlign(CENTER)
    text('u ded lol', width/2, height / 2)
    textSize(20)
    text('Right Click to return to main menu', width/2, 30)
    text('Score:'+score, width/2, height / 2 + 50)
    text('Please refresh, sorry I havent figured out how to reset yet', width/2, height-50)
    if (mouseButton == RIGHT) {
      menu = 0
    }
  }
}

function mouseClicked() {
  if (menu == 0) {
    if (mouseX < 200 && mouseX > 50) {
      if (mouseY < 175 && mouseY > 100) {
        menu = 1
      }
      if (mouseY < 325 && mouseY > 250) {
        menu = 2
      }
      if (mouseY < 475 && mouseY > 400) {
        menu = 3
      }
    }
  }
}

function gameloop(){
  background(51);
  if (millis() >= 5000+timer) {
    hunterset.push(new hunter(random(width), random(height)));
    // this line is for killing hunters, not quite sure how to delete
    // the hitbox howver :(
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
    v.hunterbox.debug = debugBool;
  }
  for (let v of foodset) {
    v.display();
  }
  p1.update();
  p1.move();
  p1.display();
  p1.borders();
  drawSprites();

  p1.playerbox.debug = debugBool;
}

function scoreCounter() {
  if (millis() >= 2000+temp) {
    score = score + 10;
    temp = millis();
  }
  text('Score:'+score,20,20)
}
