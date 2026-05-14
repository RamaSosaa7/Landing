/**
 * PROYECTO: Perfumería Almerie - Arte Generativo
 * CONCEPTO: Representación de la volatilidad y estela de una fragancia.
 */

let particles = [];
const MAX_PARTICLES = 120; // Cantidad de "moléculas" de perfume

function setup() {
    const container = document.getElementById('canvas-parent');
    const canvasWidth = (container && container.offsetWidth > 0)
        ? container.offsetWidth
        : window.innerWidth * 0.9;
    const canvasHeight = 500;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-parent');

    for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(new EssenceParticle());
    }
}

function draw() {
    // Fondo negro verdoso (combinando con #020e02 del CSS) 
    // con un alpha bajo (25) para generar el efecto de "estela" o rastro visual
    background(2, 14, 2, 25); 

    // Dibujamos y actualizamos cada partícula
    for (let p of particles) {
        p.update();
        p.display();
    }
}

/**
 * Clase que define el comportamiento de cada molécula de perfume
 */
class EssenceParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        this.size = random(2, 5);
        // Color basado en el verde claro del proyecto (#d6ffbe)
        this.color = color(214, 255, 190, random(100, 200));
    }

    update() {
        this.pos.add(this.vel);

        // --- INTERACCIÓN CON EL MOUSE ---
        // Si el mouse está dentro del canvas, las partículas reaccionan
        let mouseDist = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        if (mouseDist < 120) {
            let repulsion = createVector(this.pos.x - mouseX, this.pos.y - mouseY);
            repulsion.normalize();
            repulsion.mult(2); // Fuerza de soplido o dispersión
            this.pos.add(repulsion);
        }

        // --- BORDES INFINITOS ---
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

/**
 * Ajusta el canvas si el usuario cambia el tamaño de la ventana (Responsividad)
 */
function windowResized() {
    const container = document.getElementById('canvas-parent');
    if (container) {
        resizeCanvas(container.offsetWidth, 500);
    }
}