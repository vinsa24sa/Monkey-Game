//global variables
var monkey,ground;
var monkeyRunning,bananaIm,obstacleIm;
var foodGroup, obstGroup;
var survivalTime;




function preload(){
  
  monkeyRunning = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaIm = loadImage("banana.png");
  obstacleIm = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 400);
  
  //create the monkey sprite
  monkey = createSprite(100,287,20,20);
  monkey.addAnimation("moving",monkeyRunning);
  monkey.scale = 0.2;
  
  //calling the groups
  foodGroup = createGroup();
  obstGroup = createGroup(); 
  
  //giving value to survivalTime
  survivalTime = 0;
  
}


function draw()
{
  background("lightblue");
  
  //text for survivalTime
  stroke("white");
  fill("black");
  textSize(20);
  text("Survival Time : "+survivalTime,100,50);
  
  //updating the survivalTime
  survivalTime = survivalTime + Math.round(getFrameRate()/55);

  //creating the ground sprites
  ground = createSprite(400,350,900,12);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     }
  
 
  
  //giving velocity to the monkey
  monkey.velocityY = monkey.velocityY+0.8;
  
  //collide the monkey to prevent it to fall
  monkey.collide(ground);
  
  //calling the functions
  food();
  obstacle();
  
  //for jumping of the monkey 
  if(keyDown("space"))
  {
    monkey.velocityY = -12;  
  }
  
  
  drawSprites();
  
  
}

//function for food
function food(){
  if (frameCount % 80 === 0){
  var banana = createSprite(400,100);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaIm);
  banana.scale = 0.15;
  banana.velocityX = -8;
    
    banana.lifetime = 80;
    foodGroup.add(banana);
  }
}

//function for obstacle
function obstacle(){
  if(frameCount % 300 === 0){
    var stone = createSprite(400,340);
    stone.y = Math.round(random(287,287));
    stone.addImage(obstacleIm);
    stone.scale = 0.3;
    stone.velocityX = -5;
    
    stone.lifetime = 120;
    obstGroup.add(stone);
    
    stone.depth = monkey.depth
    monkey.depth = stone.depth+1
  }
}