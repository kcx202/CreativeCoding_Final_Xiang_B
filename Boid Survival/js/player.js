class player {
  constructor() {
    this.position = createVector(width/2,height/2);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.size = 6;
    this.maxspeed = 5;
    this.maxforce = 0.5;  }

  update() {
    //updating all the controls and applies the forces
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
    //adds acceleration to velocity then limits it to max speed
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    // adds the velocity to the current positin
    this.position.add(this.velocity);
    // reset the acceleration for every cycle
    this.acceleration.mult(0);
  } // move

  applyForce(force) {
    this.acceleration.add(force);
  } // applyForce

  display() {
    // orientation of player
    let theta = this.velocity.heading() + PI / 2;
    fill(111,255,233);
    stroke(111,255,233);
    // drawing the player
    push();
    translate(this.position.x, this.position.y);
    beginShape();
    rotate(theta);
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size * 2);
    vertex(0, this.size);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);
    fill(90,177,187);
    beginShape();
    vertex(0, -this.size );
    vertex(-this.size, this.size );
    vertex(0, this.size/2);
    vertex(this.size, this.size );
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
