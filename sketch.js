function preload() {
  font = loadFont('fonts/8PXBUS.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");


  frameRate(20);
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

  fill('#ededed');
  noStroke();
  rect(0, 0, width, height);

  // ball
  if (ball) {
    ball.move();
    ball.draw();
  }

  // lanucher
  image(img_launcher, (width - 180) * launcher_location / 100, 0, 180, 180);
  fill('rgba(100,100,100,0.28)');
  noStroke();
  rect(0, 0, width, 90);

  // bumps

  const row_start = 260;
  const row_end = height - 220;
  const col_start = 100;
  const col_end = width - 100;
  const rows = 8, cols = 4;
  let row = row_start, col;
  bumps = [];
  fill('#1e2742');
  for (let i = 0; i < cols; i++) {
    let col = col_start;
    if (i % 2 === 0)
      col += (col_end - col_start) / rows / 2;
    for (let j = 0; j < rows; j++) {
      rect(col, row, 10, 10);
      bumps.push([col, row]);
      col += (col_end - col_start) / rows;
    }
    row += (row_end - row_start) / cols;
  }
  row -= 20;
  col = col_start + (col_end - col_start) / rows / 2;
  for (let j = 0; j < rows; j++) {
    rect(col, row, 10, 150);
    col += (col_end - col_start) / rows;
  }

  // controller

  fill('#505c81');
  noStroke();
  rect(0, height - 130, width, 130);

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
    launch();
  } else {
    img_button = img_button_up;
  }

  image(img_button, width - 500, height - 130 - 140, 256, 256);
  image(img_rod, width - 280, height - 130 - 140, 256, 256);

  image(img_coin, width - 256, 0, 96, 96);
  fill('#000');
  text('123', width - 256 + 105, 30);
  image(img_logo, 24, 24, 7 * 8 * 6, 8 * 6);
}

function launch() {
  if (stage > 0) return;
  ball = new Ball((width - 180) * launcher_location / 100 + 90, 100, 80);
}

let stage = 0;

let coins = 5;
let launcher_location = 50;

const gravity = 0.6;

let bumps = [];
let ball;
let i;

class Ball {
  // the constructor() is like setup() for each object instance. It runs once.
  constructor(x, y, d) {
    // copy the arguments passed in into locally stored properties using this.
    this.x = x;               // x and y are the position of the ball.
    this.y = y;
    this.d = d;               // d is the diameter of the ball.
    this.r = d / 2;             // r is the radius of the ball.
    this.xv = 0;   // xv and yv are the vectors of the ball.
    this.yv = 0;
    this.xv += 0;
    this.yv += 0;
    this.color = '#eea82c';
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.d, this.d);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    let ifHit = false;
    for (const bump of bumps) {
      const distance = dist(bump[0], bump[1], this.x, this.y);
      if (distance < this.d / 2) {
        ifHit = true;

        // Fix collision position
        let bump2ball = createVector(this.x - bump[0], this.y - bump[1]);
        bump2ball.normalize();
        bump2ball.mult(this.d / 2);
        let new_pos = createVector(bump[0], bump[1]);
        new_pos.add(bump2ball);
        this.x = new_pos.x;
        this.y = new_pos.y;

        // Calculate bouncing direction
        let l = createVector(-this.xv, -this.yv);
        const mag = l.mag();
        l.normalize();
        let normal = createVector(this.x - bump[0], this.y - bump[1]);
        normal.normalize();
        const new_direction = normal.mult(l.dot(normal) * 2).sub(l);
        this.xv = new_direction.x * mag * 0.9;
        this.yv = new_direction.y * mag * 0.9;
        break;
      }
    }

    this.x += this.xv;               // x and y are the position of the ball.
    this.y += this.yv;
    if (!ifHit) {
      this.yv += gravity;
    }
  }
}