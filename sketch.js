var player1anim, player2anim;
var player1,player2;
var database,gameState;
var player1Position,player2Position;
var player1Score,player2Score;
var position1,position2;

function preload()
{
    player1anim=loadAnimation("assests/player1a.png","assests/player1b.png","assests/player1a.png");
    player2anim=loadAnimation("assests/player2a.png","assests/player2b.png","assests/player2a.png");
}

function setup()
{
  createCanvas(800, 800);
  database=firebase.database();
  player1=createSprite(700,400,10,10);
  player1.addAnimation("walking",player1anim);
  player1.scale=-0.5;
  player2=createSprite(100,400,10,10);
  player2.addAnimation("walking",player2anim);
  player2.scale=0.5;

   player1Position = database.ref('player1/position');
  player1Position.on("value",readPlayerPos1);

   player2Position = database.ref('player2/position');
  player2Position.on("value",readPlayerPos2);

   gameState = database.ref('gameState');
   gameState.on("value",readgameState);

   player1Score = database.ref('player1Score');
   player1Score.on("value",readScore1);

   player2Score = database.ref('player2Score');
   player2Score.on("value",readScore2);
  

}

function draw()
{
  background("white");
  drawLines();
  if(gameState===0){
    stroke("black")
    fill("yellow")
    text("Press Space to Start", 350,200);

    if(keyDown("space")){
var r = Math.round(random(1,2));

if(r===1){
database.ref('/').update({
  gameState:1
})
  
  alert("RED PLAYER")
}
if(r===2){
  database.ref('/').update({
    gameState:2
  })
    
    alert("YELLOW PLAYER")
  }

  database.ref("player1/position").update({
    x:300,
    y:400

  })
  database.ref("player2/position").update({
    x:600,
    y:400

  })

    }
    
    
    
    
    
    
     }
drawSprites();

}
function drawLines()
{
  strokeWeight(4);
  for(var i = 0; i <= 800; i = i + 20)
  {
    stroke("gray");
    line (400, i, 400, i + 10);

    stroke("red");
    line (100, i, 100, i + 10);

    stroke("yellow");
    line (700, i, 700, i + 10);
  }
}

function readPlayerPos1(data){
  position1=data.val();
  player1.x=position1.x;
  player1.y=position1.y;
  }
  
  function readPlayerPos2(data){
      position2=data.val();
      player2.x=position2.x;
      player2.y=position2.y;
      }
  
      function readgameState(data){
          gameState=data.val();
  
      }
  
      function readScore1(data){
          player1Score=data.val();
  
      }
  
      function readScore2(data){
          player2Score=data.val();
  
      }
  