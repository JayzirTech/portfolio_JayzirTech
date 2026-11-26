/**
 * ==========================================================================
 * Visiometric Labs — Módulo 3: Simulador de Lentes Fotosensibles Transitions®
 * Plataforma clínica interactiva POV y Probador Facial 3D WebGL (Luminix™)
 * ==========================================================================
 */
(function () {
    const transitionsSimulatorModule = {
        id: 'transitions-simulator',
        suiteId: 'visiometric-suite',
        version: 'v1.0.0',
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
        category: {
            es: 'Simulación Física / Óptica Visual & 3D WebGL',
            en: 'Physics Simulation / Visual Optics & 3D WebGL'
        },
        badge: {
            es: 'Concluido',
            en: 'Completed'
        },
        theme: {
            accent: '#a855f7',
            accentContrast: '#18042b',
            accentSoft: 'rgba(168, 85, 247, 0.08)',
            accentGlow: 'rgba(168, 85, 247, 0.25)',
            accentBorder: 'rgba(168, 85, 247, 0.3)'
        },
        painSummary: {
            es: 'Resuelve la barrera comercial y clínica más habitual en el mostrador óptico: el paciente no logra imaginar la velocidad de tintado de los lentes fotosensibles frente al sol ni cómo lucirá la montura en su rostro. Luminix™ combina simulación en primera persona (POV) con extinción de deslumbramiento solar y un probador facial 3D interactivo en Three.js / WebGL.',
            en: 'Overcomes the most stubborn barrier in ophthalmic dispensing: patients struggle to imagine real-time photochromic activation speeds and aesthetic facial appearance under changing UV sunlight. Luminix™ combines first-person POV solar glare extinction with a responsive WebGL 3D avatar virtual try-on engine.'
        },
        github: 'https://github.com/visiometric-labs/transitions-simulator',
        demo: 'https://visiometric-labs.github.io/transitions-simulator/',
        gallery: [
            {
                src: './index_styles/assets/imgs/projects/transitions-simulator-preview.png',
                caption: {
                    es: 'Luminix™: Probador facial 3D interactivo y selección de familias Transitions® (Signature Gen S, XTRActive, Style Mirrors).',
                    en: 'Luminix™: Interactive 3D face try-on and Transitions® lens selection (Signature Gen S, XTRActive, Style Mirrors).'
                }
            },
            {
                src: './index_styles/assets/imgs/projects/transitions-simulator-demo.jpg',
                caption: {
                    es: 'Simulador en primera persona (POV) con cinemática de cuello fisiológica, velo solar volumétrico y atenuación de deslumbramiento.',
                    en: 'First-person (POV) gaze kinematics with physiological neck physics, volumetric solar glare, and glare extinction.'
                }
            }
        ],
        specs: [
            { key: { es: 'Motor Gráfico 3D', en: '3D Graphics Engine' }, value: 'Three.js (WebGL Hardware-Accelerated) + GLTF Avatar' },
            { key: { es: 'Modos de Simulación', en: 'Simulation Modes' }, value: 'Probador Facial 3D (Tercera Persona) + Visión POV (Primera Persona)' },
            { key: { es: 'Cinemática de Mirada', en: 'Gaze Kinematics' }, value: 'Física de cuello real Yaw/Pitch con inercia táctil (Momentum Fling)' },
            { key: { es: 'Modelado Fotosensible', en: 'Photochromic Kinetics' }, value: 'Interpolación no lineal LERP calibrada según índice UV y temperatura' },
            { key: { es: 'Gamas Demostradas', en: 'Demonstrated Lines' }, value: 'Signature Gen S™ (Rubí, Zafiro, Amatista), XTRActive®, Style Mirrors™' },
            { key: { es: 'Efectos Lumínicos', en: 'Photonic Effects' }, value: 'Resplandor corneal (Bloom), Hotspots especulares y velo solar volumétrico' },
            { key: { es: 'Stack Técnico', en: 'Tech Stack' }, value: 'JavaScript ES6+, Three.js, Vite 6.x, PWA Offline-ready' }
        ],
        stats: [
            { label: { es: 'Tasa de Refresco', en: 'Framerate' }, value: '60-120 FPS' },
            { label: { es: 'Tecnologías Lente', en: 'Lens Lines' }, value: '4 Familias' },
            { label: { es: 'Latencia Inercia', en: 'Gaze Latency' }, value: '< 8 ms' },
            { label: { es: 'Compatibilidad', en: 'Device Support' }, value: 'Móvil / iPad / PC' }
        ],
        tags: ['Three.js', 'WebGL 3D', 'Photochromic LERP', 'Virtual Try-On', 'Gaze Biomechanics', 'Vite 6', 'PWA Ready', 'Shader Optics'],
        overview: {
            es: 'Luminix™ es el tercer módulo de la suite Visiometric Labs, diseñado como una plataforma integral de demostración de lentes fotosensibles Transitions® para consultas optométricas y mostradores de venta. El sistema resuelve simultáneamente dos necesidades críticas: la demostración funcional (cómo ve el paciente a través de lentes que se adaptan dinámicamente a la radiación UV en exteriores e interiores) y la demostración estética (cómo luce el paciente con monturas graduadas y tintes de tendencia mediante un avatar 3D en tiempo real con iluminación ambiental dinámica).',
            en: 'Luminix™ is the third clinical module in the Visiometric Labs suite, engineered as an all-in-one photochromic lens demonstration platform for optometric practices and optical retail desks. It solves two critical consultation dilemmas simultaneously: functional visual proof (how the patient experiences dynamic UV light adaptation in real-world scenarios) and aesthetic confidence (how the patient looks wearing tinted lenses through a real-time WebGL 3D avatar with environmental illumination).'
        },
        problem: {
            title: {
                es: 'El Desafío Comercial de las Lentes Fotosensibles',
                en: 'The Commercial & Clinical Challenge of Photochromic Eyewear'
            },
            description: {
                es: 'A pesar de los enormes beneficios para la salud visual (bloqueo 100% UVA/UVB y filtrado de luz azul nociva), las lentes fotosensibles presentan altas tasas de objeción en el mostrador: los pacientes temen que "tarden demasiado en aclararse al entrar a una oficina", dudan de su efectividad dentro del automóvil (detrás del parabrisas bloqueador de UV) o consideran que los tintes son anticuados. Los muestrarios físicos tradicionales activados con lámparas UV de llavero resultan poco profesionales, lentos y no permiten ver el lente montado sobre el rostro.',
                en: 'Despite massive ocular health benefits (100% UVA/UVB protection and harmful blue light cut), photochromic lenses encounter heavy hesitation at checkout: patients worry they will remain dark indoors, doubt their activation inside vehicles, or perceive photochromic tints as outdated. Traditional in-store UV flashlight paddles feel artificial, slow, and fail to showcase frame aesthetics on actual facial geometry.'
            },
            painPoints: {
                es: [
                    'Inseguridad estética del paciente sobre cómo combinarán los colores de tinte (amatista, zafiro, ámbar) con su tono de piel y montura.',
                    'Falta de comprensión sobre la diferencia entre Signature Gen S (velocidad ultra-rápida) y XTRActive (activación tras parabrisas de vehículos).',
                    'Dificultad de los asesores ópticos para justificar el precio premium de tratamientos fotosensibles de última generación.',
                    'Dependencia de lámparas UV manuales en mostrador que desgastan los muestrarios y ensucian la experiencia del cliente.'
                ],
                en: [
                    'Aesthetic anxiety over how modern fashion tints (amethyst, sapphire, amber) harmonize with skin tones and frame finishes.',
                    'Confusion distinguishing between Signature Gen S (ultra-fast kinetics) and XTRActive (in-car windshield activation).',
                    'Optical consultants struggle to justify premium price points without tangible before/after visual proof.',
                    'Reliance on clunky handheld UV flashlights that degrade sample lenses and disrupt consultation flow.'
                ]
            }
        },
        codeSnippet: {
            filename: 'src/physics/photochromic_kinetics.js',
            lang: 'javascript',
            code: `// Luminix: Non-linear Photochromic Kinetic Activation Solver
export class PhotochromicKineticsEngine {
    constructor(lensFamily = 'signature_gen_s') {
        this.profile = this.getProfile(lensFamily);
        this.currentTransmission = 1.0; // 100% clear base
    }

    /**
     * Solves photochromic molecular darkening/fade-back dynamics
     * using dynamic UV irradiance, ambient temperature, and frame geometry.
     */
    updateKinetics(uvIndex, ambientTempC, deltaTimeMs) {
        // Temperature penalty factor: heat accelerates bleaching reaction
        const tempThermalPenalty = Math.max(0.72, 1.0 - (ambientTempC - 20) * 0.015);
        const targetOpticalDensity = Math.min(
            this.profile.maxDensity,
            (uvIndex / 10.0) * this.profile.uvAffinity * tempThermalPenalty
        );

        // Differential rate equation: darkening is 3x faster than clearing
        const isDarkening = targetOpticalDensity > (1.0 - this.currentTransmission);
        const rateConstant = isDarkening 
            ? this.profile.activationRate 
            : this.profile.fadeRate;

        const lerpFactor = 1.0 - Math.exp(-rateConstant * (deltaTimeMs / 1000));
        const targetTransmission = 1.0 - targetOpticalDensity;

        this.currentTransmission += (targetTransmission - this.currentTransmission) * lerpFactor;

        return {
            transmission: this.currentTransmission,
            tintOpacity: 1.0 - this.currentTransmission,
            chromaticShift: this.computeSpectralShift(this.currentTransmission),
            inCarActive: this.profile.activatesInCar && uvIndex > 0.5
        };
    }
}`
        },
        architecture: {
            title: {
                es: 'Arquitectura del Motor 3D & Cinemática Fisiológica',
                en: '3D Engine Architecture & Physiological Kinematics'
            },
            description: {
                es: 'Ecosistema desacoplado en dos módulos de renderizado: un visor 3D Three.js con materiales dieléctricos y un motor de composición en primera persona (POV) con física de rotación de cuello y resplandor especular.',
                en: 'Decoupled dual-renderer pipeline: a Three.js 3D viewport with dielectric PBR materials and a first-person POV compositor simulating biomechanical neck yaw/pitch and glare optics.'
            },
            flow: [
                { step: '01. Selección de Entorno y Radiación UV', desc: 'El usuario modula el índice solar (Parque Soleado UV 10, Conducción en Coche UV 2, Interior Museo UV 0).' },
                { step: '02. Cálculo Cinético No Lineal', desc: 'Resolución diferencial de oscurecimiento o desvanecimiento del tinte fotosensible en milisegundos.' },
                { step: '03. Probador 3D WebGL con Shaders PBR', desc: 'Renderizado del avatar con transmisión óptica física, reflejo corneal y tinte de montura personalizable.' },
                { step: '04. Cinemática de Cuello (Gaze POV)', desc: 'Desplazamiento de mirada con ángulos biomecánicos Yaw/Pitch y amortiguación por fricción inercial (Momentum Fling).' },
                { step: '05. Extinción de Deslumbramiento', desc: 'El paciente compara la visión directa deslumbrada frente a la visión protegida a través del cristal a 60-120 FPS.' }
            ],
            keyDecisions: [
                {
                    title: 'Three.js con Carga de GLTF Optimizado (< 1.2 MB)',
                    reason: 'Permite un probador facial 3D fluido en tablets de mostrador y celulares sin tiempos de espera ni ralentizaciones.'
                },
                {
                    title: 'Física de Cuello Biomecánica sin Controles Joystick',
                    reason: 'La navegación por arrastre táctil directo replica la rotación natural de la cabeza y elimina botones invasivos en la pantalla.'
                },
                {
                    title: 'Simulación Diferenciada para Conducción (XTRActive)',
                    reason: 'Permite demostrar con precisión matemática por qué los lentes estándar no oscurecen tras el parabrisas y cómo XTRActive supera esa barrera.'
                }
            ]
        },
        challenges: [
            {
                title: 'Velocidad de Tintado en Tiempo Real vs Curva Real de Laboratorio',
                challenge: 'En laboratorio los lentes tardan de 30 a 90 segundos en completar su ciclo, lo cual es inviable en una asesoría de mostrador de 2 minutos.',
                solution: 'Implementación de un factor de compresión temporal ajustable (1x tiempo real o modo demostración acelerada 5x) manteniendo la fidelidad espectral.'
            },
            {
                title: 'Transparencia de Vidrio Fotorrealista en WebGL para Móviles',
                challenge: 'Los shaders complejos de refracción vítrea reducen drásticamente la tasa de cuadros por segundo en smartphones.',
                solution: 'Diseño de un shader de tinte PBR simplificado con mapa de entorno esférico pre-horneado (pre-baked envmap) que mantiene 60 FPS estables.'
            }
        ],
        impact: {
            es: 'Luminix™ transforma la venta de lentes fotosensibles de un diálogo verbal incierto a una experiencia visual cautivadora e interactiva, elevando las tasas de adopción de tratamientos premium Transitions® y consolidando la confianza del paciente.',
            en: 'Luminix™ elevates optical dispensing from abstract verbal pitching to an engaging interactive visual journey, accelerating premium Transitions® upgrade adoption and building clinical credibility.'
        }
    };

    if (typeof window !== 'undefined') {
        window.TRANSITIONS_SIMULATOR_MODULE = transitionsSimulatorModule;
        window.LUMINIX_MODULE = transitionsSimulatorModule;
    }
    if (typeof module !== 'undefined') {
        module.exports = transitionsSimulatorModule;
    }
})();
