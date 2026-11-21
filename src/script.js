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
            tagline: 'Conectando la ingeniería de sistemas físicos con arquitecturas backend escalables, pipelines ETL automatizados y soluciones de datos.',
            ctaProjects: 'Ver proyectos',
            ctaContact: 'Contactar'
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
            ctaDetail: 'Ver caso de estudio',
            backToList: 'Volver a Proyectos',
            viewRepo: 'Ver Repositorio GitHub',
            viewLive: 'Ver Demo en Vivo',
            notFoundTitle: 'Proyecto no encontrado',
            notFoundDesc: 'El proyecto solicitado no existe o fue movido.',
            prevProject: 'Anterior',
            nextProject: 'Siguiente',
            allProjects: 'Todos los proyectos',
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
            tagline: 'Bridging physical systems engineering with scalable backend architectures, automated ETL pipelines, and analytical data platforms.',
            ctaProjects: 'View Projects',
            ctaContact: 'Get in Touch'
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
            ctaDetail: 'View Case Study',
            backToList: 'Back to Projects',
            viewRepo: 'View GitHub Repository',
            viewLive: 'View Live Demo',
            notFoundTitle: 'Project Not Found',
            notFoundDesc: 'The requested project could not be found or has been moved.',
            prevProject: 'Previous',
            nextProject: 'Next',
            allProjects: 'All Projects',
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

    // If currently on a project detail page, re-render in selected language
    if (typeof currentRoute !== 'undefined' && currentRoute.view === 'project') {
        renderProjectDetail(currentRoute.projectId);
    } else {
        document.title = dict.meta.title;
    }

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
    const backToTopButton = document.getElementById('GoToTop');

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        const href = link.getAttribute('href');
        // Skip SPA route hashes like #/proyecto/... or #/
        if (!href || href.startsWith('#/')) return;

        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            // If on project detail view, route to home and let hash handle section
            if (typeof currentRoute !== 'undefined' && currentRoute.view === 'project') {
                e.preventDefault();
                window.location.hash = targetId;
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                try {
                    history.pushState(null, '', targetId);
                } catch (err) {}
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrolled = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;
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
   Single Page Application (SPA) Router & Project Detail View
   ========================================================================== */
let currentRoute = {
    view: 'home',
    projectId: null,
    section: null
};

function parseHash(hash) {
    if (!hash || hash === '#' || hash === '#/' || hash === '#Top') {
        return { view: 'home', projectId: null, section: hash === '#Top' ? 'Top' : null };
    }

    // Match #/proyecto/:id or #/project/:id
    const projectMatch = hash.match(/^#\/(?:proyecto|project)\/([a-zA-Z0-9_-]+)/);
    if (projectMatch) {
        return { view: 'project', projectId: projectMatch[1], section: null };
    }

    // Match in-page section jump, e.g. #PersonalProjects, #AboutMe
    if (hash.startsWith('#')) {
        const sectionId = hash.replace(/^#\/?/, '');
        return { view: 'home', projectId: null, section: sectionId };
    }

    return { view: 'home', projectId: null, section: null };
}

function renderProjectDetail(projectId) {
    const detailContainer = document.getElementById('projectDetailView');
    if (!detailContainer) return;

    const projects = window.PROJECTS_DATA || [];
    const projectIndex = projects.findIndex((p) => p.id === projectId);
    const project = projects[projectIndex];
    const lang = currentLang;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

    if (!project) {
        detailContainer.innerHTML = `
            <div class="project-detail-container">
                <div class="detail-content-card" style="text-align: center; padding: 60px 20px;">
                    <h2 style="color: var(--accent); font-size: 2.4rem; margin-bottom: 12px; font-family: 'JetBrains Mono', monospace;">404</h2>
                    <h3 style="color: var(--text-heading); margin-bottom: 14px; font-size: 1.5rem;">${dict.projects.notFoundTitle}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 24px;">${dict.projects.notFoundDesc}</p>
                    <a href="#PersonalProjects" class="btn btn-primary">← ${dict.projects.backToList}</a>
                </div>
            </div>
        `;
        return;
    }

    document.title = `${project.title[lang]} | Jayzir Martinez`;

    const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
    const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

    detailContainer.innerHTML = `
        <div class="project-detail-container">
            <!-- Top Bar with Back Button and Badges -->
            <div class="detail-top-bar">
                <a href="#PersonalProjects" class="btn-back">
                    <span class="back-arrow" aria-hidden="true">←</span>
                    <span>${dict.projects.backToList}</span>
                </a>
                <div class="detail-badge-group">
                    <span class="detail-category-badge">${project.category[lang]}</span>
                    <span class="detail-status-badge">${project.badge[lang]}</span>
                </div>
            </div>

            <!-- Hero Header -->
            <header class="detail-hero-header">
                <h1 class="detail-main-title">${project.title[lang]}</h1>
                <p class="detail-summary-lead">${project.summary[lang]}</p>
                <div class="detail-action-bar">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary detail-cta-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        <span>${dict.projects.viewRepo}</span>
                        <span class="external-icon" aria-hidden="true">↗</span>
                    </a>
                    ${project.demo ? `
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-outline detail-cta-btn">
                        <span>${dict.projects.viewLive}</span>
                        <span class="external-icon" aria-hidden="true">↗</span>
                    </a>` : ''}
                </div>
            </header>

            <!-- Key Metrics / Stats Cards -->
            <div class="detail-stats-grid">
                ${project.stats.map((s) => `
                    <div class="stat-card">
                        <span class="stat-label">${s.label[lang]}</span>
                        <span class="stat-value">${s.value}</span>
                    </div>
                `).join('')}
            </div>

            <!-- 01. Overview Section -->
            <section class="detail-content-card">
                <h2 class="detail-section-title">
                    <span class="section-num">01.</span>
                    ${lang === 'es' ? 'Visión General' : 'Overview'}
                </h2>
                <p class="detail-paragraph">${project.overview[lang]}</p>
            </section>

            <!-- 02. Problem & Pain Points -->
            <section class="detail-content-card">
                <h2 class="detail-section-title">
                    <span class="section-num">02.</span>
                    ${project.problem.title[lang]}
                </h2>
                <p class="detail-paragraph">${project.problem.description[lang]}</p>
                <div class="pain-points-box">
                    <h4 class="box-subtitle">${lang === 'es' ? 'Puntos de Dolor Identificados:' : 'Identified Pain Points:'}</h4>
                    <ul class="pain-points-list">
                        ${project.problem.painPoints[lang].map((pt) => `<li>${pt}</li>`).join('')}
                    </ul>
                </div>
            </section>

            <!-- 03. Architecture & Data Flow -->
            <section class="detail-content-card">
                <h2 class="detail-section-title">
                    <span class="section-num">03.</span>
                    ${project.architecture.title[lang]}
                </h2>
                <p class="detail-paragraph">${project.architecture.description[lang]}</p>
                
                <h4 class="box-subtitle">${lang === 'es' ? 'Flujo de Ejecución por Fases:' : 'Execution Pipeline Stages:'}</h4>
                <div class="architecture-pipeline">
                    ${project.architecture.flow[lang].map((f) => `
                        <div class="pipeline-card">
                            <div class="pipeline-step-badge">${f.step}</div>
                            <p class="pipeline-step-desc">${f.desc}</p>
                        </div>
                    `).join('')}
                </div>

                <h4 class="box-subtitle">${lang === 'es' ? 'Decisiones Clave de Ingeniería & Compensaciones (Trade-offs):' : 'Key Engineering Decisions & Trade-offs:'}</h4>
                <div class="decisions-grid">
                    ${project.architecture.keyDecisions[lang].map((d) => `
                        <div class="decision-card">
                            <div class="decision-title">⚡ ${d.title}</div>
                            <div class="decision-reason">${d.reason}</div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- 04. Technical Capabilities / Features -->
            <section class="detail-content-card">
                <h2 class="detail-section-title">
                    <span class="section-num">04.</span>
                    ${lang === 'es' ? 'Capacidades y Características Principales' : 'Key Technical Capabilities & Features'}
                </h2>
                <div class="features-grid">
                    ${project.features[lang].map((feat) => `
                        <div class="feature-item">
                            <h4 class="feature-item-title">✔ ${feat.title}</h4>
                            <p class="feature-item-desc">${feat.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- 05. Tech Stack -->
            <section class="detail-content-card">
                <h2 class="detail-section-title">
                    <span class="section-num">05.</span>
                    ${lang === 'es' ? 'Tecnologías y Herramientas' : 'Technologies & Tooling'}
                </h2>
                <div class="tech-tags-list">
                    ${project.tags.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </section>

            <!-- 06. Challenges & Solutions -->
            <section class="detail-content-card">
                <h2 class="detail-section-title">
                    <span class="section-num">06.</span>
                    ${lang === 'es' ? 'Desafíos de Ingeniería y Soluciones' : 'Engineering Challenges & Applied Solutions'}
                </h2>
                <div class="challenges-list">
                    ${project.challenges[lang].map((c, idx) => `
                        <div class="challenge-box">
                            <div class="challenge-header">
                                <span class="challenge-num">${idx + 1}</span>
                                <h4 class="challenge-title">${c.title}</h4>
                            </div>
                            <div class="challenge-body">
                                <div class="challenge-block">
                                    <span class="challenge-tag tag-challenge">${lang === 'es' ? 'Desafío Técnico' : 'Technical Challenge'}</span>
                                    <p>${c.challenge}</p>
                                </div>
                                <div class="challenge-block">
                                    <span class="challenge-tag tag-solution">${lang === 'es' ? 'Solución Implementada' : 'Engineered Solution'}</span>
                                    <p>${c.solution}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Impact Banner -->
            <div class="impact-card">
                <div class="impact-icon" aria-hidden="true">🚀</div>
                <div class="impact-content">
                    <h4>${lang === 'es' ? 'Impacto y Conclusión' : 'Impact & Takeaways'}</h4>
                    <p>${project.impact[lang]}</p>
                </div>
            </div>

            <!-- Bottom Project Navigation -->
            <nav class="project-bottom-nav" aria-label="Project pagination">
                ${prevProject ? `
                    <a href="#/proyecto/${prevProject.id}" class="nav-project-btn prev-btn">
                        <span class="nav-dir">← ${dict.projects.prevProject}</span>
                        <span class="nav-title">${prevProject.title[lang]}</span>
                    </a>
                ` : `<div></div>`}
                
                <a href="#PersonalProjects" class="nav-project-btn gallery-btn">
                    <span>⊞ ${dict.projects.allProjects}</span>
                </a>

                ${nextProject ? `
                    <a href="#/proyecto/${nextProject.id}" class="nav-project-btn next-btn">
                        <span class="nav-dir">${dict.projects.nextProject} →</span>
                        <span class="nav-title">${nextProject.title[lang]}</span>
                    </a>
                ` : `<div></div>`}
            </nav>
        </div>
    `;
}

function handleRouting() {
    const hash = window.location.hash || '';
    const route = parseHash(hash);
    currentRoute = route;

    const homeView = document.getElementById('homeView');
    const projectDetailView = document.getElementById('projectDetailView');

    if (!homeView || !projectDetailView) return;

    if (route.view === 'project') {
        homeView.setAttribute('hidden', '');
        projectDetailView.removeAttribute('hidden');
        renderProjectDetail(route.projectId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        projectDetailView.setAttribute('hidden', '');
        homeView.removeAttribute('hidden');
        document.title = TRANSLATIONS[currentLang].meta.title;

        if (route.section) {
            const targetEl = document.getElementById(route.section);
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            }
        }
    }
}

function initSpaRouter() {
    window.addEventListener('hashchange', handleRouting);
    handleRouting();
}

/* ==========================================================================
   Bootstrap
   ========================================================================== */
function bootstrapPortfolio() {
    initPreferences();
    initNavigation();
    initPortraitTilt();
    initAntigravityStars();
    initSpaRouter();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapPortfolio);
} else {
    bootstrapPortfolio();
}
