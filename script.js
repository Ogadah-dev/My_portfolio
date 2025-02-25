// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Sticky Header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
  skillBars.forEach(skill => {
    const skillPosition = skill.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (skillPosition < screenPosition) {
      const width = skill.getAttribute('data-width');
      skill.classList.add('animate');
      skill.style.width = width;
    }
  });
}

// Hero Background Animation
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particles
const particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = 'rgba(100, 255, 218, ' + (Math.random() * 0.3 + 0.1) + ')';
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Bounce off edges
    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  const maxDistance = 150;
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(100, 255, 218, ' + (1 - distance / maxDistance) * 0.2 + ')';
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  
  connectParticles();
  requestAnimationFrame(animate);
}

// Initialize particles
init();

// Start animation
animate();

// Run animations on scroll
window.addEventListener('scroll', () => {
  animateSkills();
});

// Run animations on load
window.addEventListener('load', () => {
  animateSkills();
});