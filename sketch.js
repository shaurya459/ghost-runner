var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
   
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg); 
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleblockGroup=new Group();
}


function draw(){
  background(0);
  if (gameState === "play") 
  {
    if (tower.y>400){
      tower.y=300;
    }
     if (keyDown("space")){
      ghost.velocityY=-4; 
     }
    ghost.velocityY=ghost.velocityY+0.8;
    
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    
    }
    if(invisibleblockGroup.isTouching(ghost)||
    ghost.y>600){
  ghost.destroy();
     gameState="end"; 
    }
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("red");
    textSize(35);
    text ("GameOver",230,250);
  }

}

function spawnDoors() {

  //write code here to spawn the doors in the tower
   if(frameCount % 240===0){
     var door=createSprite(200,-50);
     var climber=createSprite(200,10);
     var invisibleblock=createSprite(200,15);
     invisibleblock.width=climber.width;
     invisibleblock.height=2;
     
     door.x=Math.round(random(120,400));
     climber.x=door.x;
     invisibleblock.x=door.x;
     
     door.addImage(doorImg);
     climber.addImage(climberImg);
     
     door.velocityY=1;
     climber.velocityY=1;
     invisibleblock.velocityY=1;
     doorsGroup.add(door);
     invisibleblockGroup.add(invisibleblock);
     climbersGroup.add(climber);
     door.lifetime=800;
     invisibleblock.lifetime=800;
     climber.lifetime=800;
     ghost.depth=door.depth;
     ghost.depth+=1;
     
   }
}

