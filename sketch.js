// // --- Attractor Parameters ---
// let a = -1.4;
// let b = 1.6;
// let c = 1.0;
// let d = 0.7;

// let x = 0.1;
// let y = 0.1;

// // --- Overlay Parameters ---
// let nodes = [];
// let shapes = ['rect', 'ellipse', 'triangle'];
// let currentIndex = 0;
// let animationStep = 0;
// let totalSteps = 60;
// let startTime = 0;

// function setup() {
//   createCanvas(1400, 800);
//   background(0);
//   stroke(255,0,0);
//   strokeWeight(0.3);
//   noFill();

//   initOverlay();
// }

// function draw() {
//   // --- ATTRACTOR ---
//   push();
//   translate(width / 2, height / 2);
//   for (let i = 0; i < 10000; i++) {
//     let x_new = sin(a * y) + c * cos(a * x);
//     let y_new = sin(b * x) + d * cos(b * y);
//     point(x_new * 200, y_new * 200);
//     x = x_new;
//     y = y_new;
//   }

//   a += 0.0002 * sin(frameCount * 0.07);
//   b += 0.0002 * cos(frameCount * 0.06);
//   c += 0.00015 * sin(frameCount * 0.05);
//   d += 0.00015 * cos(frameCount * 0.04);
//   pop();

//   // --- OVERLAY ---
//   if (millis() - startTime > 30000) {
//     initOverlay();
//   }

//   if (currentIndex === 0) {
//     drawShape(nodes[0]);
//     drawLabel(nodes[0]);
//     currentIndex++;
//   }

//   if (currentIndex < nodes.length) {
//     let prev = nodes[currentIndex - 1];
//     let curr = nodes[currentIndex];

//     let t = animationStep / totalSteps;
//     let xLine = prev.x + (curr.x - prev.x) * t;
//     let yLine = prev.y + (curr.y - prev.y) * t;

//     let dx = curr.x - prev.x;
//     let dy = curr.y - prev.y;
//     let angle = atan2(dy, dx);
//     let perp = angle + HALF_PI;
//     let curveAmp = 20 * sin(t * PI);

//     let cx = xLine + cos(perp) * curveAmp;
//     let cy = yLine + sin(perp) * curveAmp;

//     stroke(255,255,255,1);
//     strokeWeight(1);
//     point(cx, cy);

//     animationStep++;

//     if (animationStep >= totalSteps) {
//       drawShape(curr);
//       drawLabel(curr);
//       currentIndex++;
//       animationStep = 0;
//     }
//   }
// }

// function drawShape(n) {
//   noFill();
//   stroke(255,0,0);
//   strokeWeight(1);
//   if (n.shapeType === 'rect') {
//     rect(n.x - 8, n.y - 8, 16, 16);
//   } else if (n.shapeType === 'ellipse') {
//     ellipse(n.x, n.y, 16, 16);
//   } else if (n.shapeType === 'triangle') {
//     triangle(n.x, n.y - 10, n.x - 8, n.y + 8, n.x + 8, n.y + 8);
//   }
// }

// function drawLabel(n) {
//   noStroke();
//   fill(255,0,0);
//   textSize(12);
//   textFont('monospace');
//   text(`${n.x} ${n.y}`, n.x + 10, n.y);
// }

// function initOverlay() {
//   // Preserve attractor drawing, just overlay fresh content
//   nodes = [];
//   for (let i = 0; i < 30; i++) {
//     let x = int(random(100, width - 100));
//     let y = int(random(100, height - 100));
//     let shapeType = random(shapes);
//     nodes.push({ x, y, shapeType });
//   }
//   currentIndex = 0;
//   animationStep = 0;
//   startTime = millis();
// }

// --- Clifford Attractor Parameters ---
let a = -1.4;
let b = 1.6;
let c = 1.0;
let d = 0.7;

let x = 0.1;
let y = 0.1;

// --- Overlay (Node Graph) Parameters ---
let nodes = [];
let shapes = ['rect', 'ellipse', 'triangle'];
let currentIndex = 0;
let animationStep = 0;
let totalSteps = 60;
let startTime = 0;

function setup() {
  createCanvas(1400, 800);
  background(0); // Black background for attractor
  frameRate(60);
  strokeWeight(0.3);
  noFill();

  initOverlay();
}

function draw() {
  // --- Clifford Attractor (slowed down) ---
  push();
  translate(width / 2, height / 2);
  stroke(255, 10); // White, faint for attractor
  for (let i = 0; i < 500; i++) { // Slowed down
    let x_new = sin(a * y) + c * cos(a * x);
    let y_new = sin(b * x) + d * cos(b * y);
    point(x_new * 200, y_new * 200);
    x = x_new;
    y = y_new;
  }

  // Slower evolution of parameters
  a += 0.00005 * sin(frameCount * 0.0002);
  b += 0.00005 * cos(frameCount * 0.0002);
  c += 0.00003 * sin(frameCount * 0.00015);
  d += 0.00003 * cos(frameCount * 0.00015);
  pop();

  // --- Overlay: Animated Red Node Graph ---
  if (millis() - startTime > 30000) {
    initOverlay();
  }

  if (currentIndex === 0) {
    drawShape(nodes[0]);
    drawLabel(nodes[0]);
    currentIndex++;
  }

  if (currentIndex < nodes.length) {
    let prev = nodes[currentIndex - 1];
    let curr = nodes[currentIndex];

    let t = animationStep / totalSteps;
    let xLine = prev.x + (curr.x - prev.x) * t;
    let yLine = prev.y + (curr.y - prev.y) * t;

    let dx = curr.x - prev.x;
    let dy = curr.y - prev.y;
    let angle = atan2(dy, dx);
    let perp = angle + HALF_PI;
    let curveAmp = 20 * sin(t * PI); // Curved trajectory

    let cx = xLine + cos(perp) * curveAmp;
    let cy = yLine + sin(perp) * curveAmp;

    stroke(255, 0, 0); // Red
    strokeWeight(1);
    point(cx, cy); // Draw curved red path

    animationStep++;

    if (animationStep >= totalSteps) {
      drawShape(curr);
      drawLabel(curr);
      currentIndex++;
      animationStep = 0;
    }
  }
}

function drawShape(n) {
  noFill();
  stroke(255, 0, 0); // Red
  strokeWeight(1);
  if (n.shapeType === 'rect') {
    rect(n.x - 8, n.y - 8, 16, 16);
  } else if (n.shapeType === 'ellipse') {
    ellipse(n.x, n.y, 16, 16);
  } else if (n.shapeType === 'triangle') {
    triangle(n.x, n.y - 10, n.x - 8, n.y + 8, n.x + 8, n.y + 8);
  }
}

function drawLabel(n) {
  noStroke();
  fill(255, 0, 0); // Red
  textSize(12);
  textFont('monospace');
  text(`${n.x} ${n.y}`, n.x + 10, n.y);
}

function initOverlay() {
  nodes = [];
  for (let i = 0; i < 30; i++) {
    let x = int(random(100, width + 100));
    let y = int(random(100, height - 100));
    let shapeType = random(shapes);
    nodes.push({ x, y, shapeType });
  }
  currentIndex = 0;
  animationStep = 0;
  startTime = millis();
}


