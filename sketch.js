const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var zombies = [];
var score = 0;

var zombie, zombieAnimation;
var isGameOver = false;

function preload() {
  backgroundImg = loadImage("background.png");
  towerImage = loadImage("tower.png");
  zombieAnimation = loadImage("Walk (3).png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(215, 110, 130, 100, angle);

}


function draw() {
  background(0);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();

  showZombies()

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithZombie(i);
  }

  cannon.display();

  stroke("black");
  fill("white");
  strokeWeight(2)
  textSize(25);
  text("Score: " + score, width - 175, 100);

}

function collisionWithZombie(index) {
  for (var i = 0; i < zombies.length; i++) {
    if (balls[index] !== undefined && zombies[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, zombies[i].body);

      if (collision.collided == true && zombies[i].isBroken === false) {
        zombies[i].remove(i);
        score += 5;


        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();

    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {

      ball.remove(index);

    }
  }
}

function showZombies() {
  if (zombies.length > 0) {
    if (zombies[zombies.length - 1] !== undefined && (
      zombies.length < 4 && zombies[zombies.length - 1].body.position.x < width - 300)
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);

      var zombie = new Zombie(
        width,
        height - 100,
        170,
        170,
        position,
      );

      zombies.push(zombie);
    }

    for (var i = 0; i < zombies.length; i++) {
      Matter.Body.setVelocity(zombies[i].body, {
        x: -0.9,
        y: 0
      });


      var collision = Matter.SAT.collides(this.tower, zombies[i].body);
      if (collision.collided) {

        isGameOver = true;
        gameOver();
      }
      zombies[i].display();

    }
  } else {
    var zombie = new Zombie(width, height - 60, 170, 170, -60);
    zombies.push(zombie);
  }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {

    balls[balls.length - 1].shoot();
  }
}

function gameOver() {
  swal({
    title: "Game Over",
    text: "Thanks for playing",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/zombie.png",
    imageSize: "150x150",
    confirmText: "Play Again"
  },
    function (isConfirm) {
      if (isConfirm === true) {
        window.location.reload();
      }
    })
}
