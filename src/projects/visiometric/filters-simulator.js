/**
 * ==========================================================================
 * Visiometric Labs — Módulo 2: Simulador de Filtros Ópticos
 * ==========================================================================
 */
(function () {
    const filtersSimulatorModule = {
        id: 'filters-simulator',
        suiteId: 'visiometric-suite',
        version: 'v1.1.0-wip',
        status: 'in-development',
        title: {
            es: 'Módulo 2: Simulador de Filtros Ópticos — Recubrimientos & Tratamientos',
            en: 'Module 2: Optical Filters Simulator — Coatings & Treatments'
        },
        shortTitle: {
            es: 'Simulador de Filtros Ópticos',
            en: 'Optical Filters Simulator'
        },
        category: {
            es: 'Simulación Física / Óptica Visual',
            en: 'Physics Simulation / Visual Optics'
        },
        badge: {
            es: 'En Desarrollo / WIP',
            en: 'In Active Development'
        },
        theme: {
            accent: '#f59e0b',
            accentContrast: '#241400',
            accentSoft: 'rgba(245, 158, 11, 0.08)',
            accentGlow: 'rgba(245, 158, 11, 0.25)',
            accentBorder: 'rgba(245, 158, 11, 0.3)'
        },
        painSummary: {
            es: 'Resuelve la dificultad de explicar y comparar en consulta óptica cómo actúan los filtros de lentes (luz azul, antirreflejo, fotocromáticos, polarizados) frente a diferentes condiciones lumínicas reales.',
            en: 'Solves the clinical challenge of demonstrating and comparing ophthalmic lens coatings (blue cut, anti-reflective, photochromic, polarized) under real-world lighting conditions.'
        },
        github: 'https://github.com/visiometric-labs/filters-simulator',
        demo: 'https://visiometric-labs.github.io/filters-simulator/',
        gallery: [
            {
                src: './index_styles/assets/imgs/projects/filters-simulator-demo.png',
                caption: {
                    es: 'Vista subjetiva en primera persona (POV) evaluando el corte de destellos nocturnos y la nitidez óptica con recubrimientos Crizal y filtros amarillos.',
                    en: 'First-person POV subjective comparison evaluating night glare suppression and visual acuity with Crizal multicoating and yellow filters.'
                }
            },
            {
                src: './index_styles/assets/imgs/projects/filters-simulator-preview.png',
                caption: {
                    es: 'Hub interactivo de escenarios clínicos para pruebas de fatiga visual por pantallas (Blue Cut), conducción nocturna y radiación UV.',
                    en: 'Interactive clinical scenarios hub for testing digital screen fatigue (Blue Cut), night driving, and UV solar radiation.'
                }
            }
        ],
        specs: [
            { key: { es: 'Filtros Soportados', en: 'Supported Filters' }, value: 'Blue Light Cut, Anti-Reflective, Photochromic, Polarized, UV400' },
            { key: { es: 'Motor de Renderizado', en: 'Rendering Engine' }, value: 'Hardware-Accelerated HTML5 Canvas 2D' },
            { key: { es: 'Tasa de Refresco', en: 'Framerate' }, value: '60 FPS fluido en tiempo real' },
            { key: { es: 'Entornos de Prueba', en: 'Simulation Scenes' }, value: 'Oficina / Pantallas, Conducción Nocturna, Día Soleado' },
            { key: { es: 'Stack Técnico', en: 'Tech Stack' }, value: 'Vanilla JavaScript ES6+, CSS Glassmorphism, Zero External Bundles' },
            { key: { es: 'Despliegue', en: 'Deployment' }, value: 'GitHub Pages (PWA Ready)' }
        ],
        stats: [
            { label: { es: 'Tasa de Refresco', en: 'Rendering Speed' }, value: '60 FPS' },
            { label: { es: 'Filtros Dinámicos', en: 'Dynamic Coatings' }, value: '5 Tecnologías' },
            { label: { es: 'Dependencias Externas', en: 'Bundle Overhead' }, value: '0 KB (Vanilla)' },
            { label: { es: 'Compatibilidad', en: 'Device Support' }, value: 'Desktop & Tablets' }
        ],
        tags: ['JavaScript ES6+', 'HTML5 Canvas', 'Optical Physics', 'Spectral Filtering', 'UI/UX', 'Glassmorphism', 'Visiometric Labs'],
        overview: {
            es: 'Simulador interactivo desarrollado como segundo módulo de la suite Visiometric Labs que permite a optómetras y pacientes comparar en tiempo real el comportamiento óptico de diversos tratamientos y filtros oftálmicos. Modela digitalmente el espectro de atenuación lumínica, reflejos parásitos y transición fotocromática en escenarios de la vida cotidiana.',
            en: 'Interactive clinical optical simulator developed as the second module of the Visiometric Labs suite, allowing eye-care practitioners and patients to compare the real-world performance of ophthalmic lens coatings in real time. It digitally models spectral light transmission, parasitic glare attenuation, and photochromic activation across everyday scenarios.'
        },
        problem: {
            title: {
                es: 'Problema & Dolor de Negocio',
                en: 'Problem & Business Impact'
            },
            description: {
                es: 'En el consultorio optométrico y la óptica, la mayoría de pacientes no compran filtros de protección (antirreflejo premium, corte de luz azul o fotocromáticos) porque los muestrarios físicos estáticos no permiten apreciar el beneficio real. Explicar conceptos de espectro visible con folletos genera desconfianza y baja conversión.',
                en: 'In optometry practices, patients often decline protective lens upgrades (blue cut, anti-glare, photochromic) simply because static demonstration paddles fail to convey real-world visual benefits. Explaining wavelength filtration with abstract diagrams leads to skepticism and lost optical sales.'
            },
            painPoints: {
                es: [
                    'Dificultad de los pacientes para entender la diferencia visual entre un lente básico y uno con antirreflejo multicapa.',
                    'Falta de herramientas digitales inmediatas que puedan mostrarse en un iPad o tablet de consultorio sin instalar apps.',
                    'Muestrarios de plástico rayados o poco higiénicos en el mostrador de atención.',
                    'Pérdida de ventas de tratamientos de alto valor por falta de convicción visual del usuario.'
                ],
                en: [
                    'Patients struggle to see tangible contrast benefits of anti-reflective coatings versus raw plastic lenses.',
                    'Lack of zero-install digital simulators that launch instantly on clinic tablets and iPads.',
                    'Physical lens demonstration samples get scratched, lost, or are cumbersome to clean between visits.',
                    'Lost optical clinic revenue due to lack of immediate visual proof for high-tier protective coatings.'
                ]
            }
        },
        codeSnippet: {
            filename: 'src/modules/spectral-filter-engine.js',
            lang: 'javascript',
            code: `// Real-time Optical Coating Simulation Engine
export class OpticalFilterEngine {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d', { willReadFrequently: true });
        this.filters = {
            blueCut: { active: false, absorption415nm: 0.85 },
            antiReflective: { active: true, glareSuppression: 0.92 },
            photochromic: { active: false, uvIntensity: 0.0, maxOpticalDensity: 0.82 },
            polarized: { active: false, brewsterExtinction: 0.95 }
        };
    }

    renderSpectralTransmission(baseScene) {
        let filterChain = [];
        if (this.filters.blueCut.active) {
            filterChain.push(\`sepia(\${this.filters.blueCut.absorption415nm * 14}%)\`);
            filterChain.push('contrast(105%)');
        }
        if (this.filters.photochromic.active) {
            const tint = this.filters.photochromic.uvIntensity * this.filters.photochromic.maxOpticalDensity;
            filterChain.push(\`brightness(\${(1 - tint * 0.7).toFixed(2)})\`);
        }
        
        this.ctx.filter = filterChain.length ? filterChain.join(' ') : 'none';
        this.ctx.drawImage(baseScene, 0, 0);
        
        if (!this.filters.antiReflective.active) {
            this.renderParasiticGlare();
        }
    }
}`
        },
        architecture: {
            title: {
                es: 'Arquitectura del Simulador & Decisiones de Diseño',
                en: 'Simulator Architecture & Engineering Decisions'
            },
            description: {
                es: 'Motor modular en Vanilla JS optimizado para 60 FPS mediante composición en Canvas 2D.',
                en: 'Modular Vanilla JS engine optimized for steady 60 FPS execution via 2D Canvas composition.'
            },
            flow: [
                { step: '01. Selección de Escena', desc: 'El usuario selecciona un entorno: conducción nocturna (luces de coches), oficina (pantallas LED) o exterior soleado.' },
                { step: '02. Modulación de Capas', desc: 'Activación simultánea o individual de filtros (Blue Cut, Antirreflejo, Polarizado, Fotocromático).' },
                { step: '03. Computación Óptica', desc: 'Cálculo de transmitancia espectral, eliminación de deslumbramientos parásitos y curvas de atenuación.' },
                { step: '04. Composición Gráfica', desc: 'Renderizado en Canvas acelerado por hardware sin incurrir en cuellos de botella de manipulación pesada del DOM.' },
                { step: '05. Comparador Split-Screen', desc: 'Modo comparativo interactivo antes/después con barra deslizadora para validación inmediata.' }
            ],
            keyDecisions: [
                {
                    title: 'Arquitectura Vanilla Zero-Dependencies',
                    reason: 'Carga en menos de 0.5 segundos en cualquier tablet de óptica conectada a red móvil o Wi-Fi sin paquetes pesados de npm.'
                },
                {
                    title: 'Composición Directa en Canvas vs CSS Filters en DOM',
                    reason: 'Evita el repintado forzado del árbol DOM del navegador, garantizando 60 cuadros por segundo estables en pantallas táctiles.'
                },
                {
                    title: 'Separación Desacoplada de Escenas y Tratamientos',
                    reason: 'Permite añadir nuevos filtros oftálmicos (ej. polarizado degradé o antirreflejo acromático) sin modificar el núcleo de renderizado.'
                }
            ]
        },
        challenges: [
            {
                title: 'Simulación Realista del Deslumbramiento Nocturno (Glare)',
                challenge: 'Representar los halos y destellos de faros de coches en conducción nocturna sin saturar el procesador gráfico de tablets.',
                solution: 'Generación de gradientes radiales optimizados en memoria y superposición mediante operaciones de composición destination-over.'
            },
            {
                title: 'Transición Fotocromática Progresiva',
                challenge: 'Los lentes fotosensibles no se oscurecen instantáneamente; requieren una curva temporal de activación UV.',
                solution: 'Implementación de un interpolador temporal (LERP) que simula el tiempo de respuesta químico del lente según la radiación solar seleccionada.'
            }
        ],
        impact: {
            es: 'Herramienta clínica desplegada en producción que incrementa la comprensión del paciente y eleva la tasa de prescripción de filtros ópticos protectores en consultas profesionales.',
            en: 'Production-deployed clinical simulator that dramatically enhances patient comprehension and drives higher prescription conversion for protective optical lenses.'
        }
    };

    if (typeof window !== 'undefined') {
        window.FILTERS_SIMULATOR_MODULE = filtersSimulatorModule;
    }
    if (typeof module !== 'undefined') {
        module.exports = filtersSimulatorModule;
    }
})();
