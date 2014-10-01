import fullscreen.*;
import processing.serial.*;
import ddf.minim.*;
import ddf.minim.effects.*;

Minim minim;
AudioPlayer player;
BandPass bpf;

FullScreen fs;
Serial port;

String X_data = "";
String Y_data = "";

String data = "";
 
int index= 0;

int x = 0;
int y = 0;

void setup()
{
  size(1300, 700, P3D);
  
   minim = new Minim(this);
   String audioFile = selectInput();
  
   fs = new FullScreen(this); 
   fs.enter(); 
  
   port = new Serial(this, "COM3", 9600);
   port.bufferUntil('.');
  
   player = minim.loadFile(audioFile);
   player.loop();
   
   bpf = new BandPass(440, 20, player.sampleRate());
   player.addEffect(bpf);
  
   smooth();
}

void draw()
{
  lights();
  background(0);
  
  //graph
  for(int i = 0; i < player.right.size()-1; i++)
  {
    float x1 = map(i, 0, player.bufferSize(), 0, width);
    float x2 = map(i+1, 0, player.bufferSize(), 0, width);
    //line(x1, height/4 - player.left.get(i)*50, x1, height/4 - player.left.get(i+1)*50);
    line(x1, 3*height/4 - player.right.get(i)*50, x2, 3*height/4 - player.right.get(i+1)*50);
  }
 
  // map the blob position to the range [100, 10000], an arbitrary range of passBand frequencies
  float passBand = map(x, 0, width, 100, 2000);
  bpf.setFreq(passBand);
  float bandWidth = map(y, 0, height, 50, 500);
  bpf.setBandWidth(bandWidth);
  // prints the new values of the coefficients in the console
  bpf.printCoeff();
  
  //translation of cube
  float cameraY = height/2.0;
  float fov = y/float(width) * PI/2;
  float cameraZ = cameraY / tan(fov / 2.0);
  float aspect = float(width)/float(height);
  
  perspective(fov, aspect, cameraZ/10.0, cameraZ*10.0);
  
  translate(width/2+30, height/2, 0);
  rotateX(-PI/6);
  rotateY(PI/3 + x/float(height) * PI);
  stroke(255, 0, 8, 60);
  strokeWeight(3);
  noFill();
  box(45);
  translate(0, 0, -50);
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

void stop()
{
  player.close();
  minim.stop();
  super.stop();
}
