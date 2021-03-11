const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let circleArray = [];

//* setting the width of the canvas equals to the height and width of the window

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

//*creating a random function

function random(max, min) {
    return Math.random() * (max - min) + min;
}

//*creating mouse object

const mouse = {
    x: undefined,
    y: undefined,
};

//*interacring with the paerticles

function movementCoordinates(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}

function init() {
    circleArray = [];
    for (i = 0; i < 1000; i++) {
        circleArray.push(new Circle());
    }
}
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}
canvas.addEventListener("mousemove", movementCoordinates);
window.addEventListener("resize", resize);

const colors = ["#BF0B3B", "#D50DD9", "#1835D9", "#238C2A", "#F2B90C"];

//*creating circle class

class Circle {
    constructor() {
        this.x = random(width, 0);
        this.y = random(height, 0);
        this.radius = random(1, 0.5);
        this.r = this.radius;
        this.vx = random(0.5, -0.5);
        this.vy = random(0.5, -0.5);
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    //* HERE WE ARE ENSURING THAT NO PARTICLE GOES OUT OF THE WINDOW

    update() {
        if (this.x + this.radius > width || this.x + this.radius < 0) {
            this.vx = -this.vx;
        }
        if (this.y + this.radius > height || this.y + this.radius < 0) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    }

    increaseSize() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;

        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 50 && this.radius < 15) {
            this.radius += 1;
        } else if (this.radius > this.r) {
            this.radius -= 0.5;
        }
    }
}

//*populating the circle array
init();
//* handle particles
function handleParticle() {
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].increaseSize();
        circleArray[i].update();
        circleArray[i].draw();
    }
}

//*creating circles on canvas
function animate() {
    ctx.fillStyle = "rgba(1,1,1)";
    ctx.fillRect(0, 0, width, height);
    handleParticle();
    requestAnimationFrame(animate);
}
animate();
