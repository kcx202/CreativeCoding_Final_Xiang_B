let hunterset = [];
let hunterNum = 2;
let hunterSeperation =2;
let hunterForce = 1;
let hunterSpace =20;

function setup() {
  createCanvas(1200, 600);
  for (let i = 0; i < hunterNum; i++) {
    hunterset.push(new hunter(random(width), random(height)));
  }
  moveUp = false;
  moveDown = false;
  moveRight = false;
  moveLeft = false;
  p1 = new player();
}

function draw() {
  background(51);
  controls();
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
    v.hunterbox.debug = true;
    if(v.hunterbox.overlap(p1.playerbox)){
      fill(150,0,0);
    }else {
      fill(20);
    }
  }

  p1.update();
  p1.move();
  p1.display();
  p1.borders();
  drawSprites();
  
  p1.playerbox.debug = true;
}

function controls() {
  if(keyIsDown(UP_ARROW)) {
    moveUp = true;
  } else {
    moveUp = false;
  }
    if(keyIsDown(DOWN_ARROW)){
    moveDown = true;
  } else {
    moveDown = false;
  }
    if(keyIsDown(LEFT_ARROW)) {
    moveLeft = true;
  } else {
    moveLeft = false;
  }
    if(keyIsDown(RIGHT_ARROW)) {
    moveRight = true;
  } else {
    moveRight = false;
  }
} //keypressed
