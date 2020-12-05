let timer = 0;
let score = 0;
let hunterset = [];
let hunterNum = 10; // Starting number of hunters
let hunterSeperation = 2; // Distance between hunters
let hunterForce = 1;
let hunterSpace =20;
let debugBool = false;
let killNum = 1;
var temp = 0;


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
  if (millis() >= 2000+timer) {
    hunterset.shift();
    //for (var i in hunterset) {
    //  if (hunterset[i].value == killNum) {
    //    hunterset[i].hunter.remove();
    //    break; //Stop this loop, we found it!
    //  }
    //}
    print(hunterset);
    killNum++;
    score = score + 10;
    text(score,20,20);
    timer = millis();
  }
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
