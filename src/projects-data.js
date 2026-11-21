/**
 * ==========================================================================
 * Portfolio JayzirTech — Projects Data (ES / EN)
 * ==========================================================================
 * Data model for Single Page Application (SPA) project detail pages.
 * Supports bilingual content, technical architecture, engineering decisions,
 * and key challenges.
 */

const PROJECTS_DATA = [
    {
        id: 'datamart-pipeline',
        title: {
            es: 'DataMart Analytical ETL Pipeline',
            en: 'DataMart Analytical ETL Pipeline'
        },
        category: {
            es: 'Ingeniería de Datos / ETL',
            en: 'Data Engineering / ETL'
        },
        badge: {
            es: 'Pipeline de Producción',
            en: 'Production Pipeline'
        },
        summary: {
            es: 'Pipeline ETL analítico de extremo a extremo impulsado por Apache Airflow (CeleryExecutor y RabbitMQ), Data Warehouse en PostgreSQL y microservicio de catálogo de productos en FastAPI, totalmente contenedorizado con Docker.',
            en: 'End-to-end analytical ETL pipeline powered by Apache Airflow (CeleryExecutor & RabbitMQ), PostgreSQL Data Warehouse, and FastAPI product catalog microservice, fully containerized with Docker.'
        },
        github: 'https://github.com/JayzirTech/datamart-analytics-etl-pipeline',
        demo: null,
        stats: [
            {
                label: { es: 'Orquestación', en: 'Orchestration' },
                value: 'Airflow + Celery'
            },
            {
                label: { es: 'Message Broker', en: 'Message Broker' },
                value: 'RabbitMQ'
            },
            {
                label: { es: 'Almacenamiento', en: 'Data Storage' },
                value: 'PostgreSQL DW'
            },
            {
                label: { es: 'Infraestructura', en: 'Infrastructure' },
                value: 'Docker Compose'
            }
        ],
        tags: ['Apache Airflow', 'FastAPI', 'RabbitMQ', 'Celery', 'PostgreSQL', 'Docker', 'Python', 'ETL', 'SQLAlchemy'],
        overview: {
            es: 'Este proyecto implementa una infraestructura analítica robusta y escalable orientada al procesamiento por lotes de transacciones de ventas y métricas operativas. La solución extrae datos heterogéneos, ejecuta validaciones de integridad, transforma esquemas operacionales a estructuras dimensionales y los pone a disposición de analistas y microservicios downstream mediante APIs REST asíncronas.',
            en: 'This project implements a robust and scalable analytical infrastructure designed for batch processing of sales transactions and operational metrics. The solution extracts heterogeneous data, enforces strict integrity validations, transforms OLTP operational schemas into analytical dimensional models, and serves them to downstream microservices and BI teams via async RESTful endpoints.'
        },
        problem: {
            title: {
                es: 'El Problema / Necesidad de Negocio',
                en: 'The Problem & Business Need'
            },
            description: {
                es: 'Los sistemas transaccionales tradicionales sufren degradación de rendimiento cuando analistas ejecutan consultas analíticas pesadas directamente contra la base de datos de producción (OLTP). Además, los fallos transitorios en fuentes externas provocaban pipelines rotos y falta de trazabilidad.',
                en: 'Traditional transactional systems suffer severe performance degradation when analysts run heavy analytical aggregation queries directly against the production OLTP database. Additionally, transient network failures in external APIs caused broken, untraceable data loads.'
            },
            painPoints: {
                es: [
                    'Sobrecarga en la base de datos operacional por reportes analíticos simultáneos.',
                    'Falta de tolerancia a fallos y reintentos automatizados en tareas de ingesta.',
                    'Ausencia de un modelo dimensional optimizado para agregaciones rápidas de ingresos y stock.',
                    'Dificultad para desplegar y reproducir el ecosistema en diferentes entornos.'
                ],
                en: [
                    'Operational OLTP database overload due to simultaneous analytical reporting queries.',
                    'Lack of fault tolerance and automated retries in batch ingestion workflows.',
                    'Absence of an optimized dimensional model for fast revenue and inventory aggregations.',
                    'High complexity in reproducing and deploying the multi-service data stack across environments.'
                ]
            }
        },
        architecture: {
            title: {
                es: 'Arquitectura Técnica y Flujo de Datos',
                en: 'Technical Architecture & Data Flow'
            },
            description: {
                es: 'El sistema desacopla la extracción, transformación y consumo mediante contenedores aislados y comunicación distribuida.',
                en: 'The system completely decouples extraction, transformation, and consumption via isolated containers and distributed worker communication.'
            },
            flow: {
                es: [
                    { step: '01. Ingesta', desc: 'DAGs programados en Airflow extraen eventos transaccionales desde el catálogo FastAPI y fuentes externas.' },
                    { step: '02. Cola de Tareas', desc: 'Airflow delega tareas concurrentes a través de RabbitMQ hacia un pool de Celery Workers independientes.' },
                    { step: '03. Validación y Transformación', desc: 'Módulos en Python limpian datos nulos, normalizan tipos, calculan KPIs acumulados y generan llaves subrogadas.' },
                    { step: '04. Carga Analítica', desc: 'Inserción masiva optimizada (UPSERT / Copy) en el Data Warehouse PostgreSQL bajo esquema analítico.' },
                    { step: '05. Consumo', desc: 'API de consulta analítica en FastAPI que expone métricas y estados del pipeline en milisegundos.' }
                ],
                en: [
                    { step: '01. Ingestion', desc: 'Scheduled Airflow DAGs extract transactional events from FastAPI catalog endpoints and external sources.' },
                    { step: '02. Task Queuing', desc: 'Airflow offloads concurrent task execution via RabbitMQ to an independent pool of Celery Workers.' },
                    { step: '03. Validation & Transformation', desc: 'Python modules cleanse null values, cast datatypes, compute accumulated KPIs, and generate surrogate keys.' },
                    { step: '04. Analytical Load', desc: 'Optimized bulk load (UPSERT / Copy) into PostgreSQL Data Warehouse under an analytical schema.' },
                    { step: '05. Consumption', desc: 'FastAPI analytical query endpoints exposing warehouse metrics and pipeline health status in milliseconds.' }
                ]
            },
            keyDecisions: {
                es: [
                    { title: 'CeleryExecutor vs SequentialExecutor', reason: 'Permite ejecución horizontalmente distribuida de tareas en paralelo sin bloquear el scheduler de Airflow.' },
                    { title: 'RabbitMQ como Message Broker', reason: 'Garantiza entrega confiable de mensajes entre scheduler y workers con bajo consumo de memoria y alta velocidad.' },
                    { title: 'Esquema Desacoplado OLTP / OLAP', reason: 'Protege las transacciones de negocio separando las lecturas analíticas en un DataMart especializado.' }
                ],
                en: [
                    { title: 'CeleryExecutor vs SequentialExecutor', reason: 'Enables horizontally distributed task execution in parallel without blocking the Airflow scheduler.' },
                    { title: 'RabbitMQ as Message Broker', reason: 'Guarantees reliable message delivery between scheduler and workers with low memory footprint and high throughput.' },
                    { title: 'Decoupled OLTP / OLAP Schema', reason: 'Shields core business transactions by isolating heavy analytical reads into a dedicated DataMart.' }
                ]
            }
        },
        features: {
            es: [
                { title: 'Reintentos Inteligentes y Alertamiento', desc: 'Manejo automatizado de fallas temporales con retroceso exponencial (exponential backoff) en tareas críticas.' },
                { title: 'Contenedorización Completa', desc: 'Orquestación de 6 servicios (Webserver, Scheduler, Celery Worker, RabbitMQ, Postgres DW, FastAPI) con Docker Compose.' },
                { title: 'Monitoreo de Calidad de Datos', desc: 'Validaciones de integridad referencial y tests de esquema antes de confirmar la carga en la capa analítica.' },
                { title: 'Endpoints de Consulta Rápida', desc: 'APIs documentadas con Swagger/OpenAPI para interrogar métricas de ventas y rendimiento en tiempo real.' }
            ],
            en: [
                { title: 'Smart Retries & Alerting', desc: 'Automated transient error handling with exponential backoff on critical network and database tasks.' },
                { title: 'Full Stack Containerization', desc: 'Seamless orchestration of 6 services (Webserver, Scheduler, Celery Worker, RabbitMQ, Postgres DW, FastAPI) via Docker Compose.' },
                { title: 'Data Quality Verification', desc: 'Referential integrity checks and schema contract validations before committing loads to the analytics layer.' },
                { title: 'High-Performance Query Endpoints', desc: 'Auto-documented OpenAPI endpoints for querying sales figures and pipeline execution history in real time.' }
            ]
        },
        challenges: {
            es: [
                {
                    title: 'Gestión de Dependencias y Conexiones en Docker',
                    challenge: 'Sincronizar el arranque de servicios para evitar que Airflow Scheduler intentara conectarse a RabbitMQ o Postgres antes de que estuviesen listos.',
                    solution: 'Implementación de scripts healthcheck robustos en Docker Compose y reintentos de conexión a nivel de driver SQLAlchemy.'
                },
                {
                    title: 'Rendimiento en Inserciones Masivas',
                    challenge: 'Inserciones fila por fila ralentizaban el pipeline a medida que aumentaba el volumen de transacciones sintéticas.',
                    solution: 'Refactorización hacia operaciones en lote (batch loading) utilizando inserciones estructuradas por lotes reduciendo el tiempo de carga en un 78%.'
                }
            ],
            en: [
                {
                    title: 'Container Dependency & Service Synchronization',
                    challenge: 'Ensuring Airflow Scheduler and Celery Workers only started after RabbitMQ and PostgreSQL were fully initialized and healthy.',
                    solution: 'Built comprehensive Docker Compose healthchecks and container dependency conditions combined with resilient SQLAlchemy retry logic.'
                },
                {
                    title: 'Bulk Insertion Throughput Bottlenecks',
                    challenge: 'Single-row inserts caused noticeable pipeline latency as synthetic transaction volume grew.',
                    solution: 'Refactored to chunked batch bulk-insert operations, slashing loading time by over 78%.'
                }
            ]
        },
        impact: {
            es: 'Pipeline modular listo para producción que demuestra el ciclo de vida completo de la ingeniería de datos: desde la orquestación distribuida hasta el consumo analítico confiable.',
            en: 'Production-ready modular pipeline demonstrating the end-to-end data engineering lifecycle: from distributed orchestration to reliable analytical consumption.'
        }
    },
    {
        id: 'mercado-nube',
        title: {
            es: 'Mercado Nube Analytics Engine',
            en: 'Mercado Nube Analytics Engine'
        },
        category: {
            es: 'Arquitectura de Datos / BI',
            en: 'Data Architecture / BI'
        },
        badge: {
            es: 'Data Warehouse Dimensional',
            en: 'Dimensional Data Warehouse'
        },
        summary: {
            es: 'Data Warehouse dimensional (Esquema Estrella y SCD Tipo 2) diseñado para resolver consultas analíticas complejas, gestionar eventos con llegada tardía (>24h) y automatizar compuertas de calidad de datos.',
            en: 'Dimensional Data Warehouse (Star Schema & SCD Type 2) designed to resolve complex analytical queries, handle late-arriving events (>24h), and automate data quality gates.'
        },
        github: 'https://github.com/JayzirTech/mercado-nube-analytics-engine-',
        demo: null,
        stats: [
            {
                label: { es: 'Metodología', en: 'Methodology' },
                value: 'Kimball Star Schema'
            },
            {
                label: { es: 'Historial', en: 'Historization' },
                value: 'SCD Type 2'
            },
            {
                label: { es: 'Tolerancia', en: 'Late Events' },
                value: 'Late-Arriving (>24h)'
            },
            {
                label: { es: 'Motor SQL', en: 'SQL Engine' },
                value: 'PostgreSQL 16'
            }
        ],
        tags: ['Star Schema', 'SCD Type 2', 'SQL', 'PostgreSQL', 'Kimball', 'Data Modeling', 'Airflow', 'Docker'],
        overview: {
            es: 'Mercado Nube Analytics Engine es un motor analítico integral basado en la metodología Kimball para plataformas de comercio electrónico. Su núcleo resuelve uno de los mayores dolores de la analítica moderna: mantener la precisión histórica de clientes, productos y precios sin sobreescribir el pasado ni corromper las métricas financieras.',
            en: 'Mercado Nube Analytics Engine is an end-to-end analytical data platform modeled under Kimball methodology for e-commerce environments. Its core solves one of modern data analytics biggest pain points: preserving historical state changes for customers, catalogs, and pricing without overwriting the past or corrupting historical financial metrics.'
        },
        problem: {
            title: {
                es: 'El Problema / Desafío Dimensional',
                en: 'The Problem & Dimensional Challenge'
            },
            description: {
                es: 'En plataformas de ventas en línea, los precios cambian, los usuarios actualizan su dirección y los pedidos llegan con retrasos de red o sincronicidad. Si se sobreescriben los registros, los reportes financieros del pasado cambian retroactivamente, invalidando auditorías y KPIs de negocio.',
                en: 'In e-commerce platforms, prices fluctuate, customers update billing addresses, and order events frequently arrive out of order or with multi-day network delays. Overwriting dimensional rows retroactively alters historical financial reports, invalidating audits and business KPIs.'
            },
            painPoints: {
                es: [
                    'Pérdida de trazabilidad cuando un producto cambia de precio o categoría en el catálogo.',
                    'Corrupción de métricas analíticas por transacciones que llegan más de 24 horas después del corte.',
                    'Consultas lentas sobre tablas transaccionales altamente normalizadas (3NF) con decenas de JOINs.',
                    'Falta de llaves subrogadas independientes del identificador mutable de negocio.'
                ],
                en: [
                    'Loss of audit traceability when products change price, category, or vendor over time.',
                    'Metric corruption caused by transactions arriving late (>24 hours) after business closing cut-offs.',
                    'Slow query performance on 3NF transactional schemas requiring dozens of expensive relational JOINs.',
                    'Absence of surrogate keys independent from mutable natural/business identifiers.'
                ]
            }
        },
        architecture: {
            title: {
                es: 'Diseño Dimensional y Compuertas de Calidad',
                en: 'Dimensional Design & Quality Gates'
            },
            description: {
                es: 'Implementación estricta de Esquema Estrella con Tabla de Hechos central (`fact_sales`) y dimensiones conformadas con versionamiento temporal.',
                en: 'Strict Star Schema implementation featuring a centralized Fact Table (`fact_sales`) and conformed dimensions with temporal versioning.'
            },
            flow: {
                es: [
                    { step: '01. Raw Staging', desc: 'Ingesta de datos crudos con validaciones de tipos y formato sin bloquear transformaciones.' },
                    { step: '02. SCD Tipo 2 Engine', desc: 'Detección de cambios de atributos en dimensiones: expiración de registro anterior (`valid_to = NOW()`) e inserción de nueva versión con llave subrogada nueva.' },
                    { step: '03. Late-Arriving Logic', desc: 'Asignación de transacciones retrasadas a la versión dimensional históricamente exacta que correspondía a la fecha del evento original.' },
                    { step: '04. Fact Enrichment', desc: 'Unión optimizada con dimensión fecha/tiempo y cálculo de márgenes brutos, impuestos y descuentos netos.' },
                    { step: '05. Data Quality Gates', desc: 'Comprobaciones automatizadas: unicidad de llaves primarias, llaves foráneas huérfanas y consistencia contable.' }
                ],
                en: [
                    { step: '01. Raw Staging', desc: 'Ingestion of raw staging data with schema validation and isolation from analytics consumers.' },
                    { step: '02. SCD Type 2 Engine', desc: 'Attribute delta detection: expiring prior version (`valid_to = NOW()`, `is_current = false`) and creating new version with fresh surrogate key.' },
                    { step: '03. Late-Arriving Logic', desc: 'Accurate retro-assignment of late-arriving events to the exact historical dimension version active at event creation time.' },
                    { step: '04. Fact Enrichment', desc: 'High-speed joins with Date/Time conformed dimensions and calculation of margins, taxes, and net discounts.' },
                    { step: '05. Data Quality Gates', desc: 'Automated assertion tests: surrogate uniqueness, orphan foreign keys, and financial reconciliation.' }
                ]
            },
            keyDecisions: {
                es: [
                    { title: 'SCD Tipo 2 en Dimensiones Clave', reason: 'Garantiza auditorías inmutables: si un producto subió de precio en mayo, las ventas de abril se reportan con el precio de abril.' },
                    { title: 'Llaves Subrogadas Enteras (Surrogate Keys)', reason: 'Acelera los JOINs entre hechos y dimensiones hasta 4x en comparación con identificadores UUID de texto.' },
                    { title: 'Compuertas de Calidad en Staging', reason: 'Evita la contaminación del Data Warehouse rechazando o aislando datos corruptos en tablas de error.' }
                ],
                en: [
                    { title: 'SCD Type 2 on Core Dimensions', reason: 'Guarantees audit immutability: sales that occurred in April reflect April catalog prices, even after May price revisions.' },
                    { title: 'Integer Surrogate Keys', reason: 'Dramatically speeds up Fact-to-Dimension joins up to 4x compared to textual UUID business keys.' },
                    { title: 'Staging Quality Assertion Gates', reason: 'Prevents warehouse pollution by isolating corrupt payloads into quarantine error tables before fact processing.' }
                ]
            }
        },
        features: {
            es: [
                { title: 'Motor de Versionado SCD Tipo 2', desc: 'Mantiene campos `valid_from`, `valid_to` e `is_current` actualizados atómicamente.' },
                { title: 'Tratamiento de Eventos Tardíos (>24h)', desc: 'Lógica SQL capaz de vincular una venta demorada con la versión exacta de la dimensión que estaba vigente cuando ocurrió.' },
                { title: 'Consultas Analíticas en Milisegundos', desc: 'Modelado orientado a agregaciones por tiempo, cliente, región y categoría con índices estratégicos B-tree.' },
                { title: 'Scripts de Migración y Semillas', desc: 'Estructura DDL completa, reproducible con un solo comando para desarrollo, pruebas unitarias y producción.' }
            ],
            en: [
                { title: 'SCD Type 2 Versioning Logic', desc: 'Maintains `valid_from`, `valid_to`, and `is_current` fields with atomic consistency.' },
                { title: 'Late-Arriving Events Handler (>24h)', desc: 'Specialized SQL logic mapping delayed sales records back to the exact historical dimension valid at creation timestamp.' },
                { title: 'Sub-second Analytical Queries', desc: 'Dimensional schema optimized for multi-axis aggregations across time, customer, geography, and categories.' },
                { title: 'Reproducible DDL & Seed Scripts', desc: 'Complete schema DDL scripts, fully reproducible with one command for testing and production environments.' }
            ]
        },
        challenges: {
            es: [
                {
                    title: 'Emparejamiento Temporal de Eventos Tardíos',
                    challenge: 'Evitar que un pedido retrasado tome la llave subrogada más reciente del cliente si este cambió de domicilio después de la compra.',
                    solution: 'Diseño de consulta con `BETWEEN valid_from AND valid_to` garantizando emparejamiento con el snapshot histórico exacto.'
                },
                {
                    title: 'Optimización de Consultas Agregadas',
                    challenge: 'Generar reportes multidimensionales de ventas acumuladas anuales sin incurrir en escaneos secuenciales completos de tabla.',
                    solution: 'Creación de índices compuestos sobre llaves foráneas y particionamiento lógico de hechos por rango temporal.'
                }
            ],
            en: [
                {
                    title: 'Temporal Window Matching for Late Events',
                    challenge: 'Preventing late-arriving sales orders from accidentally linking to the customer’s latest address if they relocated after placing the order.',
                    solution: 'Implemented range-aware join predicates (`BETWEEN valid_from AND valid_to`) to lock records to the exact historical dimension snapshot.'
                },
                {
                    title: 'Optimizing Heavy Aggregations',
                    challenge: 'Running multi-dimensional annual sales rollups without incurring expensive sequential full-table scans.',
                    solution: 'Engineered composite indexes on surrogate foreign keys and structured temporal range partitioning.'
                }
            ]
        },
        impact: {
            es: 'Un Data Warehouse enterprise-ready que garantiza trazabilidad total, consistencia histórica inalterable y velocidad de consulta analítica para la toma de decisiones.',
            en: 'An enterprise-grade Data Warehouse architecture guaranteeing 100% auditability, uncorrupted historical consistency, and high-performance BI reporting.'
        }
    },
    {
        id: 'ocularis',
        title: {
            es: 'Ocularis — Simulación Óptica',
            en: 'Ocularis — Optical Simulation'
        },
        category: {
            es: 'Simulación Física / App Web',
            en: 'Physics Simulation / Web App'
        },
        badge: {
            es: 'Modelado en Tiempo Real',
            en: 'Real-time Modeling'
        },
        summary: {
            es: 'Aplicación web interactiva de simulación óptica y educación para pacientes dirigida a optómetras. Modela trazado de rayos, errores refractivos focales y física de lentes correctivos en tiempo real.',
            en: 'Interactive optical simulation and patient education web app for optometrists. Models ray tracing, focal refractive errors, and corrective lens physics in real time.'
        },
        github: 'https://github.com/JayzirTech/ocularis',
        demo: null,
        stats: [
            {
                label: { es: 'Rendimiento', en: 'Performance' },
                value: '60 FPS fluido'
            },
            {
                label: { es: 'Modelo Físico', en: 'Physics Model' },
                value: 'Snell Ray-Tracing'
            },
            {
                label: { es: 'Patologías', en: 'Conditions' },
                value: 'Miopía / Hipermetropía'
            },
            {
                label: { es: 'Arquitectura', en: 'Architecture' },
                value: 'Vanilla JS + Canvas'
            }
        ],
        tags: ['JavaScript ES6+', 'HTML5 Canvas', 'Ray Tracing', 'Optics Physics', 'Mathematical Modeling', 'UI/UX', 'Glassmorphism'],
        overview: {
            es: 'Ocularis une la ingeniería física y mecatrónica con el desarrollo frontend interactivo. Es una herramienta clínica y didáctica que permite a profesionales de la salud visual explicar de manera visual e interactiva cómo los defectos refractivos (miopía, hipermetropía, astigmatismo) distorsionan el punto focal en la retina, y cómo los lentes cóncavos o convexos corrigen la refracción en tiempo real.',
            en: 'Ocularis bridges physical mechatronics engineering principles with modern interactive web development. Built as a clinical and educational simulator, it empowers eye-care professionals to visually demonstrate how focal refractive errors (myopia, hyperopia, astigmatism) displace the focal point relative to the retina, and how concave or convex corrective lenses restore clear vision in real time.'
        },
        problem: {
            title: {
                es: 'El Problema / Barrera de Comunicación Clínica',
                en: 'The Problem & Clinical Communication Gap'
            },
            description: {
                es: 'En la consulta oftalmológica y optométrica, explicar diagnósticos técnicos mediante diagramas estáticos o fórmulas de dioptrías genera confusión y desconexión en los pacientes, dificultando la comprensión del tratamiento prescrito.',
                en: 'In optometry and ophthalmology clinics, communicating complex refractive diagnoses using static pamphlets or abstract diopter values often confuses patients, making it difficult for them to grasp why specific corrective prescriptions are necessary.'
            },
            painPoints: {
                es: [
                    'Dificultad de los pacientes para visualizar por qué su visión es borrosa a distintas distancias.',
                    'Falta de herramientas interactivas ligeras que funcionen en cualquier navegador o tablet sin instalar software pesado.',
                    'Soluciones comerciales existentes demasiado costosas, lentas o sobrecargadas de parámetros no intuitivos.',
                    'Necesidad de retroalimentación visual inmediata al modificar la graduación de lentes.'
                ],
                en: [
                    'Patients struggle to understand why their focal point fails to land on the retina.',
                    'Lack of lightweight, instant web tools that run smoothly on tablets and mobile screens without heavy software installs.',
                    'Existing proprietary simulators are clunky, expensive, and overwhelmed by clinical jargon.',
                    'Need for immediate, responsive visual feedback when adjusting lens diopter sliders.'
                ]
            }
        },
        architecture: {
            title: {
                es: 'Motor Físico y Renderizado Gráfico',
                en: 'Physics Engine & Graphic Rendering'
            },
            description: {
                es: 'Motor matemático de trazado de rayos lumínicos implementado en Vanilla JavaScript con renderizado acelerado en Canvas 2D.',
                en: 'Mathematical light ray-tracing engine built in Vanilla JavaScript with hardware-accelerated 2D Canvas rendering.'
            },
            flow: {
                es: [
                    { step: '01. Entrada de Parámetros', desc: 'El usuario ajusta sliders: longitud axial del ojo, curvatura corneal y dioptrías del lente correctivo.' },
                    { step: '02. Cálculo de Refracción', desc: 'Algoritmo trigonométrico que aplica la Ley de Snell y la aproximación paraxial para cada haz de luz incidente.' },
                    { step: '03. Corrección Óptica', desc: 'Cálculo de la desviación angular inducida por lentes convergentes (+) o divergentes (-).' },
                    { step: '04. Trazado Retiniano', desc: 'Determinación de la convergencia focal: si coincide con la retina (visión nítida) o cae anterior/posterior (desenfoque).' },
                    { step: '05. Renderizado a 60 FPS', desc: 'Ciclo `requestAnimationFrame` que redibuja haces luminosos con brillo estético y guías de referencia.' }
                ],
                en: [
                    { step: '01. Parameter Input', desc: 'Clinician or patient adjusts sliders: eye axial length, corneal curvature, and corrective lens power.' },
                    { step: '02. Refraction Solver', desc: 'Trigonometric algorithm computing Snell’s law and paraxial ray deviations for incident light rays.' },
                    { step: '03. Lens Optics Calculation', desc: 'Computes focal length shift induced by converging (+) or diverging (-) corrective lenses.' },
                    { step: '04. Retinal Convergence', desc: 'Calculates whether rays converge exactly on the retinal plane (sharp vision) or disperse (blurred blur circle).' },
                    { step: '05. 60 FPS Render Loop', desc: 'Optimized `requestAnimationFrame` drawing dynamic glowing rays and anatomical guide lines.' }
                ]
            },
            keyDecisions: {
                es: [
                    { title: 'Zero Dependencies (Vanilla JS + Canvas)', reason: 'Carga instantánea en cualquier tablet de consultorio sin dependencias pesadas ni tiempos de compilación.' },
                    { title: 'Física Paraxial Simplificada', reason: 'Balance óptimo entre precisión científica rigurosa y velocidad de cálculo en tiempo real a 60 cuadros por segundo.' },
                    { title: 'Diseño Cyber / Medical Dark Mode', reason: 'Excelente contraste visual que destaca el camino de los haces de luz en pantallas de consultorio.' }
                ],
                en: [
                    { title: 'Zero Dependencies (Vanilla JS + Canvas)', reason: 'Sub-second initial load on any exam-room tablet or laptop with zero bundle overhead.' },
                    { title: 'Paraxial Approximation Engine', reason: 'Strikes the ideal balance between scientific accuracy and smooth 60 FPS real-time rendering.' },
                    { title: 'High-Contrast Dark Theme UI', reason: 'Provides optimal visual clarity, making glowing light ray paths easily distinguishable in clinical lighting.' }
                ]
            }
        },
        features: {
            es: [
                { title: 'Simulación en Vivo de Defectos Focales', desc: 'Alterna entre ojo emétrope (normal), ojo miope (eje alargado) y ojo hipermétrope (eje corto).' },
                { title: 'Corrección con Lentes Dinámicos', desc: 'Añade lentes cóncavos o convexos y observa cómo el foco se desplaza instantáneamente hacia la fóvea.' },
                { title: 'Representación Gráfica del Desenfoque', desc: 'Cálculo visual del círculo de confusión que percibe el paciente según la distancia de enfoque.' },
                { title: 'Diseño Totalmente Responsivo', desc: 'Adaptable tanto a pantallas táctiles como a ordenadores de escritorio para demostraciones rápidas.' }
            ],
            en: [
                { title: 'Live Refractive Defect Simulation', desc: 'Instantly toggle between emmetropic (normal), myopic (elongated axis), and hyperopic (short axis) eyes.' },
                { title: 'Dynamic Lens Power Adjustment', desc: 'Add diverging or converging lenses to observe focal realignment directly onto the retinal fovea.' },
                { title: 'Blur Circle Visualizer', desc: 'Visual calculation and rendering of the circle of confusion perceived by the patient.' },
                { title: 'Touch-First Responsive UI', desc: 'Seamlessly works across touch iPads, tablets, and desktop workstations for clinical presentations.' }
            ]
        },
        challenges: {
            es: [
                {
                    title: 'Rendimiento en Dispositivos Móviles',
                    challenge: 'Redibujar decenas de rayos luminosos con efectos de transparencia podía provocar caídas de frames en tablets antiguas.',
                    solution: 'Optimización de trazado vectorial en una sola pasada de canvas (single-path batching) manteniendo 60 FPS estables.'
                },
                {
                    title: 'Fidelidad Visual vs Rigor Matemático',
                    challenge: 'Un modelo óptico estricto requiere ecuaciones no lineales que distorsionan la escala anatómica visible para un paciente.',
                    solution: 'Normalización de escalas geométricas manteniendo la validez del principio físico sin desproporcionar el diagrama ocular.'
                }
            ],
            en: [
                {
                    title: 'Mobile & Tablet Rendering Performance',
                    challenge: 'Redrawing multiple transparent glowing rays caused frame drops on low-power clinic tablets.',
                    solution: 'Batch-optimized canvas path drawing with single-stroke executions, guaranteeing stable 60 FPS.'
                },
                {
                    title: 'Visual Fidelity vs Exact Mathematics',
                    challenge: 'Strict physical optics calculations produce scales that can visually deform anatomical cross-sections for patients.',
                    solution: 'Normalized proportional geometric scales that preserve true physical optics while maintaining clean visual clarity.'
                }
            ]
        },
        impact: {
            es: 'Una demostración viva del potencial de integrar la física aplicada y la ingeniería con interfaces web interactivas para resolver problemas de comunicación científica.',
            en: 'A tangible example of synthesizing applied physics, mechatronics principles, and modern web interfaces to elevate scientific and medical communication.'
        }
    },
    {
        id: 'fastapi-backend',
        title: {
            es: 'FastAPI Microservice Backend',
            en: 'FastAPI Microservice Backend'
        },
        category: {
            es: 'API Backend',
            en: 'Backend API'
        },
        badge: {
            es: 'Microservicio Asíncrono',
            en: 'Async Microservice'
        },
        summary: {
            es: 'API REST asíncrona de alto rendimiento conectada a bases de datos relacionales, implementando arquitectura limpia, enrutamiento modular y validación de datos con Pydantic.',
            en: 'High-throughput asynchronous REST API connected to relational databases, implementing clean architecture, modular routing, and Pydantic data validation.'
        },
        github: 'https://github.com/JayzirTech/fastapi_app_jayzirTech',
        demo: null,
        stats: [
            {
                label: { es: 'Framework', en: 'Framework' },
                value: 'FastAPI (Python 3.11+)'
            },
            {
                label: { es: 'Validación', en: 'Validation' },
                value: 'Pydantic v2'
            },
            {
                label: { es: 'Arquitectura', en: 'Architecture' },
                value: 'Clean Architecture'
            },
            {
                label: { es: 'Documentación', en: 'Documentation' },
                value: 'OpenAPI / Swagger'
            }
        ],
        tags: ['FastAPI', 'Python', 'PostgreSQL', 'Pydantic', 'Clean Architecture', 'Uvicorn', 'Docker', 'REST API', 'AsyncIO'],
        overview: {
            es: 'Microservicio backend de alto desempeño diseñado bajo estándares modernos de desarrollo en Python. Construido sobre FastAPI y AsyncIO, implementa una arquitectura desacoplada por capas (Routers, Services, Repositories) con validación estricta de esquemas de datos, inyección de dependencias y persistencia asíncrona.',
            en: 'High-performance backend microservice engineered to modern Python production standards. Powered by FastAPI and AsyncIO, it implements a decoupled layered architecture (Routers, Services, Repositories) with strict data contract validation via Pydantic, native dependency injection, and async relational persistence.'
        },
        problem: {
            title: {
                es: 'El Problema / Desafío de Escalabilidad Backend',
                en: 'The Problem & Backend Scalability Challenge'
            },
            description: {
                es: 'Muchos backends construidos en frameworks síncronos tradicionales sufren cuellos de botella ante cargas concurrentes de E/S (lecturas y escrituras de bases de datos), colapsando los hilos de ejecución y aumentando la latencia de respuesta.',
                en: 'Many legacy backend services built on synchronous frameworks suffer severe I/O concurrency bottlenecks under sustained database query loads, saturating worker threads and driving up API response latency.'
            },
            painPoints: {
                es: [
                    'Bloqueo de hilos del servidor por operaciones de lectura/escritura síncronas en bases de datos.',
                    'Falta de validación estricta en el payload de entrada provocando errores no controlados (500).',
                    'Dificultad de mantenimiento en bases de código monolíticas sin separación de responsabilidades.',
                    'Ausencia de documentación sincronizada en tiempo real con los contratos de la API.'
                ],
                en: [
                    'Thread blocking under high concurrency due to synchronous database network I/O calls.',
                    'Fragile runtime payloads leading to unhandled internal server exceptions (500 errors).',
                    'High maintenance overhead in monolithic or tightly-coupled route handlers.',
                    'Out-of-sync API contracts and outdated external API documentation.'
                ]
            }
        },
        architecture: {
            title: {
                es: 'Capas de la Arquitectura Limpia',
                en: 'Clean Architecture Layers'
            },
            description: {
                es: 'Separación estricta de responsabilidades que garantiza testeabilidad, desacoplamiento y escalabilidad del código.',
                en: 'Strict separation of concerns ensuring testability, decoupling, and high scalability across components.'
            },
            flow: {
                es: [
                    { step: '01. Entrypoint & Middleware', desc: 'CORS configurable, manejo centralizado de excepciones y logging estructurado de peticiones entrantes.' },
                    { step: '02. Routers & Controllers', desc: 'Enrutamiento modular versionado (`/api/v1/`) con inyección de dependencias para autenticación y sesiones de base de datos.' },
                    { step: '03. Pydantic Schemas', desc: 'Validación en tiempo de ejecución de tipos, longitudes y reglas de negocio en payloads de entrada y respuesta.' },
                    { step: '04. Service Layer', desc: 'Lógica de negocio pura independiente del framework web y desacoplada de la base de datos.' },
                    { step: '05. Data Access / Repository', desc: 'Consultas asíncronas optimizadas y pool de conexiones gestionado hacia PostgreSQL.' }
                ],
                en: [
                    { step: '01. Entrypoint & Middleware', desc: 'Configurable CORS, centralized exception handlers, and structured HTTP request logging.' },
                    { step: '02. Modular Routers', desc: 'Versioned API routes (`/api/v1/`) leveraging native FastAPI dependency injection for DB sessions.' },
                    { step: '03. Pydantic Contracts', desc: 'Strict runtime schema validation, data casting, and response serialization matching OpenAPI specifications.' },
                    { step: '04. Domain Services', desc: 'Pure business logic isolated from HTTP request contexts and independent of specific database drivers.' },
                    { step: '05. Async Repository', desc: 'Asynchronous connection-pooled database interactions querying PostgreSQL with high concurrency.' }
                ]
            },
            keyDecisions: {
                es: [
                    { title: 'Async / Await Nativo con Uvicorn', reason: 'Permite manejar miles de conexiones simultáneas sin bloquear el bucle de eventos (Event Loop).' },
                    { title: 'Inyección de Dependencias (Depends)', reason: 'Facilita la inyección de sesiones de base de datos y la sustitución por mocks en pruebas unitarias.' },
                    { title: 'Auto-documentación OpenAPI / Swagger', reason: 'Generación automática de contratos interactivos sin esfuerzo manual de mantenimiento.' }
                ],
                en: [
                    { title: 'Native AsyncIO with Uvicorn', reason: 'Processes thousands of concurrent I/O connections without blocking the main event loop.' },
                    { title: 'Native Dependency Injection (Depends)', reason: 'Simplifies session lifecycle management and allows effortless mock injection during unit testing.' },
                    { title: 'Automated OpenAPI / Swagger Specs', reason: 'Generates live, interactive API documentation directly from Python type hints and Pydantic models.' }
                ]
            }
        },
        features: {
            es: [
                { title: 'Arquitectura Limpia en Capas', desc: 'Código modular organizado en Routers, Schemas, Services y Repositories.' },
                { title: 'Operaciones CRUD Asíncronas', desc: 'Gestión de base de datos no bloqueante con pool de conexiones optimizado.' },
                { title: 'Validación Fuerte y Mensajes de Error Claros', desc: 'Respuestas HTTP 422 descriptivas ante datos de entrada no conformes.' },
                { title: 'Preparado para Contenedorización', desc: 'Dockerfile optimizado con compilación multi-etapa y usuario no root para seguridad.' }
            ],
            en: [
                { title: 'Layered Clean Architecture', desc: 'Well-structured codebase partitioned into Routers, Schemas, Services, and Repositories.' },
                { title: 'Non-blocking Async CRUD', desc: 'High-throughput database transactions utilizing an intelligent connection pool.' },
                { title: 'Robust Validation & Explicit Errors', desc: 'Clear, standardized HTTP 422 JSON errors on invalid client request payloads.' },
                { title: 'Container-Ready Setup', desc: 'Production-ready multi-stage Dockerfile adhering to least-privilege security practices.' }
            ]
        },
        challenges: {
            es: [
                {
                    title: 'Ciclo de Vida de Conexiones de Base de Datos',
                    challenge: 'Evitar fugas de conexiones o timeouts en picos de solicitudes concurrentes.',
                    solution: 'Implementación de gestores de contexto asíncronos (`async with`) e inyección de sesiones con cierre garantizado.'
                },
                {
                    title: 'Estandarización de Respuestas de Error',
                    challenge: 'Evitar que excepciones no controladas expongan trazas de código o caigan en respuestas inconsistentes.',
                    solution: 'Manejadores globales de excepciones (`Exception Handlers`) que transforman cualquier falla en un formato JSON estándar.'
                }
            ],
            en: [
                {
                    title: 'Database Connection Pool Lifecycles',
                    challenge: 'Preventing connection leaks and thread pool exhaustion during traffic spikes.',
                    solution: 'Implemented asynchronous context managers (`async with`) and scoped dependency injection ensuring deterministic cleanup.'
                },
                {
                    title: 'Standardized Global Error Formatting',
                    challenge: 'Preventing unhandled exceptions from leaking internal stack traces or returning inconsistent JSON bodies.',
                    solution: 'Configured global custom exception handlers intercepting runtime errors into standardized API response envelopes.'
                }
            ]
        },
        impact: {
            es: 'Un servicio REST moderno, mantenible y escalable que sirve de base sólida para arquitecturas de microservicios y consumo de datos.',
            en: 'A modern, maintainable, and high-performance REST service providing a solid foundation for data-intensive microservice architectures.'
        }
    }
];

if (typeof window !== 'undefined') {
    window.PROJECTS_DATA = PROJECTS_DATA;
}
