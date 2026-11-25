/**
 * ==========================================================================
 * Visiometric Labs — Módulo 1: Simulador Visual de Patologías y Graduación
 * ==========================================================================
 */
(function () {
    const refractionModule = {
        id: 'refraction-simulator',
        suiteId: 'visiometric-suite',
        version: 'v1.2.0-wip',
        status: 'in-development',
        title: {
            es: 'Módulo 1: Simulador Visual de Patologías y Graduación de Lentes',
            en: 'Module 1: Visual Pathology & Lens Prescription Simulator'
        },
        shortTitle: {
            es: 'Simulador Visual de Patologías y Graduación de Lentes',
            en: 'Visual Pathology & Lens Prescription Simulator'
        },
        category: {
            es: 'Simulación Física / Óptica Geométrica',
            en: 'Physics Simulation / Geometric Optics'
        },
        badge: {
            es: 'En Desarrollo / WIP',
            en: 'In Active Development'
        },
        theme: {
            accent: '#2dd4bf',
            accentContrast: '#042f2e',
            accentSoft: 'rgba(45, 212, 191, 0.08)',
            accentGlow: 'rgba(45, 212, 191, 0.25)',
            accentBorder: 'rgba(45, 212, 191, 0.3)'
        },
        painSummary: {
            es: 'Elimina la barrera de comunicación entre el optómetra y el paciente, permitiendo visualizar de forma interactiva y comprensible por qué ven borroso y cómo sus lentes corregirán su visión.',
            en: 'Bridges the communication gap between eye-care specialists and patients by interactively showing why vision is blurred and exactly how corrective lenses restore sharp focus.'
        },
        github: 'https://github.com/visiometric-labs/refraction-simulator',
        demo: 'https://visiometric-labs.github.io/refraction-simulator/',
        gallery: [
            {
                src: './index_styles/assets/imgs/projects/ocularis-simulation.png',
                caption: {
                    es: 'Simulador de física paraxial interactivo mostrando el trazado fotónico de haces de luz en la anatomía ocular.',
                    en: 'Interactive paraxial physics simulator showing photonic light ray tracing in eye anatomy.'
                }
            },
            {
                src: './index_styles/assets/imgs/projects/ocularis-preview.png',
                caption: {
                    es: 'Portal de inmersión y selección de patologías refractivas (Miopía, Hipermetropía, Astigmatismo).',
                    en: 'Immersion portal and refractive conditions selection (Myopia, Hyperopia, Astigmatism).'
                }
            }
        ],
        specs: [
            { key: { es: 'Modelo Físico', en: 'Physics Model' }, value: 'Snell Ray-Tracing & Paraxial Optics' },
            { key: { es: 'Patologías Modeladas', en: 'Modeled Conditions' }, value: 'Miopía, Hipermetropía, Astigmatismo' },
            { key: { es: 'Lentes Correctivos', en: 'Corrective Lenses' }, value: 'Convergentes (+), Divergentes (-), Cilíndricos' },
            { key: { es: 'Rendimiento Gráfico', en: 'Performance' }, value: '60 FPS requestAnimationFrame' },
            { key: { es: 'Diseño Visual', en: 'UI Aesthetics' }, value: 'Cyberpunk / Clinical Dark Mode' },
            { key: { es: 'Dependencias', en: 'Dependencies' }, value: 'Zero Dependencies (Pure Vanilla JS)' }
        ],
        stats: [
            { label: { es: 'Frecuencia de Cuadros', en: 'Framerate' }, value: '60 FPS' },
            { label: { es: 'Haces de Luz', en: 'Light Rays' }, value: 'Trazado Dinámico' },
            { label: { es: 'Entrada Interactiva', en: 'Real-time Inputs' }, value: 'Sliders Dioptrías' },
            { label: { es: 'Resolución Anatómica', en: 'Accuracy' }, value: 'Paraxial Óptica' }
        ],
        tags: ['JavaScript ES6+', 'HTML5 Canvas', 'Ray Tracing', 'Optics Physics', 'Mathematical Modeling', 'UI/UX', 'Glassmorphism'],
        overview: {
            es: 'El Simulador Visual de Patologías y Graduación de Lentes es el primer módulo de la suite Visiometric Labs, modelando el ojo humano como un sistema óptico convergente de refracción paraxial. Resuelve el desafío educativo en consultorios al calcular el trazado trigonométrico de rayos de luz en tiempo real y demostrar exactamente cómo los lentes desvían el punto focal hacia la fóvea retiniana.',
            en: 'The Visual Pathology & Lens Prescription Simulator is the primary module of the Visiometric Labs suite, modeling the human eye as a convergent optical system with paraxial refraction. It bridges clinical consultations with intuitive physics by computing Snell-based ray tracing in real time to show how corrective lenses refocus light onto the retinal plane.'
        },
        problem: {
            title: {
                es: 'Problema & Dolor de Negocio',
                en: 'Problem & Business Impact'
            },
            description: {
                es: 'Los pacientes reciben prescripciones con términos abstractos como "+2.50 dioptrías" o "astigmatismo", pero no comprenden por qué no ven bien ni por qué necesitan usar lentes con cierta curvatura. Los diagramas en papel son estáticos y no generan la convicción necesaria en el cuidado visual preventivo.',
                en: 'Patients receive prescriptions packed with abstract terms like "+2.50 diopters" or "axis cylinder", leaving them confused about why their vision is defective and why specific lens curvatures are needed. Static pamphlets fail to build trust or motivate compliance with vision care.'
            },
            painPoints: {
                es: [
                    'Incomprensión de por qué la visión lejana o cercana es borrosa según la longitud del globo ocular.',
                    'Falta de interactividad: el paciente no puede experimentar qué ocurre al modificar la graduación.',
                    'Software de laboratorio existente excesivamente técnico, costoso y no apto para mostradores de consulta.',
                    'Necesidad de una herramienta visual que refuerce el valor de la consulta profesional.'
                ],
                en: [
                    'Patients fail to grasp how ocular axial length causes focal misalignment before or behind the retina.',
                    'Zero interactivity: patients cannot visualize what happens as diopter values change.',
                    'Commercial laboratory simulation packages are bloated, slow, and unsuitable for consultation desks.',
                    'Need for an engaging visual asset that reinforces the perceived value of clinical consultations.'
                ]
            }
        },
        codeSnippet: {
            filename: 'src/physics/ray_tracer.js',
            lang: 'javascript',
            code: `// Snell's Law & Thin Lens Ray Deviation
export function traceLightRay(originY, refractivePower, lensPositionX, retinaPositionX) {
    const focalLength = 1000 / refractivePower;
    const intersectionLensX = lensPositionX;
    const intersectionLensY = originY;

    const slope = -intersectionLensY / focalLength;
    const focalPointX = lensPositionX + focalLength;

    const rayAtRetinaY = intersectionLensY + slope * (retinaPositionX - lensPositionX);
    const blurCircleRadius = Math.abs(rayAtRetinaY);

    return {
        path: [
            { x: 0, y: originY },
            { x: intersectionLensX, y: intersectionLensY },
            { x: retinaPositionX, y: rayAtRetinaY }
        ],
        focalPointX,
        blurCircleRadius,
        inFocus: blurCircleRadius < 1.5
    };
}`
        },
        architecture: {
            title: {
                es: 'Arquitectura Matemática & Motor de Trazado',
                en: 'Mathematical Architecture & Ray-Tracing Engine'
            },
            description: {
                es: 'Cálculo analítico en tiempo real desacoplado del canvas de representación visual.',
                en: 'Real-time analytical solver decoupled from the presentation canvas layer.'
            },
            flow: [
                { step: '01. Entrada de Curvatura', desc: 'El usuario manipula parámetros anatómicos (longitud axial) y potencia de lente (+/- dioptrías).' },
                { step: '02. Cálculo Trigonométrico', desc: 'Resolución de ecuaciones paraxiales para cada rayo paralelo entrante en microsegundos.' },
                { step: '03. Determinación Focal', desc: 'Identificación de la convergencia: pre-retiniana (miopía) o post-retiniana (hipermetropía).' },
                { step: '04. Cálculo del Desenfoque', desc: 'Medición del círculo de confusión resultante sobre la superficie sensible de la retina.' },
                { step: '05. Renderizado a 60 FPS', desc: 'Dibujado estético de haces con brillo cyan y guías anatómicas en canvas 2D.' }
            ],
            keyDecisions: [
                {
                    title: 'Aproximación Paraxial en vez de Trazado No Lineal Completo',
                    reason: 'Reduce la complejidad computacional en un 90% permitiendo 60 FPS sin comprometer la intuición física para el paciente.'
                },
                {
                    title: 'Lienzo HTML5 Canvas con Path Batching',
                    reason: 'Todos los haces luminosos se dibujan en una sola operación de trazado (ctx.stroke()), evitando caídas de fotogramas en móviles.'
                },
                {
                    title: 'Interfaz Inspirada en HUD Médico / Cyberpunk',
                    reason: 'Maximiza el contraste lumínico de los rayos sobre fondo oscuro, ideal para pantallas de consultorios.'
                }
            ]
        },
        challenges: [
            {
                title: 'Escala Anatómica Proporcional vs Legibilidad en Pantalla',
                challenge: 'En proporciones reales, el ojo humano es milimétrico y los rayos apenas se diferencian en pantallas de smartphones.',
                solution: 'Diseño de un factor de escala adaptativo que magnifica las desviaciones focales sin perder la proporcionalidad anatómica.'
            },
            {
                title: 'Fluidez en Pantallas Táctiles con Retraso de Eventos',
                challenge: 'El evento input de los sliders táctiles producía acumulaciones de redibujado en iPads antiguos.',
                solution: 'Implementación de throttling mediante requestAnimationFrame garantizando un solo cálculo por cuadro de pantalla.'
            }
        ],
        impact: {
            es: 'Permite a optometristas y oftalmólogos explicar anomalías refractivas en menos de 60 segundos, mejorando la adherencia al tratamiento y la satisfacción del paciente.',
            en: 'Enables clinicians to explain refractive disorders in under 60 seconds, elevating patient compliance, comprehension, and trust.'
        }
    };

    if (typeof window !== 'undefined') {
        window.REFRACTION_SIMULATOR_MODULE = refractionModule;
        window.OCULARIS_MODULE = refractionModule;
    }
    if (typeof module !== 'undefined') {
        module.exports = refractionModule;
    }
})();
