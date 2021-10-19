
const cards = document.querySelectorAll(".card");
const wrap = document.querySelector(".wrap");

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  console.log(rect)
  console.log(el)
  console.log(window.innerHeight)
  console.log(window.innerWidth)
  console.log(document.documentElement.clientHeight)
  console.log(document.documentElement.clientWidth)
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (
    window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth));

}

function isCardVisible() {
  for (card of cards) {
    isElementInViewport(card) ?
    card.classList.add("isVisible") : 
    card.classList.remove("isVisible"); 
  }
}

document.addEventListener("DOMContentLoaded", isCardVisible);
window.addEventListener("scroll", isCardVisible);
wrap.addEventListener("scroll", isCardVisible);
window.addEventListener("resize", isCardVisible);

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var rAF;


var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    particles = [],
    mouseX = 0,
    mouseY = 0,
    total = 15,
    followSpeed = 0.1,
    size = 25;

document.body.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

function init() {
    cancelAnimationFrame(rAF);

    particles = [];

    for (var i = 0; i < total; i += 1) {
        particles.push(new Particle(i));
    }

    draw();
}

function draw() {
    context.clearRect(0, 0, width, height);

    for (var i = 0; i < total; i += 1) {
        particles[i].update();
    }

    rAF = requestAnimationFrame(draw);
}


/**
 * Particle
 */
var Particle, p;

Particle = function (index) {
    this.initialize(index);
};

p = Particle.prototype;

p.initialize = function (index) {
    this.x = -50;
    this.y = height;
    this.id = index + 1;
    this.angleX = Math.PI * 2 * Math.random();
    this.angleY = Math.PI * 2 * Math.random();
    this.speedX = .03 * Math.random() + .03;
    this.speedY = .03 * Math.random() + .03;
    this.radius = 150;

    return this;
};

p.update = function () {
    var aim, dx, dy, scale, angle;

    if (this.id > 1) {
        aim = particles[this.id - 1 - 1];
        dx = aim.x - this.x;
        dy = aim.y - this.y;

        this.x += dx * con.speed;
        this.y += dy * con.speed;
    } else {
        if (mouseX === 0 && mouseY === 0) {
            dx = width / 2 + Math.cos(this.angleX) * this.radius - this.x;
            dy = height / 2 + Math.sin(this.angleY) * this.radius - this.y;

            this.x = width / 2 + Math.cos(this.angleX) * this.radius;
            this.y = height / 2 + Math.sin(this.angleY) * this.radius;

            this.angleX += this.speedX;
            this.angleY += this.speedY;

        } else {
            dx = mouseX - this.x;
            dy = mouseY - this.y;

            this.x += dx * con.speed;
            this.y += dy * con.speed;
        }
    }

    angle = Math.atan2(dy, dx);
    scale = Math.cos(Math.PI / 2 * (this.id / total));

    context.save();
    context.translate(this.x, this.y);
    context.rotate(angle);
    context.scale(scale, scale);

    context.beginPath();
    context.moveTo(-size / 2 * 1.732, -size / 2);
    context.lineTo(0, 0);
    context.lineTo(-size / 2 * 1.732, size / 2);
    context.lineTo(-size / 2 * 1.2, 0);
    context.fillStyle = 'white';
    context.fill();

    context.restore();
};

// control bar
var ControlBar = function () {
    this.num = total;
    this.speed = followSpeed;
};

var con = new ControlBar();
var gui = new dat.GUI();
var conSpeed = gui.add(con, 'speed', 0.05, 0.25).step(0.05);
var conNum = gui.add(con, 'num', 10, 30).step(1);

conNum.onFinishChange(function (value) {
    total = value;

    init();
});

init();








