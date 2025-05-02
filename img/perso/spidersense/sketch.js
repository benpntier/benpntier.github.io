const DOT = 0;
const STAR = 1;
const DIAMOND = 2;
const TRIANGLE = 3;
const SQUARE = 4;

const BG_COLOR = "#0c051a";
const CANVAS_X = 700;
const CANVAS_Y = 500;

let inPalette = ["#dcba35", "#2e6cb6", "#fa549b", "#e0655e", "#45a354", "#36c1cf", "#78CAB5"];
let outPalette = ["#b86132", "#5a348a", "#821784", "#a7312b", "#106e20", "#1f686f", "#4676A2"];
let shapesPaletteA = ["#4f0da0", "#2b124e", "#3d156e", "#5c1953", "#7e135c", "#a50074", "#770aab", "#2c1c51", "#231a55", "#6a1332"];
let shapesPaletteB = ["#2d3655", "#003545", "#004537", "#3c7036", "#2b9571", "#2a286a", "#6c266b", "#023a36", "#557129", "#681d3c"]

var fft, audio;
var xValue, yValue, colorId, circleSize, circleStroke, xMove, yMove, fillColor, strokeColor;
var rippleSize, rippleAlpha;
var bottomDeltaX, bottomDeltaY, bottomLineAlpha, cornerDeltaX, cornerDeltaY, cornerLineAlpha;
var circleCreated, shapesCreated;
var intense, lastPart, lastRipplesCreated;
var starX, starY, starXMove, starYMove, starLife, starInSize, starOutSize, starMode;
var shapeColor, shapeAngle, shapeStroke;

var drumCircles = [];
var drumRipples = [];
var triangles = [];
var squares = [];
var dots = [];
var diamonds = [];

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preload() {
	audio = loadSound("img/perso/spidersense/intro.mp3");
  audio.onended(initialize);
}

function setup() {
  angleMode(DEGREES);

  let canvas = createCanvas(CANVAS_X, CANVAS_Y);
  //canvas.parent("p5-container");

  // initiate the FFT object
  fft = new p5.FFT();

  // initialize variables
  initialize();
}

function initialize() {
  bottomDeltaX = 50;
  bottomDeltaY = 15;
  bottomLineAlpha = 255;
  cornerDeltaX = 145;
  cornerDeltaY = 140;
  cornerLineAlpha = 255;
  circleCreated = false;
  shapesCreated = false;
  intense = false;
  lastPart = false;
  lastRipplesCreated = false;
  starLife = 0;
  starMode = false;
}

