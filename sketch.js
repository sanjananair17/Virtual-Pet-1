//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload() {

  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  //add styles here
  fill("blue");
  textSize(15);
  stroke(5);
  text("Press UP_ARROW Key To Feed The Dog Milk!",100,60);

  text("FOOD REMAINING: " + foodS, 170,480);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food: x
  })
}