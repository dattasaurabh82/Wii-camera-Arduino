import fullscreen.*;
import processing.serial.*;

FullScreen fs;
Serial port;

String first_X_data = "";
String first_Y_data = "";
String second_X_data = "";
String second_Y_data = "";

String data = "";
 
int indexOne = 0;
int indexTwo = 0;
int indexThree = 0;

int xOne = 0;
int yOne = 0;
int xTwo = 0;
int yTwo = 0;

PFont font;
PImage img;

void setup()
{
  size(1400, 770);
  
  fs = new FullScreen(this); 
  fs.enter(); 
  
  img = loadImage("heading.png");
  
  port = new Serial(this, "COM3", 9600);
  port.bufferUntil('.');
  
  font = loadFont("AgencyFB-Reg-30.vlw");
  textFont(font, 30);
  
  smooth();
  noStroke();
}

void draw()
{
  //background(140, 140, 140);
  //background(42, 42, 42);
  background(0);
  
  image(img, 25, 10, img.width/2, img.height/2);
 
 ////////////////////////////////////////////
  
  fill(30, 30, 30);
  rect(20, 50, 260, 40);
  
  fill(255);
  text("X : ", 45, 81);
  fill(5, 130, 255);
  text(xOne, 75, 82);
  
  fill(255);
  text("Y : ", 165, 81);
  fill(5, 130, 255);
  text(yOne, 195, 82);
  
  fill(128, 0, 0);
  ellipse(250, 70, 15, 15);
  
  ////////////////////////////////////////////
  fill(30, 30, 30);
  rect(20, 120, 260, 40);
  
  fill(255);
  text("X : ", 45, 151);
  fill(5, 130, 255);
  text(xTwo, 75, 152);
  
  fill(255);
  text("Y : ", 165, 151);
  fill(5, 130, 255);
  text(yTwo, 195, 152);
  
  fill(250, 127, 26);
  ellipse(250, 140, 15, 15);
  
 /////////////////////////////////////////////
  fill(128, 0, 0);
  ellipse((xOne*2)-100, (yOne+4), 15, 15);
  
  fill(250, 127, 26);
  ellipse((xTwo*2)-100, (yTwo+4), 15, 15);
}

void serialEvent (Serial port)
{
  data = port.readStringUntil('.');
  data = data.substring(0, data.length() - 1);
  
  indexOne = data.indexOf(",");
  indexTwo = data.indexOf(";");
  indexThree = data.indexOf("/");
  
  first_X_data = data.substring(0, indexOne);
  first_X_data = trim(first_X_data);
  xOne = int(first_X_data);
  
  first_Y_data = data.substring(indexOne+1, indexTwo);
  first_Y_data = trim(first_Y_data);
  yOne= int(first_Y_data);
  
  ///////////////////////////////////////////////////
  
  second_X_data = data.substring(indexTwo+1, indexThree);
  second_X_data = trim(second_X_data);
  xTwo = int(second_X_data);
  
  second_Y_data = data.substring(indexThree+1, data.length());
  second_Y_data = trim(second_Y_data);
  yTwo= int(second_Y_data);
  
}
