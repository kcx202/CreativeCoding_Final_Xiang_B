class explosion {
  constructor(x, y, boom) {
    this.size = 1; // Size of explosion
    this.position = createVector(x, y); //Define position of vector based on dead hunter
    this.boom = boom; // take in the var for storing the explosion
  }

  update() {
    stroke(247,209,38);
    noFill();
    strokeWeight(2);
    this.size = this.size+1; // explanding explosion
    push();
    translate(this.position.x, this.position.y);
    ellipse(0,0,this.size,this.size); // draws the explosion
    pop();
    if (this.size == 100){
      // boom[boom.indexOf(this)] = null;
      boom = null; // ends the explosion
    }
  }
}
