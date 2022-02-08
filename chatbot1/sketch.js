let myRec = new p5.SpeechRec();// create new speech rec objects
let startRecB;
let displayT = 'Press button to start speech rec';

let data;
let answer;
let circles = [];

class CircleBack{
  constructor(x,y,size,r,g,b){
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  display(){

    noStroke();
    fill(this.r,this.g,this.b, 100);
    ellipse(this.x, this.y, this.size,this.size);
  }
  move(){
    this.x+=round((random(-1,1)));
    this.y += round(random(-1,1));
  }
}

function preload(){
  data = loadJSON('data.json');
}

function setup(){

  createCanvas(500,500);

  startRecB = createButton('start');
  startRecB.mousePressed(startRec);

  for(let i = 0; i< 15; i++){
    circles.push(new CircleBack(random(500),
        random(500), 100, random(200,255),
         random(200,255), random(200,255)))
    new CircleBack(random(500),
    random(500), 100, random(200,255),
     random(200,255), random(200,255));
  }

}

function startRec(){
  myRec.start();
  myRec.onResult = showResult;
  displayT = 'recording';
}

function showResult(){
  console.log(myRec.resultString);
  createP(myRec.resultString);
  displayT = 'not recording';


  let talk = myRec.resultString.toLowerCase();
  loop1: for(let i = 0; i < data.brain.length; i++ ){
    loop2: for (let j = 0; j < data.brain[i].triggers.length; j++){
      if(talk.indexOf(data.brain[i].triggers[j])!== -1){
        //we have a match!
        // print("OK");
        answer = random(data.brain[i].responses);
        //print(answer);
        break loop1;
      }else  {
        answer = random(data.catchall);
      }
    }
  }
  myRec.speak(answer);
}
//
// function chismis(){
//   let talk =
//
// }

function draw(){

  blendMode(MULTIPLY);
  background(255);
  //background(200,168, 200);

  // let size = 300;
  // noStroke();
  // fill(random(200,255), random(230,255), random(200,255));
  //
  // ellipse(200,200,size, size);
  for (let i = 0; i< circles.length; i++){
    circles[i].display();
    circles[i].move();
  }
  fill(0);
  fill(0);
  strokeWeight(1);
  stroke(255)
  blendMode(BLEND)
  text(displayT, 100,100);
  text(answer, 50,300, 400,200);
}
