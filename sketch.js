// 🌳 No-Sound Version: Mobile Ratio, Multi-Green Leaves, Stronger Wind Boost
let leaves = [];
let moveX = 0;
let moveY = 0;

function setup() {
  createCanvas(450, 675); // 🔧 修改畫布尺寸
  frameRate(60);
  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  noStroke();

  for (let y = 30; y < height - 30; y += random(30, 50)) {
    for (let x = 30; x < width - 30; x += random(30, 60)) {
      let clusterCount = int(random(1, 3));
      for (let j = 0; j < clusterCount; j++) {
        let offsetX = random(-15, 15);
        let offsetY = random(-15, 15);
        leaves.push(new LeafCluster(x + offsetX, y + offsetY));
      }
    }
  }
}

function draw() {
  background(255);
  drawBranches();

  moveX = mouseX - pmouseX;
  moveY = mouseY - pmouseY;

  for (let lc of leaves) {
    lc.update(moveX, moveY);
    lc.display();
  }
}

function drawBranches() {
  stroke(0);
  noFill();

  strokeWeight(15);
  beginShape();
  curveVertex(245, 675); curveVertex(245, 675); curveVertex(433, 482); curveVertex(433, 482);
  endShape();

  beginShape();
  curveVertex(0, 630); curveVertex(0, 630); curveVertex(170, 520); curveVertex(253, 392);
  curveVertex(245, 337); curveVertex(245, 337);
  endShape();

  beginShape();
  curveVertex(0, 550); curveVertex(0, 550); curveVertex(80, 482); curveVertex(80, 337);
  curveVertex(0, 205); curveVertex(0, 205);
  endShape();

  strokeWeight(8);
  beginShape();
  curveVertex(245, 337); curveVertex(245, 337); curveVertex(340, 205); curveVertex(405, 110);
  curveVertex(412, 0); curveVertex(412, 0);
  endShape();

  beginShape();
  curveVertex(245, 337); curveVertex(245, 337); curveVertex(155, 215); curveVertex(88, 45);
  curveVertex(88, 45);
  endShape();

  beginShape();
  curveVertex(80, 482); curveVertex(80, 482); curveVertex(208, 197); curveVertex(143, 0);
  curveVertex(143, 0);
  endShape();

  strokeWeight(4);
  beginShape();
  curveVertex(245, 675); curveVertex(245, 675); curveVertex(225, 550); curveVertex(245, 490);
  curveVertex(245, 490);
  endShape();

  beginShape();
  curveVertex(253, 392); curveVertex(253, 392); curveVertex(368, 357); curveVertex(450, 285);
  curveVertex(450, 285);
  endShape();

  beginShape();
  curveVertex(340, 205); curveVertex(340, 205); curveVertex(285, 0); curveVertex(285, 0);
  endShape();

  beginShape();
  curveVertex(155, 215); curveVertex(155, 215); curveVertex(55, 187); curveVertex(55, 187);
  endShape();
}

class LeafCluster {
  constructor(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.tOffset = random(1000);
    this.chars = [];
    let count = int(random(33, 45));
    for (let i = 0; i < count; i++) {
      let angle = random(TWO_PI);
      let radius = random(6, 18);
      let cx = cos(angle) * radius + random(-2, 2);
      let cy = sin(angle) * radius + random(-2, 2);
      let leaf = new LeafChar(this.baseX + cx, this.baseY + cy);
      this.chars.push(leaf);
    }
  }

  update(moveX, moveY) {
    let t = millis() * 0.001 + this.tOffset;
    let swayX = sin(t) * 2;
    let swayY = cos(t * 0.8) * 1.5;
    for (let c of this.chars) {
      c.offset(swayX, swayY);

      if (mouseIsPressed) {
        let d = dist(mouseX, mouseY, c.x, c.y);
        if (d < 60) {
          c.vx += moveX * 0.2;
          c.vy += moveY * 0.2;
        }
      }
      c.vx *= 0.92;
      c.vy *= 0.92;
    }
  }

  display() {
    for (let c of this.chars) {
      c.display();
    }
  }
}

class LeafChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.ch = String.fromCharCode(int(random(33, 126)));
    this.size = random(8, 12);
    this.color = random([
      color(170, 200, 120),
      color(170, 200, 120),
      color(170, 200, 120),
      color(140, 180, 100),
      color(120, 160, 90),
      color(100, 140, 70)
    ]);
  }

  offset(ox, oy) {
    this.dx = ox + this.vx;
    this.dy = oy + this.vy;
  }

  display() {
    let tx = this.x + this.dx;
    let ty = this.y + this.dy;

    fill(this.color);
    noStroke();
    textSize(this.size);
    text(this.ch, tx, ty);
  }
}
