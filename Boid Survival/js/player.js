class player {
  constructor() {
    this.position = createVector(width/2,height/2);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.size = 6;
    this.maxspeed = 5;
    this.maxforce = 0.5;
    this.playerbox = createSprite(this.position.x, this.position.y, this.size, this.size);
  } // constructor

  update() {
    this.playerbox.setCollider('rectangle', this.position.x, this.position.y, 10, 10);
    if(moveUp === true) {
      this.applyForce(createVector(0,-this.maxforce));
    }
    if(moveDown === true) {
      this.applyForce(createVector(0,this.maxforce));
    }
    if(moveLeft === true) {
      this.applyForce(createVector(-this.maxforce,0));
    }
    if(moveRight === true) {
      this.applyForce(createVector(this.maxforce,0));
    }
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  } // move

  applyForce(force) {
    this.acceleration.add(force);
  } // applyForce

  display() {
    let theta = this.velocity.heading() + PI / 2;
    fill(150);
    push();
    translate(this.position.x, this.position.y);
    beginShape();
    rotate(theta);
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(0, this.size);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);
    pop();
  } // display

    // Wraparound
  borders() {
    if (this.position.x < -this.size) this.position.x = width + this.size;
    if (this.position.y < -this.size) this.position.y = height + this.size;
    if (this.position.x > width + this.size) this.position.x = -this.size;
    if (this.position.y > height + this.size) this.position.y = -this.size;
  }
} // player
