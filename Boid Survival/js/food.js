class food {
  constructor(x, y) {
    this.size = 8; // Size of food
    this.position = createVector(x, y); //Define position of vector
    this.bool = true;
  }


  display() {
    stroke(82,59,186);
    fill(82,59,186);
    strokeWeight(2);
    // making the food pulse
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
    // test if player has collided with the food, if so kill and give points
    eatFood(this.position.x,this.position.y,p1.position.x,p1.position.y);
    ////drawi the food
    push();
    translate(this.position.x, this.position.y);
    ellipse(0,0,this.size,this.size);
    pop();
  }
}
