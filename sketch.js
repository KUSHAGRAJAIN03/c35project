//Create variables here
var dog,dogimg,happyDog,database,FoodS,foodStock,feed,addFood,fedTime,lastFed,foodObj;


function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000,500);
  dog=createSprite(800,250);
  dog.addImage(dogimg);
  dog.scale=0.3;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("Feed Bruno");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  foodObj=new Food(20);

}


function draw() {
  background(46,139,87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last feed :"+lastFed%12+" PM",350,30);
  }else if (lastFed===0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : ",+lastFed+" AM",350,30);
  }
  foodObj.display();

  drawSprites();
  //add styles here
  fill("white");
  text("Food remaining:"+FoodS,600,50);
}

function readStock(data)
{
 FoodS=data.val();
}

function writeStock(x)
{

  if (x<=0)
  {
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods()
{
  FoodS++;
  database.ref('/').update({
    Food:foodS
  })
} 