function preload() {
  font = loadFont('fonts/8PXBUS.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");


  frameRate(60);
  img_coin = loadImage('assets/coin.png'); // Load the image
  img_button_down = loadImage('assets/button_down.png');
  img_button_up = loadImage('assets/button_up.png');
  img_rod_center = loadImage('assets/rod_center.png');
  img_rod_left = loadImage('assets/rod_left.png');
  img_rod_right = loadImage('assets/rod_right.png');
  img_logo = loadImage('assets/logo.png');

  textFont(font);
  textSize(52);
  textAlign(LEFT, TOP);
}

// https://nonty.net/font/jackey_font/

let font;

let img_logo;
let img_coin;
let img_button_down;
let img_button_up;
let img_rod_center;
let img_rod_left;
let img_rod_right;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const width = windowWidth;
  const height = windowHeight;

  // Displays the image at its actual size at point (0,0)
  noSmooth();

  fill('#d4d4d4');
  noStroke();
  rect(0, 0, width, height);

  fill('#818181');
  noStroke();
  rect(0, height * 0.85, width, height * 0.2);

  fill('#afafaf');
  noStroke();
  rect(0, 0, width, height * 0.1);


  let img_button;
  let img_rod;

  if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    img_rod = img_rod_left;
  } else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
    img_rod = img_rod_right;
  } else {
    img_rod = img_rod_center;
  }

  if (keyIsDown(88) || keyIsDown(32)) {
    img_button = img_button_down;
  } else {
    img_button = img_button_up;
  }

  image(img_button, width - 450, height * 0.85 - 128, 256, 256);
  image(img_rod, width - 256, height * 0.85 - 128, 256, 256);

  image(img_coin, width - 256, 0, 96, 96);
  fill('#000');
  text('123', width - 256 + 105, 30);
  image(img_logo, 24, 24, 7 * 8 * 6, 8 * 6);
}