function draw() {
  background(BG_COLOR);
  
  // Run the analysis, while the audio is playing
  fft.analyze();

  var treble  = fft.getEnergy("treble");
  var bass = fft.getEnergy("bass");
  var mid = fft.getEnergy("mid");
  var highMid = fft.getEnergy("highMid");

  if (audio.isPlaying()) {

    if (bass > 235 && starLife == 0) {
      starMode = true;
    }
    
    // drum circle + ripples
    if (treble < 40) {
      colorId = getRandomInteger(0, inPalette.length-1);
      fillColor = inPalette[colorId];
      strokeColor = outPalette[colorId];
      xValue = random(10, 60)*10;
      yValue = random(10, 40)*10;

      xMove = Math.random() < 0.5 ? -1 : 1;
      yMove = Math.random() < 0.5 ? -1 : 1;

      circleCreated = false;
    } else {
      if (!circleCreated && drumCircles.length < 2) {
        drumCircles.push(new DrumCircle(xValue, yValue, fillColor, strokeColor, xMove, yMove));
        drumRipples.push(new DrumRipples(xValue, yValue, xMove, yMove));

        circleCreated = true;
      }
    }

    // ripples of the very last drum sound
    if (highMid >= 150 && !lastRipplesCreated) {
      xValue = random(10, 60)*10;
      yValue = random(10, 40)*10;
      xMove = Math.random() < 0.5 ? -1 : 1;
      yMove = Math.random() < 0.5 ? -1 : 1;

      drumRipples.push(new DrumRipples(xValue, yValue, xMove, yMove, true));
      lastRipplesCreated = true;
    }

    // evolve and display ripples
    for (var i = 0; i < drumRipples.length; i++) {
      drumRipples[i].evolve();
      drumRipples[i].display();
    }

    // lines and shapes
    if (intense) {
      // bottom lines
      if (bottomLineAlpha > 0) {
        bottomLines(bottomDeltaX, bottomDeltaY, bottomLineAlpha);
        bottomDeltaY += 3;
        bottomLineAlpha -= 5;
      }

      // corner lines
      if (mid >= 150) {
        lastPart = true;
      }
      if (lastPart && cornerLineAlpha > 0) {
        cornerLines(cornerDeltaX, cornerDeltaY, cornerLineAlpha);
        cornerDeltaX -= 2;
        cornerDeltaY += 2;
        cornerLineAlpha -= 4;
      }

      // shapes
      if (treble < 70) {
        shapesCreated = false;
      } else {
        if (!shapesCreated) {

          // DOTS
          for (var i = 0; i < 10; i++) {
            shapeColor = shapesPaletteB[getRandomInteger(0, shapesPaletteB.length-1)];
            shapeAngle = random(0, 360);
            shapeStroke = (Math.random() < 0.2);

            dots.push(new Shape(DOT, shapeColor, shapeAngle, shapeStroke));
          }

          // TRIANGLES
          for (var i = 0; i < 5; i++) {
            shapeColor = shapesPaletteA[getRandomInteger(0, shapesPaletteA.length-1)];
            shapeAngle = random(0, 360);
            shapeStroke = (Math.random() < 0.5);

            triangles.push(new Shape(TRIANGLE, shapeColor, shapeAngle, shapeStroke));
          }

          // SQUARES
          for (var i = 0; i < 4; i++) {
            shapeColor = shapesPaletteB[getRandomInteger(0, shapesPaletteB.length-1)];
            shapeAngle = random(0, 360);
            shapeStroke = (Math.random() < 0.1);

            squares.push(new Shape(SQUARE, shapeColor, shapeAngle, shapeStroke));
          }
        }
        shapesCreated = true;
      }

      // evolve and display shapes
      for (var i = 0; i < dots.length; i++) {
        dots[i].evolve(treble*.08);
        dots[i].display();
      }
      for (var i = 0; i < triangles.length; i++) {
        triangles[i].evolve(bass*.01 + treble*.2);
        triangles[i].display();
      }
      for (var i = 0; i < squares.length; i++) {
        squares[i].evolve(bass*.01 + treble*.2);
        squares[i].display();
      }

    }

    // drum circles
    circleSize = treble*.75;
    circleStroke = treble/5;
    if (drumCircles.length > 2) {
      drumCircles[0].dying = true; // no more than 2
    }
    for (var i = 0; i < drumCircles.length; i++) {
      drumCircles[i].evolve(circleSize, circleStroke);
      drumCircles[i].display();
    }

    // activate star drum
    if (starMode) {
      if (starLife < 45) {
        starLife++;
      } else {
        starMode = false;
      }
    }

  } else {
    // audio paused
    if (audio.isLoaded()) {
      // play button
      fill("#FDE1F0"); // off-white
      noStroke();
      triangle(320, 217, 380, 250, 320, 283);
    }
  }
}

// play/pause audio on click
function mousePressed(){
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
  
}

