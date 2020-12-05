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
    if(keyIsDown(32)) {
    debugBool = debugBool? false : true;
  }
}
