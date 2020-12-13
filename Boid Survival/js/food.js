class food {
  constructor(x, y) {
    this.size = 8; // Size of food
    this.position = createVector(x, y); //Define position of vector
    this.bool = true;
  }


  display() {
    stroke(200);
    strokeWeight(2);
    if (this.size == 10){
      this.bool = false
    }
    if (this.size == 6){
      this.bool = true
    }
    if (this.bool == true){
      this.size = this.size + 1;
    } else {
      this.size = this.size - 1;
    }

    eatFood(this.position.x,this.position.y,p1.position.x,p1.position.y);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0,0,this.size,this.size);
    pop();
  }
}
