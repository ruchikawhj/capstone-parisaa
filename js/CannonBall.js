class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 50;
    this.speed = 0.05;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("cannonball.png");
   
   
    World.add(world, this.body);
  }


  remove(index) {

    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

 
      Matter.World.remove(world, this.body);
      delete balls[index];
   
  }

  shoot() {
    var newAngle = cannon.angle - 28;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});  
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();


   
  }
}
