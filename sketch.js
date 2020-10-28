var tower,towerImg;
var door, doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock, invisibleBlockGroup;
var gameState="play";
var score=0;
function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  
}


function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  doorsGroup= new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
}
function draw(){
  background(0);
  
 
  if(gameState==="play"){
   
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
    
  }
  ghost.velocityY=ghost.velocityY+0.8;
  spawnDoors();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  drawSprites();
     stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
     score=score+(Math.round(getFrameRate()/60));
  
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over", 230, 250);
    score=0;
  }
}

function spawnDoors(){
  if(frameCount% 240===0){
  var door=createSprite(200,-50);
  door.addImage(doorImg);
  
  var climber=createSprite(200,10);
  climber.addImage(climberImg);
    
    
   var invisibleBlock=createSprite(200,15);
    invisibleBlock.height=2;
    
  door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;
    
  door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
  
  door.lifetime=800;
    climber.lifetime=800;
    
    ghost.depth = door.depth;
    ghost.depth+=1;
  doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug=true;
    invisibleBlockGroup.add (invisibleBlock);
  }
}
