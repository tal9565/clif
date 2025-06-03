    let a = -1.4;
    let b = 1.6;
    let c = 1.0;
    let d = 0.7;

    let x = 0.1;
    let y = 0.1;

    function setup() {
      createCanvas(1000, 800);
      background(0);
      stroke(255, 10);
      strokeWeight(0.3);
      noFill();
    }

    function draw() {
      translate(width / 2, height / 2);
      
      for (let i = 0; i < 10000; i++) {
        let x_new = Math.sin(a * y) + c * Math.cos(a * x);
        let y_new = Math.sin(b * x) + d * Math.cos(b * y);
        
        point(x_new * 200, y_new * 200);
        
        x = x_new;
        y = y_new;
      }

      // Animate parameters very slowly for smooth organic shifts
      a += 0.0002 * Math.sin(frameCount * 0.0007);
      b += 0.0002 * Math.cos(frameCount * 0.0006);
      c += 0.00015 * Math.sin(frameCount * 0.0005);
      d += 0.00015 * Math.cos(frameCount * 0.0004);
    }