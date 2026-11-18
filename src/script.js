/* ==========================================================================
   Translations Dictionary (ES / EN)
   ========================================================================== */
const TRANSLATIONS = {
    es: {
        meta: {
            title: 'Jayzir Martinez | Ingeniero Backend & de Datos'
        },
        hero: {
            greeting: 'Hola, mi nombre es',
            role: 'Ingeniero Backend & de Datos | Base en Mecatrónica',
            tagline: 'Conectando la ingeniería de sistemas físicos con arquitecturas backend escalables, pipelines ETL automatizados y soluciones de datos.'
        },
        nav: {
            about: 'Sobre mí',
            projects: 'Proyectos',
            tech: 'Tecnologías',
            contact: 'Contacto'
        },
        about: {
            title: 'Sobre mí',
            bio: '¡Hola! Soy <span>Jayzir Martinez</span>, <span>Ingeniero Mecatrónico</span> graduado de la Universidad de Barranquilla (IUB), especializado en <span>Arquitectura Backend e Ingeniería de Datos</span>. Formado a través de programas intensivos orientados a la industria en RIWI y SENA, uno la ingeniería de sistemas físicos con arquitecturas backend escalables, pipelines ETL automatizados y almacenes de datos analíticos.'
        },
        projects: {
            title: 'Proyectos Destacados',
            sourceTitle: 'Ver código fuente',
            p1: {
                category: 'Ingeniería de Datos / ETL',
                desc: 'Pipeline ETL analítico de extremo a extremo impulsado por Apache Airflow (CeleryExecutor y RabbitMQ), Data Warehouse en PostgreSQL y microservicio de catálogo de productos en FastAPI, totalmente contenedorizado con Docker.'
            },
            p2: {
                category: 'Arquitectura de Datos / BI',
                desc: 'Data Warehouse dimensional (Esquema Estrella y SCD Tipo 2) diseñado para resolver consultas analíticas complejas, gestionar eventos con llegada tardía (>24h) y automatizar compuertas de calidad de datos.'
            },
            p3: {
                category: 'Simulación Física / App Web',
                title: 'Ocularis — Simulación Óptica',
                desc: 'Aplicación web interactiva de simulación óptica y educación para pacientes dirigida a optómetras. Modela trazado de rayos, errores refractivos focales y física de lentes correctivos en tiempo real.'
            },
            p4: {
                category: 'API Backend',
                desc: 'API REST asíncrona de alto rendimiento conectada a bases de datos relacionales, implementando arquitectura limpia, enrutamiento modular y validación de datos con Pydantic.'
            }
        },
        tech: {
            title: 'Lenguajes y Tecnologías',
            subtitle: 'Haz clic en cualquier tecnología para visitar su sitio oficial.'
        },
        contact: {
            title: 'Contacto',
            emailLabel: 'Correo'
        },
        ui: {
            backToTop: 'Volver arriba',
            switchToLight: 'Cambiar a modo claro',
            switchToDark: 'Cambiar a modo oscuro'
        },
        footer: {
            credit: '< Construido por Jayzir Martinez / 2026 >'
        }
    },
    en: {
        meta: {
            title: 'Jayzir Martinez | Backend & Data Engineer'
        },
        hero: {
            greeting: 'Hi, my name is',
            role: 'Backend & Data Engineer | Mechatronics Background',
            tagline: 'Bridging physical systems engineering with scalable backend architectures, automated ETL pipelines, and analytical data platforms.'
        },
        nav: {
            about: 'About Me',
            projects: 'Projects',
            tech: 'Tech Stack',
            contact: 'Contact'
        },
        about: {
            title: 'About Me',
            bio: "Hi! I'm <span>Jayzir Martinez</span>, a <span>Mechatronics Engineer</span> graduated from the Universidad de Barranquilla (IUB), specialized in <span>Backend Architecture & Data Engineering</span>. Trained through intensive industry programs at RIWI and SENA, I bridge physical systems engineering with scalable backend architectures, automated ETL pipelines, and analytical data warehouses."
        },
        projects: {
            title: 'Featured Projects',
            sourceTitle: 'View Source Code',
            p1: {
                category: 'Data Engineering / ETL',
                desc: 'End-to-end analytical ETL pipeline powered by Apache Airflow (CeleryExecutor & RabbitMQ), PostgreSQL Data Warehouse, and FastAPI product catalog microservice, fully containerized with Docker.'
            },
            p2: {
                category: 'Data Architecture / BI',
                desc: 'Dimensional Data Warehouse (Star Schema & SCD Type 2) designed to resolve complex analytical queries, handle late-arriving events (>24h), and automate data quality gates.'
            },
            p3: {
                category: 'Physics Simulation / Web App',
                title: 'Ocularis — Optical Simulation',
                desc: 'Interactive optical simulation and patient education web app for optometrists. Models ray tracing, focal refractive errors, and corrective lens physics in real time.'
            },
            p4: {
                category: 'Backend API',
                desc: 'High-throughput asynchronous REST API connected to relational databases, implementing clean architecture, modular routing, and Pydantic data validation.'
            }
        },
        tech: {
            title: 'Languages & Technologies',
            subtitle: 'Click any technology to visit its official website.'
        },
        contact: {
            title: 'Contact',
            emailLabel: 'Email'
        },
        ui: {
            backToTop: 'Back to top',
            switchToLight: 'Switch to light mode',
            switchToDark: 'Switch to dark mode'
        },
        footer: {
            credit: '< Built by Jayzir Martinez / 2026 >'
        }
    }
};

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

/* ==========================================================================
   Language (ES / EN) & Theme (Dark / Light) State Management
   ========================================================================== */
