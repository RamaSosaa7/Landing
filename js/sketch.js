let particles = [];
const MAX_PARTICLES = 400; 

function setup() {
    const container = document.getElementById('p5-banner-bg');
    
    const bannerWidth = container ? container.offsetWidth : window.innerWidth;
    const bannerHeight = container ? container.offsetHeight : window.innerHeight;

    const canvas = createCanvas(bannerWidth, bannerHeight);
    
    if (container) {
        canvas.parent('p5-banner-bg');
    }

    for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(new EssenceParticle());
    }
}

function draw() {
    background(2, 14, 2, 20); 

    for (let p of particles) {
        p.update();
        p.display();
    }
}

class EssenceParticle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.4, 0.4), random(-0.4, 0.4)); 
        this.size = random(2, 5); 
        this.color = color(214, 255, 190, 180); 
    }

    update() {
        this.pos.add(this.vel);

        let mouseDist = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        if (mouseDist < 120) {
            let repulsion = createVector(this.pos.x - mouseX, this.pos.y - mouseY);
            repulsion.normalize();
            repulsion.mult(2); 
            this.pos.add(repulsion);
        }

        if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
        if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

function windowResized() {
    const container = document.getElementById('p5-banner-bg');
    if (container) {
        resizeCanvas(container.offsetWidth, container.offsetHeight);
    }
}