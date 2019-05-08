const debug = false;


function preload() {
  font = loadFont('fonts/8PXBUS.ttf');
  img_coin = loadImage('assets/coin.png');
  img_coin_x = loadImage('assets/coin_x.png');
  img_coin_in = loadImage('assets/coin_insert.png');
  img_coin_in_b = loadImage('assets/coin_insert_bottom.png');
  img_button_down = loadImage('assets/button_down.png');
  img_button_up = loadImage('assets/button_up.png');
  img_rod_center = loadImage('assets/rod_center.png');
  img_rod_left = loadImage('assets/rod_left.png');
  img_rod_right = loadImage('assets/rod_right.png');
  img_logo = loadImage('assets/logo.png');
  img_launcher = loadImage('assets/launcher.png');
  img_divider = loadImage('assets/divider.png');
  img_divider_left = loadImage('assets/divider_left.png');
  img_divider_right = loadImage('assets/divider_right.png');
  img_bump = loadImage('assets/bump.png');
  img_bump_active = loadImage('assets/bump_active.png');
  img_score = loadImage('assets/score.png');
  img_score_b = loadImage('assets/score_b.png');
  img_score_light = loadImage('assets/score_light.png');
  img_window = loadImage('assets/window.png');
  img_ball.push(loadImage('assets/ball_1.png'));
  img_ball.push(loadImage('assets/ball_2.png'));
  img_ball.push(loadImage('assets/ball_3.png'));
  img_ball.push(loadImage('assets/ball_4.png'));
  img_ball.push(loadImage('assets/ball_5.png'));
  img_emoji.push(loadImage('assets/emoji_1.png'));
  img_emoji.push(loadImage('assets/emoji_2.png'));
  img_reward.push(loadImage('assets/c1.png'));
  img_reward.push(loadImage('assets/c2.png'));
  img_reward.push(loadImage('assets/c3.png'));
  sound_hit = loadSound('sounds/hit.wav');
  sound_win = loadSound('sounds/win.wav');
  sound_lose = loadSound('sounds/lose.wav');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");


  frameRate(60);
  textFont(font);
  scores = shuffle(scores);
}

// https://nonty.net/font/jackey_font/

let font;

// sound
let sound_hit;
let sound_win;
let sound_lose;

// textures
let img_logo;
let img_coin;
let img_coin_x;
let img_coin_in;
let img_coin_in_b;
let img_button_down;
let img_button_up;
let img_rod_center;
let img_rod_left;
let img_rod_right;
let img_launcher;
let img_divider;
let img_divider_left;
let img_divider_right;
let img_bump;
let img_bump_active;
let img_score;
let img_score_b;
let img_score_light;
let img_window;
let img_ball = [];
let img_emoji = [];
let img_reward = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const width = windowWidth;
  const height = windowHeight;

  noSmooth();

  fill('#2b2b39');
  noStroke();
  rect(0, 0, width, height);

  // bumps

  const row_start = 260;
  const row_end = height - 250;
  const col_start = 120;
  const col_end = width - 120;
  // const rows = 8, cols = 0;
  const rows = 8, cols = 5;
  let row = row_start, col;
  bumps = [];
  fill('#1e2742');
  for (let i = 0; i < cols; i++) {
    let col = col_start;
    if (i % 2 === 0)
      col += (col_end - col_start) / rows / 2;
    for (let j = 0; j < rows + 1; j++) {
      if (j >= rows && i % 2 === 0) continue;

      if (bumps.length === hit_bump) {
        image(img_bump_active, col, row, 12, 12);
        hit_bump_count--;
        if (hit_bump_count < 0)
          hit_bump = -1;
      } else {
        image(img_bump, col, row, 12, 12);
      }
      bumps.push([col + 6, row + 6]);
      col += (col_end - col_start) / rows;
    }
    row += (row_end - row_start) / cols;
  }

  // dividers
  dividers = [];
  row -= 20;
  col = col_start + (col_end - col_start) / rows / 2;
  for (let j = 0; j < rows; j++) {
    if (j < rows - 1) {
      fill('#fff');
      textSize(52);
      textAlign(CENTER, TOP);
      const score = scores[j];
      if (score === 0) {
        image(img_score, col, row, 16 * 8, 16 * 8);
        image(img_emoji[int(Math.random() * img_emoji.length)], col + 16 * 3, row + 16 * 3, 32, 32);
      } else {
        image(img_score_b, col, row, 16 * 8, 16 * 8);
        image(img_reward[score - 1], col + 16 * 2, row + 16 * 2, 64, 64);
      }
    }

    // ball in light
    if (ball_in_count > 0 && dividers.length === ball_in) {
      ball_in_count--;
      if (parseInt(ball_in_count / 8) % 2 === 0) {
        image(img_score_light, col - (col_end - col_start) / rows * 2, row - 128, 16 * 8 * 3, 16 * 8 * 2);
      }
    }

    if (dividers.length === hit_divider) {
      if (hit_divider_left)
        image(img_divider_left, col - (col_end - col_start) / rows / 2, row, 16 * 8, 16 * 8);
      else
        image(img_divider_right, col - (col_end - col_start) / rows / 2, row, 16 * 8, 16 * 8);
      hit_divider_count--;
      if (hit_divider_count < 0)
        hit_divider = -1;
    } else {
      image(img_divider, col - (col_end - col_start) / rows / 2, row, 16 * 8, 16 * 8);
    }
    dividers.push([col + 5, row]);
    col += (col_end - col_start) / rows;
  }

  if (debug)
    for (const d of dividers) {
      fill('blue');
      rect(d[0], 0, 5, height);
    }

  // ball
  if (ball) {
    ball.move();
    ball.draw();
  }

  // lanucher
  image(img_launcher, (width - 220) * launcher_location / 100 + 20, 0, 180, 180);
  fill('rgba(100,100,100,0.28)');
  noStroke();
  rect(0, 0, width, 90);

  image(img_window, 0, 100, 700, 700);

  // border
  fill('#434d5e');
  rect(0, 90, 30, height); // left
  rect(width - 30, 90, 30, height); // right
  rect(0, height - 150, width, 40); // bottom


  // controller

  fill('#505c81');
  noStroke();
  rect(0, height - 130, width, 130);

  let img_button;
  let img_rod;

  // launcher moving
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

  // button press
  if (keyIsDown(88) || keyIsDown(32)) {
    img_button = img_button_down;
    launch();
  } else {
    img_button = img_button_up;
  }


  image(img_button, width - 500, height - 130 - 140, 256, 256);
  image(img_rod, width - 280, height - 130 - 140, 256, 256);

  image(img_coin_in, 125, height - 130, 128, 128);
  if (coin_in_count > 0) {
    image(img_coin, 125, height - 220 + (60 - coin_in_count) * 5, 128, 128);
    coin_in_count--;
  }
  fill('#505c81');
  noStroke();
  rect(0, height - 50, 125 + 128, 100);
  image(img_coin_in_b, 125, height - 130, 128, 128);
  fill('#ffffff');
  textSize(22);
  textAlign(LEFT, TOP);
  text('x / space to shoot', 270, height - 100);
  text('left / right to move', 270, height - 65);

  // top
  image(img_coin_x, width - 256, 0, 96, 96);
  fill('#e5e5e5');
  textSize(52);
  textAlign(LEFT, TOP);
  text(`${coins}`, width - 256 + 105, 30);
  image(img_logo, 24, 24, 7 * 8 * 6, 8 * 6);
}

