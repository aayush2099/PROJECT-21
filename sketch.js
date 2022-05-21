var road
var car
var oppcar
var car1
var car2
var car3
var gameOver,GameOver
var END =0;
var PLAY =1;
var gameState = PLAY;
var distance=0
var reStart,Restart
var die
var check
var over
function preload() {
car=loadImage("formula_1_PNG32.png")
c1=loadImage("oppcar1.png")
c2=loadImage("oppcar2.png")
c3=loadImage("oppcar3.png")
road=loadImage("horizontal-road-clipart-1.jpg")
GameOver=loadImage("gameover.jpg")
Restart=loadImage("restart.png")
over=loadSound("gameover.mp3")
die=loadSound("carcrash.mp3")
check=loadSound("checkpoint.mp3")
}  


function setup() {
    createCanvas(1200,300);
   
    racetrack = createSprite(300,150,600,160);
    racetrack.addImage("track",road);
    racetrack.scale=3
    racetrack.velocityX=-2

      racer= createSprite(70,150);
      racer.addImage("racer boy",car);
      racer.scale=0.02;
  
      gameOver = createSprite(600,150);
gameOver.addImage("over",GameOver);
gameOver.scale = 0.1;
gameOver.visible=false
reStart = createSprite(600,250);
  reStart.addImage(Restart);
  reStart.visible=false


    car1=new Group()
    car2=new Group()
    car3=new Group()
} 

function draw() {
    background(180);
    drawSprites();
    
  textSize(20);
  fill(255);
  text("Distance: "+ distance,1050,30);
  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
    racetrack.velocityX = -(6 + 2*distance/150);
   
    racer.y = World.mouseY;
   
    edges= createEdgeSprites();
    racer .collide(edges);
   
   //code to reset the background
   if(racetrack.x < 290){
     racetrack.x = width/2;
   }
   
     
      var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
    opponent1();
    } else if (select_oppPlayer == 2) 
    opponent2();
    } else {
    opponent3();
    }

    if(distance>0 && distance%300 === 0){
      check.play() 
   }
    
    if(car1.isTouching(racer)){
        gameState = END;
        player1.velocityY = 0;
        over.play()
       }
       
       if(car2.isTouching(racer)){
         gameState = END;
         player2.velocityY = 0;
         over.play()
       }
       
       if(car3.isTouching(racer)){
         gameState = END;
         player3.velocityY = 0;
         over.play()
       }
      }

    if (gameState === END) {

        gameOver.visible = true;
        reStart.visible = true
        ;
      
        racetrack.velocityX = 0;
        racer.velocityY = 0;
        
      
        car1.setVelocityXEach(0);
        car1.setLifetimeEach(-1);
      
        car2.setVelocityXEach(0);
        car2.setLifetimeEach(-1);
      
        car3.setVelocityXEach(0);
        car3.setLifetimeEach(-1);

        if(mousePressedOver(reStart)) {
            reset();
        }

}
}

function opponent1(){
    if(World.frameCount%400==0){
    player1 =createSprite(700,Math.round(random(50, 250)));
    player1.scale =0.25
    player1.velocityX = -(6 + 2*distance/150);
    player1.addImage("opponentPlayer2",c1)
    player1.setlifetime=5;
    car1.add(player1);
    }
}

function opponent2(){
    if(World.frameCount%300==0){
    player2 =createSprite(700,Math.round(random(50, 250)));
    player2.scale =0.2
    player2.velocityX = -(6 + 2*distance/150);
    player2.addImage("opponentPlayer2",c2);
    player2.setLifetime=5;
    car2.add(player2);
    }
}

function opponent3(){
    if(World.frameCount%200==0){
    player3 =createSprite(700,Math.round(random(50, 250)));
    player3.scale =0.2;
    player3.velocityX = -(6 + 2*distance/150);
    player3.addImage("opponentPlayer3",c3);
    player3.setLifetime=170;
    car3.add(player3);
     }
}
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    reStart.visible=false
    
    car1.destroyEach();
    car2.destroyEach();
    car3.destroyEach();
    
    distance = 0;
   }
  