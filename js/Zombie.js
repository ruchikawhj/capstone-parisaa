class Zombie {
    constructor(x, y, width, height, zombiePos) {
    
  
      this.speed = 0.07;
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
      this.zombiePosition = zombiePos;
      this.isBroken = false;
      
      this.animation= loadImage("Attack (3).png")
  
      World.add(world, this.body);
    }
  
  
    remove(index) {
    
      this.isBroken = true;
    
        Matter.World.remove(world, zombies[index].body);
        delete zombies[index];
     
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
     
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation, 0, this.zombiePosition, this.width, this.height);
      pop();
    }
  }
  