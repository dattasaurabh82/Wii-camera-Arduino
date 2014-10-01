import java.awt.AWTException;
import java.awt.Robot;
//import fullscreen.*;
import processing.serial.*;

//FullScreen fs;
Serial port;
arduMouse myMouse;

public static final short LF = 10;        // ASCII linefeed
public static final short portIndex = 1;  // select the com port, 
                                          // 0 is the first port

String X_data = "";
String Y_data = "";

String data = "";
 
int index= 0;
int btn = 0;
int x = 0;
int y = 0;

PFont font;
PImage img;

void setup()
{
  size(1400, 770);
  
  //fs = new FullScreen(this); 
  //fs.enter(); 
  
  img = loadImage("heading.png");
  
  port = new Serial(this, "COM12", 9600);
  port.bufferUntil('.');
  
  myMouse = new arduMouse(); 
  btn = 0; // turn mouse off until requested by Arduino message
  
  font = loadFont("AgencyFB-Reg-30.vlw");
  textFont(font, 30);
  
  smooth();
  noStroke();
}

void draw()
{
  //background(140, 140, 140);
  background(0);
  
  image(img, 25, 10, img.width/2, img.height/2);
 
 ////////////////////////////////////////////
  
  fill(30, 30, 30);
  rect(20, 50, 260, 40);
  
  fill(255);
  text("X : ", 45, 81);
  fill(5, 130, 255);
  text(x, 75, 82);
  
  fill(255);
  text("Y : ", 165, 81);
  fill(5, 130, 255);
  text(y, 195, 82);
  
  fill(128, 0, 0);
  ellipse(250, 70, 15, 15);
  
  fill(128, 0, 0);
  ellipse(x, y, 15, 15);
  
  myMouse.move(x,y);
  
  fill(255); 
  text(mouseX, 100, 300);
  text(mouseY, 100, 500);
 
}

void serialEvent (Serial port)
{
  data = port.readStringUntil('.');
  data = data.substring(0, data.length() - 1);
  
  index = data.indexOf(",");
  X_data = data.substring(0, index);
  X_data = trim(X_data);
  x = int(X_data);
  
  Y_data = data.substring(index+1, data.length());
  Y_data = trim(Y_data);
  y = int(Y_data);
}

class arduMouse 
{
  Robot myRobot;     // create object from Robot class;
  static final short rate = 4; // multiplier to adjust movement rate
  int centerX, centerY;
  arduMouse() 
  {
    try 
    {
      myRobot = new Robot();
    }
    catch (AWTException e) 
    {
      e.printStackTrace();
    }
    //Dimension screen = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
    //centerY =  (int)screen.getHeight() / 2 ;
    //centerX =  (int)screen.getWidth() / 2;
  }
  // method to move mouse from center of screen by given offset
  void move(int offsetX, int offsetY) 
  {
    //myRobot.mouseMove(centerX + (rate* offsetX), centerY - (rate * offsetY));
    myRobot.mouseMove(x, y);
  }
}
