//defining Game States
var PLAY=1;
var END=0;
var gameState=1;

//defining variables
var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit,position,restart;
var knifeImage,fruit1,fruit2 ,fruit3,fruit4,monsterImage, gameOverImage,restartImage;
var gameOverSound,knifeSwooshSound;

function preload(){
  
  //loading images
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.jpg");

  //load sound 
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  
}

function setup() {
  
  createCanvas(600, 600);
  
  //creating sword
   knife = createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  //creating restart sprite
  restart = createSprite(280,380);
  restart.addImage("restart",restartImage);
  restart.scale = 0.1;
  
  //Score variables and Groups
  score=0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();
  
}

function draw() {
  
  //giving background color
  background("lightblue");
  
  //defining gamestate properties
  
  if(gameState === PLAY) {
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;
  
    //setting visibility of restart to false
    restart.visible = false;
    
    // Increase score if sword is touching fruit
    
    if(fruitGroup.isTouching(knife)){
      
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 1;
    
    }
    
    else
      
    {
      
      // Go to end state if sword is touching enemy
      
      if(monsterGroup.isTouching(knife) || score === 20) {
        
        gameState=END;
        gameOverSound.play();
        
        //destroying groups
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
        
        //setting visibility of restart to true
        restart.visible = true;
        
      }
      
    }
    
  }
  
  //obtaining output
  drawSprites();
  
  //restarting game
  if (mousePressedOver(restart)) {
    
    gameState = PLAY;
    score = 0;
    knife.addImage(knifeImage);
    knife.scale = 0.7;
  
  }
  
  //Displaying score
  textSize(25);
  text("Score : "+ score,250,50);
  
}

//defining monster function
function Monster(){
  
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    
    //increasing frequency of monsters at certain point
    monster.velocityX = -(8 + score/10);
    
    //giving lifetime to monster
    monster.setLifetime=50;
    
    //adding sprite to monster group
    monsterGroup.add(monster);
    
  }
  
}

//defining fruits function
function fruits(){
  
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position == 1)
      
    {
      
    fruit.x=600;
    fruit.velocityX = -(7 + score/4);
      
    }
    
    else
      
    {
      
      if(position == 2){
        
      fruit.x=0;
      
     //increasing frequency of fruits at certain point
      fruit.velocityX = 7 + score/4;
        
      }
      
    }
    
    fruit.scale=0.2;
    
     //fruit.debug=true;
    
     r=Math.round(random(1,4));
    
    if (r == 1) {
      
      fruit.addImage(fruit1);
      
    } else if (r == 2) {
      
      fruit.addImage(fruit2);
      
    } else if (r == 3) {
      
      fruit.addImage(fruit3);
      
    } else {
      
      fruit.addImage(fruit4);
      
    }
    
    fruit.y=Math.round(random(50,550));
   
    //giving lifetime to fruit
    fruit.setLifetime=100;
    
    //adding sprites to monster group
    fruitGroup.add(fruit);
    
  }
  
}