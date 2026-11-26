/**
 * ==========================================================================
 * Visiometric Labs — Módulo 4: Simulador de Diseños y Distancias Focales
 * Monofocales • Bifocales • Progresivos (Multifocales) • Ocupacionales (WIP)
 * ==========================================================================
 */
(function () {
    const focalLengthsSimulatorModule = {
        id: 'focal_lengths-simulator',
        suiteId: 'visiometric-suite',
        version: 'v0.1.0-wip',
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
        category: {
            es: 'Simulación Física / Óptica Oftálmica',
            en: 'Physics Simulation / Ophthalmic Optics'
        },
        badge: {
            es: 'En Desarrollo / WIP',
            en: 'In Development / WIP'
        },
        theme: {
            accent: '#06b6d4',
            accentContrast: '#042730',
            accentSoft: 'rgba(6, 182, 212, 0.08)',
            accentGlow: 'rgba(6, 182, 212, 0.25)',
            accentBorder: 'rgba(6, 182, 212, 0.3)'
        },
        painSummary: {
            es: 'Elimina las dudas y temores más arraigados del paciente frente a la elección de su diseño de lentes: el costo del lente progresivo, el mareo por aberraciones laterales, el salto de imagen de los bifocales y las limitaciones de campo visual de los monofocales frente a pantallas y lectura.',
            en: 'Dismantles the greatest clinical hesitation in eyewear selection: progressive lens cost objections, lateral distortion fears, bifocal image jump disorientation, and single-vision depth limitations across digital screens and reading distances.'
        },
        github: 'https://github.com/visiometric-labs/focal_lengths-simulator',
        demo: 'https://visiometric-labs.github.io/focal_lengths-simulator/',
        gallery: [
            {
                src: './index_styles/assets/imgs/projects/ocularis-simulation.png',
                caption: {
                    es: 'Mapeo bidimensional de zonas ópticas: visión lejana, corredor de transición intermedia y zona de lectura cercana.',
                    en: 'Two-dimensional optical mapping: distance zone, progressive intermediate corridor, and near reading segment.'
                }
            },
            {
                src: './index_styles/assets/imgs/projects/filters-simulator-preview.png',
                caption: {
                    es: 'Comparativa de campos visuales y desenfoque marginal lateral entre gamas tradicionales vs Free-Form digital.',
                    en: 'Visual field breadth comparison and lateral marginal astigmatism between traditional vs digital Free-Form tiers.'
                }
            }
        ],
        specs: [
            { key: { es: 'Diseños Modelados', en: 'Modeled Geometries' }, value: 'Monofocales, Bifocales (Flat-Top), Progresivos (Multifocal) y Ocupacionales' },
            { key: { es: 'Física de la Aberración', en: 'Distortion Physics' }, value: 'Teorema de Minkwitz para astigmatismo marginal periférico no deseado' },
            { key: { es: 'Fenómenos Ópticos', en: 'Simulated Phenomena' }, value: 'Salto de imagen (Image Jump), Punto ciego intermedio y ancho de corredor' },
            { key: { es: 'Planos de Enfoque', en: 'Focal Planes' }, value: 'Lejos (> 5 m), Intermedio (60 cm - 1 m) y Cerca (35 - 40 cm)' },
            { key: { es: 'Gamas Progresivas', en: 'Progressive Tiers' }, value: 'Estándar (convencional), Digital Free-Form y Panorama Personalizado' },
            { key: { es: 'Estado del Motor', en: 'Engine State' }, value: 'Fase 0 - Arquitectura y Planificación Conceptual (En Desarrollo Activo)' }
        ],
        stats: [
            { label: { es: 'Diseños Clínicos', en: 'Lens Designs' }, value: '4 Arquetipos' },
            { label: { es: 'Planos de Distancia', en: 'Focal Distances' }, value: '3 Planos' },
            { label: { es: 'Gamas Progresivas', en: 'Free-Form Tiers' }, value: '3 Niveles' },
            { label: { es: 'Fase de Proyecto', en: 'Roadmap Stage' }, value: 'Fase 0 (WIP)' }
        ],
        tags: ['Optical Ray Physics', 'Minkwitz Theorem', 'Progressive Free-Form', 'Bifocals Image Jump', 'Occupational Optics', 'Marginal Astigmatism', 'Zero Dependencies'],
        overview: {
            es: 'Optix™ (Simulador de Diseños de Lente y Campos Visuales) es el cuarto módulo de la suite Visiometric Labs, actualmente en desarrollo activo. Su objetivo es convertir el proceso de adaptación de lentes complejas (progresivos, bifocales y ocupacionales) en una experiencia gráfica intuitiva y pedagógica. El paciente puede experimentar en primera persona cómo cada diseño geométrico distribuye las zonas de enfoque y por qué invertir en tecnologías digitales Free-Form minimiza el astigmatismo periférico lateral y maximiza el confort en la oficina y la vida cotidiana.',
            en: 'Optix™ (Lens Designs & Visual Fields Simulator) is the fourth module in the Visiometric Labs suite, currently under active development. Its mission is to transform complex optical lens dispensing into an intuitive visual journey. Patients interactively experience how distinct lens surface geometries distribute dioptric power, directly discovering why upgrading to digital Free-Form corridor architectures minimizes peripheral distortion and maximizes screen and reading comfort.'
        },
        problem: {
            title: {
                es: 'La Barrera del Lente Progresivo y el Dilema Multifocal',
                en: 'The Progressive Lens Barrier & Multifocal Dilemma'
            },
            description: {
                es: 'En la consulta de presbicia y visión adulta, el salto del monofocal al progresivo o bifocal es el momento de mayor fricción comercial: los pacientes temen marearse al caminar o bajar escaleras, cuestionan por qué un progresivo cuesta más que un bifocal o no comprenden por qué ven borroso el monitor con sus bifocales tradicionales. Sin una demostración visual interactiva, muchos rechazan el diseño adecuado y eligen opciones desactualizadas que comprometen su ergonomía y calidad de vida.',
                en: 'In presbyopia consultations, transitioning from single vision to progressive or bifocal designs sparks intense sales hesitation: patients fear spatial disorientation while walking, question premium progressive price tags, or fail to understand why bifocals leave computer monitors blurred. Without interactive proof, many default to outdated lens formats that hinder postural ergonomics and visual comfort.'
            },
            painPoints: {
                es: [
                    '«¿Por qué el progresivo cuesta más?» — Incomprensión del valor del tallado digital Free-Form frente al tallado tradicional.',
                    '«Los progresivos marean» — Miedo a las zonas de aberración lateral sin comprender cómo se mitigan en gamas personalizadas.',
                    'El salto de imagen en bifocales: desconcierto cuando el suelo parece desplazarse bruscamente al mirar hacia abajo.',
                    'Fatiga cervical y postural en usuarios de computador que intentan enfocar pantallas con lentes monofocales de lectura.'
                ],
                en: [
                    '"Why are progressives so expensive?" — Failure to grasp the optical precision of computerized Free-Form corridors.',
                    '"Progressives will make me dizzy" — Anxiety over marginal aberrations without understanding tier-based optimization.',
                    'Disorienting bifocal image jump where steps and floors abruptly shift when glancing down.',
                    'Severe neck fatigue and poor posture from attempting to read desktop screens with single-vision reading glasses.'
                ]
            }
        },
        codeSnippet: {
            filename: 'src/physics/focal_corridor_solver.js',
            lang: 'javascript',
            code: `// Focal Lengths Simulator: Progressive Corridor & Minkwitz Astigmatism Solver
export class ProgressiveCorridorSolver {
    constructor(tier = 'digital_freeform') {
        this.tier = tier; // standard, digital_freeform, personalized
        this.corridorWidth = tier === 'personalized' ? 8.5 : (tier === 'digital_freeform' ? 6.0 : 4.0); // mm
    }

    /**
     * Solves effective visual clarity and unwanted marginal astigmatism
     * at lens coordinate (x, y) according to Minkwitz Theorem:
     * Astigmatism rate of increase ~ 2 * (Add Power / Corridor Length).
     */
    evaluateVisualPoint(x, y, additionPower, gazeDistanceMeters) {
        const distanceFromCenterY = Math.abs(y);
        const lateralDisplacementX = Math.abs(x);

        // Compute power progression profile
        const targetPowerAtY = additionPower * Math.min(1.0, Math.max(0.0, (y + 10) / 20));
        const requiredPower = 1.0 / gazeDistanceMeters;

        // Minkwitz marginal astigmatism calculation (astigmatic blur)
        const corridorRadius = this.corridorWidth / 2.0;
        let unwantedAstigmatism = 0.0;
        if (lateralDisplacementX > corridorRadius) {
            const distanceOutsideCorridor = lateralDisplacementX - corridorRadius;
            unwantedAstigmatism = (2.0 * additionPower / 14.0) * distanceOutsideCorridor;
        }

        const focalError = Math.abs(targetPowerAtY - requiredPower);
        const totalBlurRadius = focalError * 1.8 + unwantedAstigmatism * 2.2;

        return {
            inFocus: totalBlurRadius < 0.25,
            unwantedAstigmatismDiopters: unwantedAstigmatism,
            sharpnessFactor: Math.max(0.05, 1.0 - totalBlurRadius / 3.0),
            isPeripheralDistortion: unwantedAstigmatism > 0.5
        };
    }
}`
        },
        architecture: {
            title: {
                es: 'Arquitectura del Motor de Campos Focales',
                en: 'Focal Fields Engine Architecture & Data Flow'
            },
            description: {
                es: 'Modelado analítico bidimensional que proyecta zonas de enfoque sobre escenas interactivas multicapa (escritorio, oficina y exteriores).',
                en: 'Two-dimensional analytical modeling projecting focal clarity masks onto interactive multi-plane scenes (desktop, office, and outdoor settings).'
            },
            flow: [
                { step: '01. Selección de Diseño Oftálmico', desc: 'Monofocal (Lejos o Cerca), Bifocal Flat-Top, Progresivo Multizona u Ocupacional Office.' },
                { step: '02. Configuración de Prescripción (Adición)', desc: 'Graduación de dioptrías para presbicia (+1.00 D a +3.00 D) y selección de gama constructiva.' },
                { step: '03. Trazado del Corredor Progresivo', desc: 'Cálculo analítico de la curva de adición vertical y cálculo del astigmatismo marginal según Minkwitz.' },
                { step: '04. Composición de Desenfoque en Tiempo Real', desc: 'Generación de mapas de nitidez espacial con desenfoque gaussiano dependiente de la profundidad.' },
                { step: '05. Demostración Pedagógica Interactiva', desc: 'El paciente mueve la mirada a través de los objetos para percibir la ergonomía visual de cada lente.' }
            ],
            keyDecisions: [
                {
                    title: 'Simulación del Salto de Imagen en Bifocales',
                    reason: 'Demuestra visualmente el desplazamiento prismático abrupto en la línea de corte para explicar por qué los progresivos eliminan esa incomodidad.'
                },
                {
                    title: 'Comparativa Lado a Lado de Gamas de Progresivos',
                    reason: 'Permite al optómetra justificar la inversión en tecnologías Free-Form demostrando la amplitud del corredor útil.'
                },
                {
                    title: 'Escenario Especializado de Ergonomía Ocupacional',
                    reason: 'Muestra a profesionales de oficina cómo una lente ocupacional previene la sobretensión cervical al consultar pantallas.'
                }
            ]
        },
        challenges: [
            {
                title: 'Representación Gráfica Intuitiva del Astigmatismo Marginal',
                challenge: 'En diagramas técnicos el astigmatismo se representa con líneas de contorno complejas que ningún paciente comprende.',
                solution: 'Traducción directa de las dioptrías de aberración en desenfoque óptico visual realista con zonas laterales difuminadas.'
            },
            {
                title: 'Rendimiento de Filtros Gaussianos Variables en Navegador',
                challenge: 'Aplicar desenfoques variables por píxel consume alta potencia gráfica en procesadores móviles.',
                solution: 'Arquitectura de máscaras alfa en Canvas 2D pre-calculadas con aceleración por hardware que asegura 60 FPS continuos.'
            }
        ],
        impact: {
            es: 'Focal Lengths Simulator facilitará la comprensión y aceptación de lentes progresivas y ocupacionales, resolviendo las objeciones de costo y adaptación desde la primera consulta.',
            en: 'Focal Lengths Simulator will streamline patient acceptance of progressive and occupational eyewear, resolving cost and adaptation friction right at the consultation desk.'
        }
    };

    if (typeof window !== 'undefined') {
        window.FOCAL_LENGTHS_SIMULATOR_MODULE = focalLengthsSimulatorModule;
        window.OPTIX_MODULE = focalLengthsSimulatorModule;
    }
    if (typeof module !== 'undefined') {
        module.exports = focalLengthsSimulatorModule;
    }
})();