// bottom lines
function bottomLines(deltaX, deltaY, lineAlpha) {
  strokeWeight(7);

  stroke(154, 134, 227, lineAlpha * .25);
  line(deltaX, CANVAS_Y-deltaY, CANVAS_X-deltaX, CANVAS_Y-deltaY - 7, -10);

  stroke(154, 134, 227, lineAlpha * .5);
  line(deltaX, CANVAS_Y-deltaY + 40, CANVAS_X-deltaX, CANVAS_Y-deltaY + 40 - 7, -10);

  stroke(154, 134, 227, lineAlpha * .75);
  line(deltaX, CANVAS_Y-deltaY + 80, CANVAS_X-deltaX, CANVAS_Y-deltaY + 80 - 7, -10);

  stroke(154, 134, 227, lineAlpha);
  line(deltaX, CANVAS_Y-deltaY + 120, CANVAS_X-deltaX, CANVAS_Y-deltaY + 120 - 7, -10);
}

// corner lines
function cornerLines(deltaX, deltaY, lineAlpha) {
  strokeWeight(7);

  stroke(154, 134, 227, lineAlpha);
  line(CANVAS_X-deltaY, -deltaX, CANVAS_X+deltaX, deltaY);

  stroke(154, 134, 227, lineAlpha * .75);
  line(CANVAS_X-deltaY - 30, -deltaX + 30, CANVAS_X+deltaX - 30, deltaY + 30);

  stroke(154, 134, 227, lineAlpha * .45);
  line(CANVAS_X-deltaY - 60, -deltaX + 60, CANVAS_X+deltaX - 60, deltaY + 60);
}

// star shape
function star(x, y, radius1, radius2, npoints) {
  push();
  angleMode(RADIANS);
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}

// shape constructor: dot, star, diamond (abandoned), triangle or square
class Shape {
  constructor(shape, c, r, s) {
    this.shape = shape;
    this.xValue = random(0, 30)*10;
    this.yValue = random(0, 30)*10;
    this.color = c;
    this.size = 0;
    this.rotation = r;
    this.xMove = Math.random() < 0.5 ? -.5 : .5;
    this.yMove = Math.random() < 0.5 ? -.5 : .5;
    this.stroke = s;
    this.dying = false;
    this.life = 0;
  }
  display() {
    angleMode(DEGREES);
    if (this.size > 0) {
      push();
      /*
      if (starVisible) {
        this.shape = STAR;
      }
      */
      if (this.stroke) {
        fill(BG_COLOR);
        stroke(this.color);
        if (this.shape == DOT) {
          strokeWeight(2);
        } else if (this.shape == STAR) {
          strokeWeight(3);
        } else if (this.shape == DIAMOND) {
          strokeWeight(3);
        } else if (this.shape == TRIANGLE) {
          strokeWeight(5);
        } else if (this.shape == SQUARE) {
          strokeWeight(3);
        }
      } else {
        fill(this.color);
        noStroke();
      }
      // translate and rotate canvas to display shapes with an angle
      translate(CANVAS_X/2, CANVAS_Y/2);
      if (this.rotation > -1) {
        rotate(this.rotation);
      }

      // draw shape
      if (this.shape == DOT) {
        circle(this.xValue, this.yValue, this.size);
      } else if (this.shape == STAR) {
        star(this.xValue, this.yValue, this.size, this.size*2, 9)
      } else if (this.shape == DIAMOND) {
        quad(
          this.size + this.xValue, this.yValue,
          this.size*2 + this.xValue, this.size/.6 + this.yValue,
          this.size + this.xValue, this.size/.3 + this.yValue,
          this.xValue, this.size/.6 + this.yValue
        );
      } else if (this.shape == TRIANGLE) {
        const side = this.size;
        const x1 = side * cos(0) + this.xValue, y1 = side * sin(0);
        const x2 = side * cos(120) + this.xValue, y2 = side * sin(120);
        const x3 = side * cos(240) + this.xValue, y3 = side * sin(240);
        triangle(x1, y1, x2, y2, x3, y3);
      } else if (this.shape == SQUARE) {
        square(this.xValue, this.yValue, this.size, 2);
      }
      pop();
    } else {
      // remove first element of the array when it's gone
      if (this.shape == DOT) {
        dots.shift();
      } else if (this.shape == DIAMOND) {
        diamonds.shift();
      } else if (this.shape == TRIANGLE) {
        triangles.shift();
      } else if (this.shape == SQUARE) {
        squares.shift();
      }
    }
  }
  evolve(newSize) {
    if (this.dying) {
      this.size = max(0, this.size-1);
    } else {
      this.size = newSize;
      if (this.life > 50) {
        this.dying = true;
      } else {
        this.life++;
      }
    }
    if (this.shape == TRIANGLE) {
      this.xValue += (this.xMove);
    } else if (this.shape == SQUARE || this.shape == DOT || this.shape == DIAMOND) {
      this.xValue += this.xMove;
      this.yValue += this.yMove;
    }
    if (this.rotation > -1) {
      this.rotation += (this.xMove/4);
    }
    
  }
}

