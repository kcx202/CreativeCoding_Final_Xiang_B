class food {
  constructor(x, y) {
    this.size = 8; // Size of food
    this.position = createVector(x, y); //Define position of vector
    this.foodbox = createSprite(this.position.x, this.position.y, this.size, this.size);
    this.foodbox.position.x = (this.position.x);
    this.foodbox.position.y = (this.position.y);
  }


  display() {
    stroke(200);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0,0,this.size,this.size);
    pop();
  }
}
