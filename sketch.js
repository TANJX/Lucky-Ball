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
}

// https://nonty.net/font/jackey_font/

let img_logo;
let img_coin;
let img_button_down;
let img_button_up;
let img_rod_center;
let img_rod_left;
let img_rod_right;


function draw() {
  // Displays the image at its actual size at point (0,0)
  noSmooth();

  fill('#d4d4d4');
  noStroke();
  rect(0, 0, width, height);

  fill('#818181');
  noStroke();
  rect(0, height * 0.85, width, height * 0.2);

  image(img_coin, width * 0.7, 0, 128, 128);

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

  image(img_rod, width * 0.5, height * 0.85 - 128, 256, 256);
  image(img_button, width * 0.5 + 250, height * 0.85 - 128, 256, 256);

  image(img_logo, 16, 16, 7 * 8 * 5, 8 * 5);
}
