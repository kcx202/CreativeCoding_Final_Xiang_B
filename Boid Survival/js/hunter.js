
// Reference - Daniel Shiffman, The Nature of Code - Vehicle object

class hunter {
  constructor(x, y) {
    this.position = createVector(x, y); //Define position of vector
    this.size = 6; // Size of Hunter
    this.maxspeed = 7; // Maximum speed
    this.maxforce = 0.15; // Maximum steering force
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
		this.death = false;
  }

  applyBehaviors(hunters,target) {
    let separateForce = this.separate(hunters);
    let seekForce = this.seek(target);

    separateForce.mult(hunterSeperation);
    seekForce.mult(hunterForce);

    this.applyForce(separateForce);
    this.applyForce(seekForce);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby hunters and steers away
  separate(hunters) {
    let desiredseparation = hunterSpace;
    let sum = createVector();
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < hunters.length; i++) {
      let d = p5.Vector.dist(this.position, hunters[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, hunters[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        sum.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Take the direction vector and scale to maxspeed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Desired minus the velocity gives the steering direction
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  // Compares the vector needed to reach the target subtracts current velocity
  // The amount of steer needs is desired minus velocity
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector to target
    //Direction and magnitude of desired vector
    desired.normalize(); // Create unit vector for direction
    desired.mult(this.maxspeed); // Scale to maxspeed for magnitude
    //Difference in current velocity and desired vector is the adjustment needed
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limits the steer or else hunters are too mobile
    return steer;
  }

  update() {
    // Update velocity by adding the acceleration
    this.velocity.add(this.acceleration);
    // Limit speed to be under the maxspeed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
		//print(this.death); // remnants of code trying to kill hunters
		//if (this.death == true){
		//	this.hunterbox.remove();
		//}

  }

  display() {
    // gives the orientation of the velocity vector to face the hunter
  	let theta = this.velocity.heading() + PI / 2;
    // test if the hunter has collided with the player
		collDetect(this.position.x,this.position.y,p1.position.x,p1.position.y)
    fill(245,0,49);
    stroke(245,0,49);
    strokeWeight(2);
    //drawing the hunters at their locations
    push();
    translate(this.position.x, this.position.y);
    beginShape();
    rotate(theta);
    vertex(0, -this.size * 2);
    vertex(0, this.size);
    vertex(this.size, this.size * 2);
    endShape(CLOSE);
    pop();
  }

  // allow objects to wrap around the border of the screen
  borders() {
    if (this.position.x < -this.size) this.position.x = width + this.size;
    if (this.position.y < -this.size) this.position.y = height + this.size;
    if (this.position.x > width + this.size) this.position.x = -this.size;
    if (this.position.y > height + this.size) this.position.y = -this.size;
  }
}
