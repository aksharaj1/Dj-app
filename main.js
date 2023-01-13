song="";

score_leftwrist = 0;
score_rightwrist = 0;

leftwristX = 0;
rightwristX = 0;
leftwristY = 0;
rightwristY = 0;

function preload(){
    song =loadSound("music2.mp3");
}


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelloaded);
    posenet.on("pose", gotposes);

}

function modelloaded(){
    console.log("Model is loaded");
}

function gotposes(results){
if(results.length > 0){
console.log(results);

score_rightwrist = results[0].pose.keypoints[10].score;
console.log(score_rightwrist);

score_leftwrist = results[0].pose.keypoints[9].score;
console.log(score_leftwrist);

leftwristX = results[0].pose.leftWrist.x;
rightwristX = results[0].pose.rightWrist.x;
leftwristY = results[0].pose.leftWrist.y;
rightwristY = results[0].pose.rightWrist.y;

console.log("Left wrist x = " + leftwristX + "right wrist x =" + rightwristX);
console.log("Left wrist y = " + leftwristY + "right wrist y =" + rightwristY);
}


}

function draw(){
    image(video,0,0,600,500);

    fill("orange");
    stroke("black");
    if(score_rightwrist > 0.2){

    
    circle(rightwristX,rightwristY,18)
    
    if(rightwristY > 0 && rightwristY <=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);

    }

    else if(rightwristY > 100 && rightwristY <=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
        
    }

    else if(rightwristY > 200 && rightwristY <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
        
    }

    else if(rightwristY > 300 && rightwristY <=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
        
    }

    else if(rightwristY > 400 && rightwristY <=500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
        
    }
}
    if(score_leftwrist > 0.2){
    circle(leftwristX, leftwristY, 18);
    InNumberLeftWristY = Number(leftwristY);
    remove_decimal = floor(InNumberLeftWristY);
    volume = remove_decimal / 500;
    document.getElementById("volume").innerHTML = "The volume = " + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}