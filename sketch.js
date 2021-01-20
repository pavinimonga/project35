var airballoon;
var position;
var database;

function setup(){
    database = firebase.database();
    createCanvas(800,400);
    airballoon = createSprite(400, 200, 50, 50);
    airballoon.shapeColor = "red";

    var airballoonPosition = database.ref('position');
    airballoonPosition.on("value",readPosition,showError);
}

function draw(){
    background(255,255,255);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref('position').set({
        'x' : position.x + x,
        'y' : position.y + y
    })
    
}

function readPosition(data){
    position= data.val();
    airballoon.x=position.x;
    airballoon.y=position.y;
    }


function showError(){
    console.log("Error in writing to the database ");
}



