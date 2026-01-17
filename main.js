
import * as THREE from 'three';

// --- FeatureCard Web Component --- //
class FeatureCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const cardTitle = this.getAttribute('card-title');
    shadow.innerHTML = `
      <style>
        .card { padding: 2rem; }
        h3 {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--primary-color, #2c5c3b);
          margin: 0 0 1rem 0;
        }
        .content ::slotted(span) {
          font-size: 1rem;
          line-height: 1.7;
          color: #444;
        }
      </style>
      <div class="card">
        <h3>${cardTitle}</h3>
        <div class="content"><slot name="content"></slot></div>
      </div>
    `;
  }
}
customElements.define('feature-card', FeatureCard);

// --- Header Scroll Effect --- //
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// --- Mobile Navigation --- //
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const body = document.querySelector('body');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    body.classList.toggle('nav-open');
    if (mobileNav.classList.contains('active')) {
        hamburger.innerHTML = '&times;'; // Change to close icon
    } else {
        hamburger.innerHTML = '&#9776;'; // Change back to hamburger
    }
});

// Close mobile nav when a link is clicked
mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mobileNav.classList.remove('active');
        body.classList.remove('nav-open');
        hamburger.innerHTML = '&#9776;';
    }
});


// --- Three.js Dynamic Background --- //
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // Particles
    const particleCount = window.innerWidth < 768 ? 2000 : 5000; // Fewer particles on mobile
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 5000);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 2.5,
        color: 0x2c5c3b, // 로고의 녹색
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Event Listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    if (window.innerWidth < 1024) return; // Disable mouse move effect on tablet/mobile
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
    if (!renderer) return;
    requestAnimationFrame(animate);

    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (-mouseY - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    if (particles) {
        particles.rotation.y = time * 0.5;
        particles.rotation.x = time * 0.25;
    }

    renderer.render(scene, camera);
}

init();
animate();
