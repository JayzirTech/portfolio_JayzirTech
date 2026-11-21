/**
 * ==========================================================================
 * Project: Visiometric Labs — Suite de Simulación Óptica
 * Integrador de módulos: Ocularis + Simulador de Filtros
 * ==========================================================================
 */
(function () {
    const ocularisRef = (typeof window !== 'undefined' && window.OCULARIS_MODULE) 
        ? window.OCULARIS_MODULE 
        : (typeof require !== 'undefined' ? require('./ocularis.js') : null);

    const filtersRef = (typeof window !== 'undefined' && window.FILTERS_SIMULATOR_MODULE) 
        ? window.FILTERS_SIMULATOR_MODULE 
        : (typeof require !== 'undefined' ? require('./filters-simulator.js') : null);

    const visiometricSuite = {
        id: 'visiometric-suite',
        isSuite: true,
        version: 'v2.0-suite',
        title: {
            es: 'Visiometric Labs — Suite de Simulación Óptica',
            en: 'Visiometric Labs — Optical Simulation Suite'
        },
        shortTitle: {
            es: 'Visiometric Labs (Suite)',
            en: 'Visiometric Labs (Suite)'
        },
        category: {
            es: 'Simulación Física / Mecatrónica & Óptica',
            en: 'Physics Simulation / Mechatronics & Optics'
        },
        badge: {
            es: 'Suite Médica & Óptica Integrada',
            en: 'Integrated Vision Tech Suite'
        },
        painSummary: {
            es: 'Resuelve la brecha de comprensión en la salud visual entre el especialista y el paciente: una suite interactiva de simulación física que modela defectos refractivos en tiempo real (Ocularis) y demuestra el impacto real de los filtros de lentes (Simulador de Filtros).',
            en: 'Bridges the communication gap in vision health between specialists and patients: an interactive physics simulation suite modeling refractive errors in real time (Ocularis) and demonstrating the true impact of ophthalmic lens coatings (Filters Simulator).'
        },
        github: 'https://github.com/visiometric-labs/filters-simulator.git',
        demo: 'https://visiometric-labs.github.io/filters-simulator/',
        specs: [
            { key: { es: 'Arquitectura de la Suite', en: 'Suite Architecture' }, value: 'Multi-módulo desacoplado en Vanilla JS (Zero Dependencies)' },
            { key: { es: 'Motor de Renderizado', en: 'Rendering Engine' }, value: 'HTML5 Canvas 2D con aceleración gráfica por hardware' },
            { key: { es: 'Rendimiento en Vivo', en: 'Live Framerate' }, value: '60 FPS continuos en pantallas táctiles y escritorio' },
            { key: { es: 'Modelos Físicos', en: 'Physics Engines' }, value: 'Refracción paraxial de Snell + Transmitancia espectral fotónica' },
            { key: { es: 'Módulos Integrados', en: 'Integrated Modules' }, value: '1. Ocularis (Refracción) | 2. Simulador de Filtros (Tratamientos)' },
            { key: { es: 'Compatibilidad Clínica', en: 'Clinical Compatibility' }, value: 'Tablets de mostrador, iPads, Monitores de gabinete' }
        ],
        stats: [
            { label: { es: 'Rendimiento Gráfico', en: 'Rendering Speed' }, value: '60 FPS' },
            { label: { es: 'Módulos Especializados', en: 'Clinical Modules' }, value: '2 Motores' },
            { label: { es: 'Dependencias Externas', en: 'Bundle Overhead' }, value: '0 KB (Vanilla)' },
            { label: { es: 'Tiempo de Carga', en: 'Startup Latency' }, value: '< 400 ms' }
        ],
        tags: ['Vanilla JavaScript', 'HTML5 Canvas 2D', 'Snell Ray-Tracing', 'Spectral Filtering', 'Physical Simulation', 'Zero Dependencies', 'Clinical UI/UX'],
        overview: {
            es: 'Visiometric Labs es una suite completa de simulación física y tecnología visual diseñada para transformar la experiencia en la consulta optométrica y oftálmica. Desarrollada uniendo los principios de la ingeniería mecatrónica (modelado de sistemas físicos, control y cálculo numérico) con interfaces visuales de alto rendimiento, la suite integra dos motores complementarios: Ocularis (dedicado al modelado anatómico y defectos refractivos) y el Simulador de Filtros (dedicado a la demostración de tratamientos de lentes y protección espectral).',
            en: 'Visiometric Labs is an end-to-end physics simulation and vision tech suite engineered to redefine clinical ophthalmic consultations. Combining mechatronics engineering principles (physical modeling, real-time numerical solvers, and control) with high-performance web graphics, the suite brings together two complementary engines: Ocularis (anatomical refraction and dioptric lens modeling) and the Filters Simulator (spectral coatings and light transmission).'
        },
        problem: {
            title: {
                es: 'El Problema Clínico & Dolor de Negocio',
                en: 'The Clinical Problem & Business Challenge'
            },
            description: {
                es: 'En el sector de la salud visual existe una desconexión crítica entre el diagnóstico profesional y la percepción del paciente: por un lado, las personas no comprenden por qué su ojo enfoca mal (miopía, hipermetropía, astigmatismo) al recibir prescripciones con cifras abstractas de dioptrías; por otro lado, rechazan comprar recubrimientos protectores esenciales (filtro de luz azul, antirreflejo multicapa, fotocromáticos) porque los folletos estáticos y muestrarios físicos rayados no demuestran su valor real. Esto genera desconfianza, consultas prolongadas y pérdida de ventas de alto valor.',
                en: 'In vision healthcare, a persistent disconnect exists between clinical diagnosis and patient perception: patients struggle to understand why their eye focuses poorly when handed abstract numbers, and they routinely reject essential protective lens coatings (blue light cut, anti-glare, photochromic) because static pamphlets and scratched physical demo paddles fail to prove real-world visual benefits. This results in prolonged consultation times, patient skepticism, and lost clinic revenues.'
            },
            painPoints: {
                es: [
                    'Explicaciones médicas abstractas que generan confusión y falta de adherencia al tratamiento.',
                    'Muestrarios de plástico en mostrador deteriorados, poco higiénicos y con nula interactividad.',
                    'Dificultad para justificar el costo de tratamientos oftálmicos de alta gama sin una prueba visual convincente.',
                    'Software existente de laboratorio clínico excesivamente pesado, cerrado y costoso para puntos de atención.'
                ],
                en: [
                    'Abstract clinical terminology leading to patient confusion and reluctance to wear prescribed lenses.',
                    'Scratched, unhygienic physical lens demo paddles on clinic desks with zero interactive engagement.',
                    'Difficulty justifying premium lens coating upgrades without real-time visual proof of efficacy.',
                    'Existing medical laboratory packages are heavy, proprietary, and too cumbersome for front-desk consultations.'
                ]
            }
        },
        suiteModules: [
            {
                id: 'ocularis',
                route: '#/proyecto/visiometric-suite/ocularis',
                title: {
                    es: 'Módulo 1: Ocularis — Simulación de Refracción & Anatomía Ocular',
                    en: 'Module 1: Ocularis — Refractive & Eye Anatomy Simulation'
                },
                shortTitle: {
                    es: 'Ocularis (Refracción)',
                    en: 'Ocularis (Refraction)'
                },
                desc: {
                    es: 'Simula el ojo humano como un sistema óptico convergente, calculando el trazado de rayos de Snell para demostrar anomalías refractivas (miopía, hipermetropía, astigmatismo) y su corrección con lentes diótricos en tiempo real a 60 FPS.',
                    en: 'Simulates the human eye as a convergent optical system, solving Snell paraxial ray tracing to demonstrate refractive errors (myopia, hyperopia, astigmatism) and corrective lenses in real time at 60 FPS.'
                },
                tags: ['Snell Ray-Tracing', 'Paraxial Optics', 'Sliders Dioptrías', 'HTML5 Canvas', '60 FPS'],
                demo: 'https://jayzirtech.github.io/ocularis/',
                github: 'https://github.com/JayzirTech/ocularis'
            },
            {
                id: 'filters-simulator',
                route: '#/proyecto/visiometric-suite/filters-simulator',
                title: {
                    es: 'Módulo 2: Simulador de Filtros Ópticos — Recubrimientos & Tratamientos',
                    en: 'Module 2: Optical Filters Simulator — Lens Coatings & Treatments'
                },
                shortTitle: {
                    es: 'Simulador de Filtros (Recubrimientos)',
                    en: 'Filters Simulator (Coatings)'
                },
                desc: {
                    es: 'Simulador clínico interactivo que modela la transmitancia espectral de recubrimientos oftálmicos (corte de luz azul 415nm, antirreflejo con supresión de destellos parásitos, oscurecimiento fotocromático UV y polarizado anti-reflejo de agua/asfalto).',
                    en: 'Interactive clinical simulator modeling the spectral transmission of lens coatings (415nm blue light cut, anti-glare parasitic reflection suppression, photochromic UV tinting, and Brewster polarized glare extinction).'
                },
                tags: ['Spectral Filtering', 'Canvas 2D', 'Anti-Glare Suppression', 'Photochromic LERP', 'Zero Dependencies'],
                demo: 'https://visiometric-labs.github.io/filters-simulator/',
                github: 'https://github.com/visiometric-labs/filters-simulator.git'
            }
        ],
        codeSnippet: {
            filename: 'src/visiometric/suite_core_orchestrator.js',
            lang: 'javascript',
            code: `// Visiometric Labs: Optical Simulation Suite Core Architecture
export class VisiometricSuite {
    constructor() {
        this.modules = {
            ocularis: { name: 'Ocularis Refraction Engine', ready: true },
            filters: { name: 'Spectral Filters Engine', ready: true }
        };
    }

    /**
     * Integrates refractive calculation with spectral coating simulation
     * to visualize the patient's corrected visual experience.
     */
    simulateIntegratedConsultation(patientData, lensConfig) {
        const { sphericalError, astigmatismAxis } = patientData;
        const { diopters, blueCut, antiReflective, photochromic } = lensConfig;

        // Step 1: Compute Snell ray convergence (Ocularis module)
        const refractiveResult = this.modules.ocularis.computeRayTracing({
            diopters,
            retinalDistance: sphericalError < 0 ? 26.5 : 22.0
        });

        // Step 2: Compute spectral transmission & glare extinction (Filters module)
        const spectralResult = this.modules.filters.applyFilterPipeline({
            blueCutActive: blueCut,
            glareSuppressed: antiReflective,
            uvLevel: photochromic ? 0.75 : 0.0
        });

        return {
            focalAccuracy: refractiveResult.inFocus,
            retinalBlurRadius: refractiveResult.blurCircleRadius,
            contrastEnhancement: spectralResult.contrastBoost,
            framerate: 60
        };
    }
}`
        },
        architecture: {
            title: {
                es: 'Arquitectura Modular de la Suite',
                en: 'Suite Modular Architecture & Data Flow'
            },
            description: {
                es: 'Ecosistema de simulación desacoplado en dos motores físicos independientes con una capa de control unificada.',
                en: 'Decoupled simulation ecosystem consisting of two independent physics engines bound by a unified UI controller layer.'
            },
            flow: [
                { step: '01. Diagnóstico Refractivo', desc: 'Módulo Ocularis: Selección de patología (miopía/hipermetropía/astigmatismo) y ajuste de potencia diótrica en tiempo real.' },
                { step: '02. Trazado Paraxial de Rayos', desc: 'Resolución trigonométrica analítica que muestra cómo el haz de luz converge exactamente en el plano retiniano.' },
                { step: '03. Evaluación de Tratamientos', desc: 'Módulo Filtros: Simulación interactiva de recubrimientos (filtro azul para pantallas, antirreflejo para noche, fotocromático para sol).' },
                { step: '04. Renderizado Canvas 60 FPS', desc: 'Composición gráfica acelerada por GPU en navegadores móviles y desktop sin instalación de software.' },
                { step: '05. Convicción y Decisión Clínica', desc: 'El paciente experimenta de forma visual e inmediata la diferencia antes/después de sus nuevos lentes.' }
            ],
            keyDecisions: [
                {
                    title: 'Arquitectura Web Pura (Vanilla JS) sin Frameworks Pesados',
                    reason: 'Garantiza inicio instantáneo (< 400 ms) en iPads y tablets de consulta con conectividad variable en consultorios u ópticas.'
                },
                {
                    title: 'Modularidad Estricta entre Refracción y Recubrimientos',
                    reason: 'Permite utilizar Ocularis de forma autónoma durante el examen médico o activar el Simulador de Filtros durante la asesoría comercial.'
                },
                {
                    title: 'Aceleración por Hardware en Canvas 2D',
                    reason: 'Evita la sobrecarga de shaders WebGL innecesarios, maximizando la autonomía de batería y fluidez en tablets de mostrador.'
                }
            ]
        },
        challenges: [
            {
                title: 'Unificación de Dos Paradigmas de Simulación Distintos',
                challenge: 'Ocularis se basa en geometría óptica vectorial (rayos de luz), mientras que el Simulador de Filtros opera sobre composición espacial de imágenes y manipulación de color espectral.',
                solution: 'Diseño de un contrato de interfaz común desacoplado que comparte el bucle de renderizado requestAnimationFrame sin dependencias cruzadas.'
            },
            {
                title: 'Experiencia Táctil Inmediata en Mostradores Comerciales',
                challenge: 'En la consulta óptica el tiempo del profesional es escaso; la herramienta no puede requerir calibración ni tiempos de espera.',
                solution: 'Arquitectura sin estado en cliente (stateless client-side) que inicia al instante con escenas preconfiguradas de alto impacto visual.'
            }
        ],
        impact: {
            es: 'Visiometric Labs posiciona la tecnología visual y la ingeniería física al servicio de la salud visual, transformando explicaciones médicas complejas en demostraciones interactivas que aumentan la confianza del paciente y optimizan la prescripción óptica.',
            en: 'Visiometric Labs brings optical physics and visual technology to healthcare practices, turning complex medical jargon into intuitive live simulations that elevate patient trust and drive optical prescription success.'
        },
        subModules: {
            'ocularis': ocularisRef,
            'filters-simulator': filtersRef
        }
    };

    if (typeof window !== 'undefined') {
        window.PROJECTS_DATA = window.PROJECTS_DATA || [];
        // Insert as 3rd project
        window.PROJECTS_DATA.push(visiometricSuite);
    }
    if (typeof module !== 'undefined') {
        module.exports = visiometricSuite;
    }
})();
