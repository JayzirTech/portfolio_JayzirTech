const navLinks = document.querySelectorAll('nav a[href^="#"]');
const backToTopButton = document.getElementById("GoToTop");
const sideMenu = document.getElementById("sideMenu");

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.onscroll = function () {
    const scrollPos = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;

    if (scrollPos) {
        sideMenu.classList.add("visible");
        backToTopButton.classList.add("visible");
    } else {
        sideMenu.classList.remove("visible");
        backToTopButton.classList.remove("visible");
    }
};

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ==========================================================================
   Antigravity Interactive Stars Canvas
   ========================================================================== */
function initAntigravityStars() {
    const canvas = document.getElementById('antigravity-stars');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouse = {
        x: null,
        y: null,
        radius: 140
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.alpha = Math.random() * 0.6 + 0.3;
            this.alphaSpeed = (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
            // 30% glowing cyan (#64ffda), 70% soft starry silver (#ccd6f6)
            this.isCyan = Math.random() > 0.7;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            if (this.isCyan) {
                ctx.fillStyle = `rgba(100, 255, 218, ${this.alpha})`;
                ctx.shadowColor = '#64ffda';
                ctx.shadowBlur = 6;
            } else {
                ctx.fillStyle = `rgba(204, 214, 246, ${this.alpha})`;
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        update() {
            // Star twinkling
            this.alpha += this.alphaSpeed;
            if (this.alpha > 0.95 || this.alpha < 0.2) {
                this.alphaSpeed = -this.alphaSpeed;
            }

            // Natural space drift
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Interactive reaction to cursor (Anti-gravity repulsion)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    // Smoothly push particle away
                    this.x -= Math.cos(angle) * force * 4.5;
                    this.y -= Math.sin(angle) * force * 4.5;
                }
            }
        }
    }

    let particles = [];
    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((width * height) / 9500), 140);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const maxDistance = 105;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.hypot(dx, dy);

                if (dist < maxDistance) {
                    const opacity = (1 - dist / maxDistance) * 0.16;
                    ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            // Subtle luminous ray connecting nearby stars directly to the cursor
            if (mouse.x !== null && mouse.y !== null) {
                const mdx = particles[a].x - mouse.x;
                const mdy = particles[a].y - mouse.y;
                const mdist = Math.hypot(mdx, mdy);
                if (mdist < mouse.radius) {
                    const mOpacity = (1 - mdist / mouse.radius) * 0.35;
                    ctx.strokeStyle = `rgba(100, 255, 218, ${mOpacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAntigravityStars);
} else {
    initAntigravityStars();
}