let currentLang = 'es';
let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

function updateThemeButtonLabel() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const dict = TRANSLATIONS[currentLang];
    const label = currentTheme === 'dark' ? dict.ui.switchToLight : dict.ui.switchToDark;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
}

function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'es';
    currentLang = lang;
    const dict = TRANSLATIONS[lang];

    document.documentElement.setAttribute('lang', lang);
    document.title = dict.meta.title;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const value = getNestedValue(dict, el.getAttribute('data-i18n'));
        if (value !== null) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const value = getNestedValue(dict, el.getAttribute('data-i18n-html'));
        if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        const value = getNestedValue(dict, el.getAttribute('data-i18n-title'));
        if (value !== null) {
            el.setAttribute('title', value);
            el.setAttribute('aria-label', value);
        }
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        const isActive = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });

    updateThemeButtonLabel();

    try {
        localStorage.setItem('portfolio_lang', lang);
    } catch (e) {}
}

function applyTheme(theme) {
    currentTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.setAttribute('content', currentTheme === 'dark' ? '#0a192f' : '#f4f7fb');
    }

    updateThemeButtonLabel();

    try {
        localStorage.setItem('portfolio_theme', currentTheme);
    } catch (e) {}
}

function initPreferences() {
    let savedLang = null;
    let savedTheme = null;
    try {
        savedLang = localStorage.getItem('portfolio_lang');
        savedTheme = localStorage.getItem('portfolio_theme');
    } catch (e) {}

    const initialLang = savedLang || (navigator.language && navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es');
    const initialTheme = savedTheme || 'dark';

    applyTheme(initialTheme);
    applyLanguage(initialLang);

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.getAttribute('data-lang'));
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
}

/* ==========================================================================
   Smooth Navigation & Floating Scroll Controls
   ========================================================================== */
function initNavigation() {
    const smoothLinks = document.querySelectorAll('nav a[href^="#"], #sideMenu a[href^="#"], header h2 a[href^="#"]');
    const backToTopButton = document.getElementById('GoToTop');
    const sideMenu = document.getElementById('sideMenu');

    smoothLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrolled = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;
        if (sideMenu) sideMenu.classList.toggle('visible', scrolled);
        if (backToTopButton) backToTopButton.classList.toggle('visible', scrolled);
    }, { passive: true });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ==========================================================================
   Interactive 3D Tilt / Parallax on Orbital Portrait
   ========================================================================== */
function initPortraitTilt() {
    const stage = document.getElementById('portraitStage');
    const hero = document.querySelector('header');
    if (!stage || !hero) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth * 0.45)));
        const deltaY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight * 0.45)));

        const rotateY = deltaX * 12;
        const rotateX = -deltaY * 10;
        stage.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
        stage.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
}

/* ==========================================================================
   Antigravity Interactive Stars Canvas (Theme-Aware)
   ========================================================================== */
function initAntigravityStars() {
    const canvas = document.getElementById('antigravity-stars');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
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

    function getCanvasPalette() {
        if (currentTheme === 'light') {
            return {
                accentRgb: '13, 148, 136',
                neutralRgb: '100, 116, 139',
                shadowHex: '#0d9488',
                lineMultiplier: 0.22,
                cursorMultiplier: 0.35
            };
        }
        return {
            accentRgb: '100, 255, 218',
            neutralRgb: '204, 214, 246',
            shadowHex: '#64ffda',
            lineMultiplier: 0.16,
            cursorMultiplier: 0.35
        };
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.alpha = Math.random() * 0.6 + 0.3;
            this.alphaSpeed = (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
            this.isAccent = Math.random() > 0.68;
        }

        draw(palette) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            if (this.isAccent) {
                ctx.fillStyle = `rgba(${palette.accentRgb}, ${this.alpha})`;
                ctx.shadowColor = palette.shadowHex;
                ctx.shadowBlur = currentTheme === 'light' ? 3 : 6;
            } else {
                const neutralAlpha = currentTheme === 'light' ? this.alpha * 0.55 : this.alpha;
                ctx.fillStyle = `rgba(${palette.neutralRgb}, ${neutralAlpha})`;
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        update() {
            this.alpha += this.alphaSpeed;
            if (this.alpha > 0.95 || this.alpha < 0.2) {
                this.alphaSpeed = -this.alphaSpeed;
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
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

    function connectParticles(palette) {
        const maxDistance = 105;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.hypot(dx, dy);

                if (dist < maxDistance) {
                    const opacity = (1 - dist / maxDistance) * palette.lineMultiplier;
                    ctx.strokeStyle = `rgba(${palette.accentRgb}, ${opacity})`;
                    ctx.lineWidth = 0.65;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            if (mouse.x !== null && mouse.y !== null) {
                const mdx = particles[a].x - mouse.x;
                const mdy = particles[a].y - mouse.y;
                const mdist = Math.hypot(mdx, mdy);
                if (mdist < mouse.radius) {
                    const mOpacity = (1 - mdist / mouse.radius) * palette.cursorMultiplier;
                    ctx.strokeStyle = `rgba(${palette.accentRgb}, ${mOpacity})`;
                    ctx.lineWidth = 0.85;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        const palette = getCanvasPalette();
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw(palette);
            particles[i].update();
        }
        connectParticles(palette);
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

/* ==========================================================================
   Bootstrap
   ========================================================================== */
function bootstrapPortfolio() {
    initPreferences();
    initNavigation();
    initPortraitTilt();
    initAntigravityStars();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapPortfolio);
} else {
    bootstrapPortfolio();
}
