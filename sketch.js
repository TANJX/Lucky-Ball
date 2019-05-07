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
  img_launcher = loadImage('assets/launcher.png');

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
let img_launcher;

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

  fill('#505c81');
  noStroke();
  rect(0, height - 130, width, 130);

  image(img_launcher, (width - 180) * launcher_location / 100, 0, 180, 180);
  fill('rgba(100,100,100,0.28)');
  noStroke();
  rect(0, 0, width, 90);


  let img_button;
  let img_rod;

  if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    img_rod = img_rod_left;
    launcher_location -= 1;
  } else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
    img_rod = img_rod_right;
    launcher_location += 1;
  } else {
    img_rod = img_rod_center;
  }

  if (launcher_location < 0) {
    launcher_location = 0;
  } else if (launcher_location > 100) {
    launcher_location = 100;
  }

  if (keyIsDown(88) || keyIsDown(32)) {
    img_button = img_button_down;
  } else {
    img_button = img_button_up;
  }

  image(img_button, width - 450, height - 130 - 140, 256, 256);
  image(img_rod, width - 256, height - 130 - 140, 256, 256);

  image(img_coin, width - 256, 0, 96, 96);
  fill('#000');
  text('123', width - 256 + 105, 30);
  image(img_logo, 24, 24, 7 * 8 * 6, 8 * 6);
}

let coins = 5;
let launcher_location = 50;