class DrumCircle {
  constructor(x, y, f, s, xm, ym) {
    this.xValue = x;
    this.yValue = y;
    this.diameter = 0;
    this.fillColor = f;
    this.strokeColor = s;
    this.strokeWeight = 0;
    this.life = 0;
    this.dying = false;
    this.xMove = xm;
    this.yMove = ym;
    this.star = false;
  }
  display() {
    if (this.diameter > 0) {
      // turn into a star when star mode is activated
      if (starMode) {
        this.star = true;
      }
      if (this.star) {
        // draw star
        fill(BG_COLOR);
        stroke("#E3B232");
        strokeWeight(this.strokeWeight);
        star(this.xValue, this.yValue, this.diameter*.7, this.diameter*1.4, 11);
      } else {
        // draw circle
        stroke(this.strokeColor);
        fill(this.fillColor);
        strokeWeight(this.strokeWeight);
        circle(this.xValue, this.yValue, this.diameter);
      }
    } else {
      // remove first circle when it's gone
      drumCircles.shift();
    }

  }
  evolve(newSize, newStroke) {
    if (this.dying) {
      this.diameter = max(0, this.diameter-2);
      this.strokeWeight = max(0, this.strokeWeight-.5);
    } else {
      this.diameter = newSize;
      this.strokeWeight = newStroke;
      if (this.life > 50) {
        this.dying = true;
      } else {
        this.life++;
      }
    }
    if (this.life > 50 && starLife == 0) {
      // start intense mode when a circle lasts longer than 50 frames
      intense = true;
    }
    this.xValue += (this.xMove / 4);
    this.yValue += (this.yMove / 4);
    
  }
}

class DrumRipples {
  constructor(x, y, xm, ym, slow=false) {
    this.xValue = x;
    this.yValue = y;
    this.xMove = xm;
    this.yMove = ym;
    this.size = 100;
    this.alpha = 255;
    this.slow = slow;
  }
  display() {
    if (this.alpha > 0) {
      fill(0, 0, 0, 0);

      stroke(61, 41, 133, this.alpha * 0.85);
      strokeWeight(3);
      circle(this.xValue, this.yValue, this.size * 1.5);

      stroke(61, 41, 133, this.alpha * 0.90);
      strokeWeight(4);
      circle(this.xValue, this.yValue, this.size * 1.25);

      stroke(61, 41, 133, this.alpha * 0.95);
      strokeWeight(5);
      circle(this.xValue, this.yValue, this.size);

      stroke(61, 41, 133, this.alpha);
      strokeWeight(6);
      circle(this.xValue, this.yValue, this.size * 0.75);
    } else {
      drumRipples.shift();
    }

  }
  evolve() {
    if (this.slow) {
      this.size += 4;
      this.alpha = max(0, this.alpha-3);
      this.xValue += (this.xMove / 4);
      this.yValue += (this.yMove / 4);
    } else {
      this.size +=5 ;
      this.alpha = max(0, this.alpha-5);
      this.xValue += (this.xMove / 4);
      this.yValue += (this.yMove / 4);
    }

  }
}