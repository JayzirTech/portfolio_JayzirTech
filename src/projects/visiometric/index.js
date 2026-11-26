/**
 * ==========================================================================
 * Project: Visiometric Labs — Suite de Simulación Óptica
 * Integrador de 4 motores clínicos:
 * 1. Simulador Visual de Patologías (Ocularis) - Concluido
 * 2. Simulador de Filtros Ópticos (Chromatis) - Concluido
 * 3. Simulador de Lentes Fotosensibles Transitions® (Luminix 3D) - Concluido
 * 4. Simulador de Diseños de Lente y Campos Visuales (Optix) - En Desarrollo
 * ==========================================================================
 */
(function () {
    const refractionRef = (typeof window !== 'undefined' && (window.REFRACTION_SIMULATOR_MODULE || window.OCULARIS_MODULE)) 
        ? (window.REFRACTION_SIMULATOR_MODULE || window.OCULARIS_MODULE) 
        : (typeof require !== 'undefined' ? (require('./refraction-simulator.js') || require('./ocularis.js')) : null);

    const filtersRef = (typeof window !== 'undefined' && window.FILTERS_SIMULATOR_MODULE) 
        ? window.FILTERS_SIMULATOR_MODULE 
        : (typeof require !== 'undefined' ? require('./filters-simulator.js') : null);

    const transitionsRef = (typeof window !== 'undefined' && (window.TRANSITIONS_SIMULATOR_MODULE || window.LUMINIX_MODULE))
        ? (window.TRANSITIONS_SIMULATOR_MODULE || window.LUMINIX_MODULE)
        : (typeof require !== 'undefined' ? (function () { try { return require('./transitions-simulator.js'); } catch (e) { return null; } })() : null);

    const focalLengthsRef = (typeof window !== 'undefined' && (window.FOCAL_LENGTHS_SIMULATOR_MODULE || window.OPTIX_MODULE))
        ? (window.FOCAL_LENGTHS_SIMULATOR_MODULE || window.OPTIX_MODULE)
        : (typeof require !== 'undefined' ? (function () { try { return require('./focal-lengths-simulator.js'); } catch (e) { return null; } })() : null);

    const visiometricSuite = {
        id: 'visiometric-suite',
        isSuite: true,
        version: 'v2.5-suite',
        status: 'in-development',
        title: {
            es: 'Visiometric Labs — Suite de Simulación Óptica',
            en: 'Visiometric Labs — Optical Simulation Suite'
        },
        shortTitle: {
            es: 'Visiometric Labs (Suite)',
            en: 'Visiometric Labs (Suite)'
        },
        category: {
            es: 'Simulación Física / Óptica Visual & 3D',
            en: 'Physics Simulation / Visual Optics & 3D'
        },
        badge: {
            es: 'Suite en Desarrollo / WIP',
            en: 'Suite in Active Development'
        },
        theme: {
            accent: '#2dd4bf',
            accentContrast: '#042f2e',
            accentSoft: 'rgba(45, 212, 191, 0.08)',
            accentGlow: 'rgba(45, 212, 191, 0.25)',
            accentBorder: 'rgba(45, 212, 191, 0.3)'
        },
        painSummary: {
            es: 'Resuelve la brecha de comprensión en la salud visual entre el especialista y el paciente mediante una suite interactiva de simulación física, óptica clínica y gráficos 3D en tiempo real para optimizar la consulta y prescripción oftálmica.',
            en: 'Bridges the clinical communication gap in vision health between specialists and patients through an interactive physics simulation and real-time 3D optical suite engineered to elevate optometric consultations.'
        },
        github: 'https://github.com/visiometric-labs',
        demo: null,
        gallery: [
            {
                src: './index_styles/assets/imgs/projects/ocularis-simulation.png',
                caption: {
                    es: 'Módulo 1: Simulación de refracción ocular y trazado de rayos fotónicos en tiempo real.',
                    en: 'Module 1: Real-time ocular refraction simulation and photonic ray tracing.'
                }
            },
            {
                src: './index_styles/assets/imgs/projects/filters-simulator-demo.png',
                caption: {
                    es: 'Módulo 2: Experiencia subjetiva POV en conducción nocturna comparando lentes estándar vs Crizal Multicapa y filtros amarillos.',
                    en: 'Module 2: First-person POV night driving experience comparing standard vs Crizal Multicoat and yellow filters.'
                }
            },
            {
                src: './index_styles/assets/imgs/projects/transitions-simulator-preview.png',
                caption: {
                    es: 'Módulo 3: Probador facial 3D interactivo en WebGL y modulación solar de lentes fotosensibles Transitions®.',
                    en: 'Module 3: Real-time WebGL 3D face try-on and solar photochromic activation with Transitions® lenses.'
                }
            },
            {
                src: './index_styles/assets/imgs/projects/transitions-simulator-demo.jpg',
                caption: {
                    es: 'Módulo 3: Visión en primera persona (POV) con cinemática de cuello fisiológica y atenuación de destellos.',
                    en: 'Module 3: First-person (POV) gaze kinematics with physiological neck physics and glare reduction.'
                }
            }
        ],
        specs: [
            { key: { es: 'Arquitectura de la Suite', en: 'Suite Architecture' }, value: 'Multi-módulo desacoplado en Vanilla JS, Canvas 2D y Three.js WebGL' },
            { key: { es: 'Motores de Renderizado', en: 'Rendering Engines' }, value: 'HTML5 Canvas 2D acelerado + Three.js 3D Viewport con materiales PBR' },
            { key: { es: 'Rendimiento en Vivo', en: 'Live Framerate' }, value: '60 a 120 FPS continuos en pantallas táctiles y escritorio' },
            { key: { es: 'Modelos Físicos', en: 'Physics Engines' }, value: 'Refracción de Snell, transmitancia espectral, cinética LERP y teorema de Minkwitz' },
            { key: { es: 'Módulos Integrados', en: 'Integrated Modules' }, value: '1. Ocularis | 2. Chromatis | 3. Luminix | 4. Optix' },
            { key: { es: 'Compatibilidad Clínica', en: 'Clinical Compatibility' }, value: 'Tablets de mostrador, iPads, Monitores de gabinete y smartphones' }
        ],
        stats: [
            { label: { es: 'Rendimiento Gráfico', en: 'Rendering Speed' }, value: '60-120 FPS' },
            { label: { es: 'Módulos Especializados', en: 'Clinical Modules' }, value: '4 Motores' },
            { label: { es: 'Líneas Demostradas', en: 'Lens Technologies' }, value: '12+ Tecnologías' },
            { label: { es: 'Tiempo de Carga', en: 'Startup Latency' }, value: '< 450 ms' }
        ],
        tags: ['Vanilla JavaScript', 'HTML5 Canvas 2D', 'Three.js', 'WebGL 3D', 'Snell Ray-Tracing', 'Spectral Filtering', 'Photochromic LERP', 'Minkwitz Corridors', 'Clinical UI/UX'],
        overview: {
            es: 'Visiometric Labs es una suite completa de simulación física y tecnología visual diseñada para transformar la experiencia en la consulta optométrica y oftálmica. Desarrollada uniendo los principios del modelado de sistemas físicos, óptica geométrica y cálculo numérico con interfaces visuales de alto rendimiento, la suite integra cuatro motores complementarios: el Simulador Visual de Patologías (Ocularis: dedicado al modelado anatómico y defectos refractivos), el Simulador de Filtros Ópticos (Chromatis: tratamientos y protección espectral), el Simulador de Lentes Fotosensibles Transitions® (Luminix: probador facial 3D WebGL con extinción de deslumbramiento) y el Simulador de Diseños de Lente y Campos Visuales (Optix: geometría de monofocales, bifocales y progresivos, actualmente en desarrollo activo).',
            en: 'Visiometric Labs is an end-to-end physics simulation and vision tech suite engineered to redefine clinical ophthalmic consultations. Combining physical systems modeling, geometric optics, and real-time numerical solvers with high-performance web graphics, the suite brings together four complementary engines: the Visual Pathology Simulator (Ocularis: anatomical refraction and dioptric lens modeling), the Optical Filters Simulator (Chromatis: coatings and spectral transmission), the Transitions® Photochromic Simulator (Luminix: 3D WebGL avatar try-on with solar glare extinction), and the Lens Designs Simulator (Optix: monofocal, bifocal, and progressive corridor geometry, currently in active development).'
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
                id: 'refraction-simulator',
                route: '#/proyecto/visiometric-suite/refraction-simulator',
                status: 'completed',
                icon: '👁️',
                title: {
                    es: 'Módulo 1: Simulador Visual de Patologías',
                    en: 'Module 1: Visual Pathology Simulator'
                },
                shortTitle: {
                    es: 'Simulador Visual de Patologías',
                    en: 'Visual Pathology Simulator'
                },
                desc: {
                    es: 'Simula el ojo humano como un sistema óptico convergente, calculando el trazado de rayos de Snell para demostrar anomalías refractivas (miopía, hipermetropía, astigmatismo) y su corrección con lentes diótricos en tiempo real a 60 FPS.',
                    en: 'Simulates the human eye as a convergent optical system, solving Snell paraxial ray tracing to demonstrate refractive errors (myopia, hyperopia, astigmatism) and corrective lenses in real time at 60 FPS.'
                },
                tags: ['Snell Ray-Tracing', 'Paraxial Optics', 'Sliders Dioptrías', 'HTML5 Canvas', '60 FPS'],
                demo: 'https://visiometric-labs.github.io/refraction-simulator/',
                github: 'https://github.com/visiometric-labs/refraction-simulator'
            },
            {
                id: 'filters-simulator',
                route: '#/proyecto/visiometric-suite/filters-simulator',
                status: 'completed',
                icon: '🔬',
                title: {
                    es: 'Módulo 2: Simulador de Filtros Ópticos — Recubrimientos & Tratamientos',
                    en: 'Module 2: Optical Filters Simulator — Lens Coatings & Treatments'
                },
                shortTitle: {
                    es: 'Simulador de Filtros Ópticos',
                    en: 'Optical Filters Simulator'
                },
                desc: {
                    es: 'Simulador clínico interactivo que modela la transmitancia espectral de recubrimientos oftálmicos (corte de luz azul 415nm, antirreflejo con supresión de destellos parásitos, oscurecimiento fotocromático UV y polarizado anti-reflejo de agua/asfalto).',
                    en: 'Interactive clinical simulator modeling the spectral transmission of lens coatings (415nm blue light cut, anti-glare parasitic reflection suppression, photochromic UV tinting, and Brewster polarized glare extinction).'
                },
                tags: ['Spectral Filtering', 'Canvas 2D', 'Anti-Glare Suppression', 'Photochromic LERP', 'Zero Dependencies'],
                demo: 'https://visiometric-labs.github.io/filters-simulator/',
                github: 'https://github.com/visiometric-labs/filters-simulator'
            },
            {
                id: 'transitions-simulator',
                route: '#/proyecto/visiometric-suite/transitions-simulator',
                status: 'completed',
                icon: '🕶️',
                title: {
                    es: 'Módulo 3: Simulador de Lentes Fotosensibles Transitions® & Probador 3D',
                    en: 'Module 3: Transitions® Photochromic Lenses Simulator & 3D Virtual Try-On'
                },
                shortTitle: {
                    es: 'Lentes Fotosensibles Transitions®',
                    en: 'Transitions® Photochromic Lenses'
                },
                desc: {
                    es: 'Plataforma clínica en Three.js con probador facial 3D y visión en primera persona (POV). Modula la cinética de tintado fotocromático según radiación solar y atenúa destellos extremos con cinemática de mirada fisiológica.',
                    en: 'Clinical Three.js platform featuring a real-time 3D face try-on avatar and first-person POV gaze kinematics. Simulates solar UV photochromic tint kinetics across Signature Gen S, XTRActive, and Style Mirrors lines.'
                },
                tags: ['Three.js', 'WebGL 3D', 'Photochromic LERP', 'Virtual Try-On', 'Gaze Biomechanics', 'Vite 6'],
                demo: 'https://visiometric-labs.github.io/transitions-simulator/',
                github: 'https://github.com/visiometric-labs/transitions-simulator'
            },
            {
                id: 'focal_lengths-simulator',
                route: '#/proyecto/visiometric-suite/focal_lengths-simulator',
                status: 'in-development',
                icon: '📐',
                title: {
                    es: 'Módulo 4: Simulador de Diseños de Lente y Campos Visuales',
                    en: 'Module 4: Lens Designs & Visual Fields Simulator'
                },
                shortTitle: {
                    es: 'Diseños de Lente y Campos Visuales',
                    en: 'Lens Designs & Visual Fields'
                },
                desc: {
                    es: 'Optix™: Simulador pedagógico interactivo de campos visuales para lentes Monofocales, Bifocales (Flat-Top con salto de imagen), Progresivos Multifocales (Free-Form digital) y Ocupacionales, demostrando profundidad de foco y aberración marginal lateral.',
                    en: 'Optix™: Interactive clinical simulator modeling visual field zones for Single Vision, Bifocals (image jump), Progressive Free-Form lenses, and Occupational designs, demonstrating depth of field and lateral marginal astigmatism.'
                },
                tags: ['Optical Ray Physics', 'Minkwitz Corridors', 'Bifocals Image Jump', 'Progressive Free-Form', 'Occupational Optics'],
                demo: 'https://visiometric-labs.github.io/focal_lengths-simulator/',
                github: 'https://github.com/visiometric-labs/focal_lengths-simulator'
            }
        ],
        codeSnippet: {
            filename: 'src/visiometric/suite_core_orchestrator.js',
            lang: 'javascript',
            code: `// Visiometric Labs: Optical Simulation Suite Core Architecture
export class VisiometricSuite {
    constructor() {
        this.modules = {
            pathology: { name: 'Ocularis Refraction & Anatomy Engine', ready: true },
            filters: { name: 'Chromatis Spectral Coatings Engine', ready: true },
            photochromic3d: { name: 'Luminix Three.js 3D Try-On & Photochromic Engine', ready: true },
            focalDesigns: { name: 'Focal Lengths & Minkwitz Corridor Solver', ready: false } // WIP
        };
    }

    /**
     * Integrates dioptric correction, spectral filtering, photochromic UV kinetics,
     * and progressive corridor geometry into a unified patient consultation experience.
     */
    simulateIntegratedConsultation(patientPrescription, lensConfig, environment) {
        const { sphericalError, cylinderAxis, additionPresbyopia } = patientPrescription;
        const { lensDesign, photochromicFamily, antiReflectiveCoat } = lensConfig;
        const { ambientLux, uvIndex, gazeDistanceMeters } = environment;

        // 1. Refractive ray convergence (Module 1: Ocularis)
        const refractive = this.modules.pathology.computeSnellRays(sphericalError, cylinderAxis);

        // 2. Spectral transmission & parasitic reflection extinction (Module 2: Chromatis)
        const spectral = this.modules.filters.evaluateTransmission({
            blueCut: true,
            antiReflective: antiReflectiveCoat
        });

        // 3. Dynamic photochromic tint & 3D avatar illumination (Module 3: Luminix)
        const photochromic = this.modules.photochromic3d.evaluateKinetics({
            family: photochromicFamily,
            uv: uvIndex,
            tempC: 22.0
        });

        // 4. Progressive corridor & marginal astigmatism (Module 4: Focal Lengths)
        const focalClarity = this.modules.focalDesigns.evaluatePoint(0, 5, additionPresbyopia, gazeDistanceMeters);

        return {
            retinalFocusScore: refractive.inFocus ? 1.0 : refractive.blurRadius,
            glareExtinctionPercent: spectral.glareSuppressed ? 92 : 15,
            lensTintOpacity: photochromic.tintOpacity,
            corridorSharpness: focalClarity.sharpnessFactor,
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
                es: 'Ecosistema de simulación desacoplado en cuatro motores físicos y visuales independientes con una capa de control unificada.',
                en: 'Decoupled simulation ecosystem consisting of four specialized physics and graphics engines bound by a unified UI controller layer.'
            },
            flow: [
                { step: '01. Diagnóstico Refractivo', desc: 'Módulo 1 (Ocularis): Selección de patología (miopía/hipermetropía/astigmatismo) y ajuste de potencia dióptrica en tiempo real.' },
                { step: '02. Evaluación de Filtros y Recubrimientos', desc: 'Módulo 2 (Chromatis): Simulación interactiva de tratamientos (filtro azul, antirreflejo multicapa y polarizado).' },
                { step: '03. Probador 3D & Lentes Fotosensibles', desc: 'Módulo 3 (Luminix): Visualización del avatar 3D en WebGL y modulación solar dinámica con tecnología Transitions®.' },
                { step: '04. Campos Focales & Diseños de Lente', desc: 'Módulo 4 (Optix): Comparativa de campos de visión y aberración lateral entre monofocales, bifocales y progresivos (WIP).' },
                { step: '05. Convicción y Decisión Clínica', desc: 'El paciente experimenta de forma visual e inmediata la diferencia antes/después de sus nuevos lentes.' }
            ],
            keyDecisions: [
                {
                    title: 'Arquitectura Web Pura (Vanilla JS) y Three.js Desacoplado',
                    reason: 'Garantiza inicio instantáneo (< 450 ms) y permite cargar los módulos 3D bajo demanda sin sobrecargar tablets de consulta.'
                },
                {
                    title: 'Modularidad Estricta e Independencia de Motores',
                    reason: 'Cada simulador puede funcionar como herramienta clínica independiente o integrarse dentro del hub de la Suite.'
                },
                {
                    title: 'Aceleración por Hardware en Canvas 2D y WebGL',
                    reason: 'Optimiza el bucle de renderizado para alcanzar 60 a 120 FPS en iPads, tablets táctiles y monitores clínicos.'
                }
            ]
        },
        challenges: [
            {
                title: 'Unificación de Cuatro Paradigmas de Simulación Distintos',
                challenge: 'La suite integra trazado de rayos vectorial (Módulo 1), manipulación espectral de color (Módulo 2), avatares PBR 3D (Módulo 3) y cálculo de aberraciones marginales diferenciales (Módulo 4).',
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
            'refraction-simulator': refractionRef,
            'ocularis': refractionRef, // alias for backwards compatibility
            'filters-simulator': filtersRef,
            'transitions-simulator': transitionsRef,
            'luminix': transitionsRef, // alias
            'focal_lengths-simulator': focalLengthsRef,
            'focal-lengths-simulator': focalLengthsRef, // alias
            'optix': focalLengthsRef // alias
        }
    };

    if (typeof window !== 'undefined') {
        window.PROJECTS_DATA = window.PROJECTS_DATA || [];
        visiometricSuite.demo = null;
        // Insert suite into projects data array
        window.PROJECTS_DATA.push(visiometricSuite);
    }
    if (typeof module !== 'undefined') {
        module.exports = visiometricSuite;
    }
})();