function launch() {
  if (stage > 0) return;
  if (coins <= 0) return;
  coin_in_count = 60;
  coins--;
  score_random_count = -1;
  ball = new Ball((width - 180) * launcher_location / 100 + 90, 100, 80);
  stage = 1;
}

let stage = 0;

let coins = 5;
let launcher_location = 50;

const gravity = 0.6;

let bumps = [];
let dividers = [];
let scores = [0, 1, 2, 3, 2, 1, 1];
let ball;
let hit_bump = -1;
let hit_bump_count;
let hit_divider = -1;
let hit_divider_left = true; // true -> left, false -> right
let hit_divider_count;

let ball_in = -1;
let ball_in_count;

let coin_in_count = -1;

let score_random_count = -1;

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
    this.type = int(Math.random() * img_ball.length);
  }

  draw() {
    fill(this.color);
    noStroke();
    // ellipse(this.x, this.y, this.d, this.d);
    image(img_ball[this.type], this.x - this.d / 2, this.y - this.d / 2, this.d, this.d);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {

    // ball reaches the end
    if (this.y > windowHeight) {
      // first enter
      if (stage === 1 && score_random_count < 0) {
        stage = 0;
        score_random_count = 100;
        if (debug) {
          fill('#fff');
          rect(this.x, 0, 5, windowHeight);
        }
        // dividers array does not contain the
        for (let i = 0; i < dividers.length; i++) {
          const divider = dividers[i];
          if (divider[0] > this.x) {
            if (i === 0) break;
            coins += scores[i - 1];
            if (scores[i - 1] > 0) {
              sound_win.play();
              ball_in_count = 20;
              ball_in = i;
            }
            break;
          }
        }

        if (!sound_win.isPlaying()) {
          sound_lose.play();
        }
      } else if (stage === 0 && score_random_count >= 1) {
        scores = shuffle(scores);
        score_random_count--;
      }
      return;
    }

    // wall collision
    if (this.x + 20 < this.d / 2 || windowWidth - this.x - 20 < this.d / 2) {
      this.xv *= -1;
    }

    // bump collision
    let ifHit = false;
    for (let i = 0; i < bumps.length; i++) {
      const bump = bumps[i];
      const distance = dist(bump[0], bump[1], this.x, this.y);
      if (distance < this.d / 2) {
        ifHit = true;

        hit_bump = i;
        hit_bump_count = 5;

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
        this.xv = new_direction.x * mag * 0.9 + Math.random() * 0.02 - 0.01;
        this.yv = new_direction.y * mag * 0.9 + Math.random() * 0.02 - 0.01;

        sound_hit.play();
        break;
      }
    }


    // divider collision
    for (let i = 0; i < dividers.length; i++) {
      const divider = dividers[i];
      // if the ball goes to the bottom
      if (this.y + this.d / 2 > divider[1]) {
        if (abs(this.x - divider[0]) < this.d / 2) {
          // fix collision
          if (this.x > divider[0]) {
            this.x = divider[0] + this.d / 2;
          } else {
            this.x = divider[0] - this.d / 2;
          }

          hit_divider = i;
          hit_divider_count = 5;
          hit_divider_left = this.x - divider[0] < 0;

          this.xv *= -1;
          break;
        }
      }
    }

    this.x += this.xv;
    this.y += this.yv;
    if (!ifHit) {
      this.yv += gravity;
    }

  }
}

function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}