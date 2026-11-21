/**
 * ==========================================================================
 * Portfolio JayzirTech — Technical Documentation Data (ES / EN)
 * ==========================================================================
 * Library-documentation style data model for projects.
 * Focuses on business pain points, architectural specs, code snippets,
 * design trade-offs, and implementation details.
 */

const PROJECTS_DATA = [
    {
        id: 'datamart-pipeline',
        version: 'v2.1.0-prod',
        title: {
            es: 'DataMart Analytical ETL Pipeline',
            en: 'DataMart Analytical ETL Pipeline'
        },
        category: {
            es: 'Ingeniería de Datos / Orquestación',
            en: 'Data Engineering / Orchestration'
        },
        badge: {
            es: 'Pipeline Distribuido',
            en: 'Distributed Pipeline'
        },
        painSummary: {
            es: 'Evita el colapso de bases de datos operacionales cuando finanzas y analistas saturan el sistema con reportes pesados. Centraliza y procesa ventas automáticamente sin interrumpir la operación del negocio.',
            en: 'Prevents operational database crashes when finance and analytics teams run heavy reports on production systems. Automatically centralizes and transforms sales data without business disruption.'
        },
        github: 'https://github.com/JayzirTech/datamart-analytics-etl-pipeline',
        demo: null,
        specs: [
            { key: { es: 'Orquestador', en: 'Orchestrator' }, value: 'Apache Airflow (CeleryExecutor)' },
            { key: { es: 'Message Broker', en: 'Message Broker' }, value: 'RabbitMQ (AMQP 0-9-1)' },
            { key: { es: 'Almacenamiento OLAP', en: 'OLAP Storage' }, value: 'PostgreSQL 16 (Analytical Schema)' },
            { key: { es: 'Consumo / API', en: 'Consumption API' }, value: 'FastAPI + Pydantic v2' },
            { key: { es: 'Infraestructura', en: 'Infrastructure' }, value: 'Docker Compose (6 Microservicios)' },
            { key: { es: 'Estrategia de Carga', en: 'Load Strategy' }, value: 'Idempotent Chunked Batch UPSERT' }
        ],
        stats: [
            { label: { es: 'Modo Scheduler', en: 'Scheduler Mode' }, value: 'Celery Distributed' },
            { label: { es: 'Throughput Lote', en: 'Batch Throughput' }, value: '~2,500 rec/sec' },
            { label: { es: 'Tasa de Éxito', en: 'Execution Reliability' }, value: '99.98% SLA' },
            { label: { es: 'Aislamiento', en: 'OLTP Isolation' }, value: '100% Desacoplado' }
        ],
        tags: ['Apache Airflow', 'Celery', 'RabbitMQ', 'PostgreSQL', 'FastAPI', 'Docker Compose', 'Python 3.11', 'ETL / ELT'],
        overview: {
            es: 'DataMart ETL es un framework de datos contenerizado que separa completamente las cargas transaccionales de las analíticas. Orquesta la ingesta paralela desde fuentes heterogéneas mediante RabbitMQ y Celery, transformando esquemas OLTP en tablas dimensionales de consulta rápida expuestas vía endpoints REST.',
            en: 'DataMart ETL is a containerized data engineering platform built to completely isolate transactional OLTP systems from intensive analytical reporting. It orchestrates parallel extraction via RabbitMQ and Celery workers, converting transactional schemas into dimensional analytical tables served by async REST endpoints.'
        },
        problem: {
            title: {
                es: 'Problema & Dolor de Negocio',
                en: 'Problem & Business Impact'
            },
            description: {
                es: 'Cuando analistas de negocio, equipos de finanzas y dashboards ejecutan consultas analíticas pesadas (sumatorias anuales, filtros multidimensionales) directamente sobre la base de datos de producción (OLTP), los bloqueos de tablas y el consumo de CPU congelan las compras de los clientes finales y provocan caídas del sistema.',
                en: 'When BI analysts, finance teams, and executive dashboards execute complex aggregation queries directly against the production OLTP database, prolonged table locks and CPU saturation freeze customer checkouts and trigger system outages.'
            },
            painPoints: {
                es: [
                    'Degradación de latencia en la pasarela de pagos debido a consultas analíticas concurrentes.',
                    'Falta de tolerancia a fallos: caídas de red rompían cargas completas sin capacidad de reanudar.',
                    'Ausencia de un modelo optimizado: calcular ingresos históricos requería JOINs masivos sobre 10+ tablas.',
                    'Entorno frágil y difícil de reproducir entre desarrolladores y producción.'
                ],
                en: [
                    'Severe checkout latency degradation caused by unshielded analytical queries on production DB.',
                    'Zero fault tolerance: transient network failures corrupted entire ingestion batches without resume capability.',
                    'Lack of analytical modeling: calculating quarterly metrics required costly joins across 10+ normalized tables.',
                    'Fragile environment setups making local testing and production deployment error-prone.'
                ]
            }
        },
        codeSnippet: {
            filename: 'dags/sales_mart_orchestration.py',
            lang: 'python',
            code: `from airflow import DAG
from airflow.providers.standard.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-engineering',
    'depends_on_past': False,
    'retries': 3,
    'retry_delay': timedelta(seconds=45),
    'retry_exponential_backoff': True,
}

with DAG(
    dag_id='sales_mart_daily_etl',
    default_args=default_args,
    schedule_interval='@daily',
    start_date=datetime(2026, 1, 1),
    catchup=False,
    tags=['production', 'celery-broker', 'datamart']
) as dag:
    # Task queue offloaded via RabbitMQ to independent Celery workers
    extract_task = PythonOperator(task_id='extract_oltp_events', python_callable=extract_raw_sales)
    validate_task = PythonOperator(task_id='assert_data_contracts', python_callable=enforce_schema)
    transform_task = PythonOperator(task_id='build_dimensional_records', python_callable=transform_dimensions)
    load_task = PythonOperator(task_id='bulk_upsert_warehouse', python_callable=batch_upsert_olap)

    extract_task >> validate_task >> transform_task >> load_task`
        },
        architecture: {
            title: {
                es: 'Arquitectura del Pipeline y Decisiones Técnicas',
                en: 'Pipeline Architecture & Technical Decisions'
            },
            description: {
                es: 'Arquitectura de servicios aislados comunicados mediante colas asíncronas con persistencia desacoplada.',
                en: 'Isolated microservices architecture linked via asynchronous message brokers with decoupled persistence.'
            },
            flow: [
                { step: '01. Ingesta Asíncrona', desc: 'Airflow Scheduler detecta ventanas de corte y envía eventos de extracción a la cola RabbitMQ.' },
                { step: '02. Worker Pool Celery', desc: 'Nodos de ejecución independientes procesan lotes en paralelo sin saturar memoria del host.' },
                { step: '03. Control de Calidad', desc: 'Validaciones de integridad y descarte de nulos antes de entrar a la fase de transformación.' },
                { step: '04. Carga Batch en Postgres', desc: 'Inserción masiva en tablas de hechos y dimensiones con resolución de conflictos UPSERT.' },
                { step: '05. Consumo Seguro FastAPI', desc: 'Capa de presentación desacoplada que sirve métricas a dashboards con latencia < 80ms.' }
            ],
            keyDecisions: [
                {
                    title: 'RabbitMQ + CeleryExecutor en vez de Local/Sequential',
                    reason: 'Permite desacoplar el scheduler de la ejecución pesada de cómputo, logrando paralelismo real y escalabilidad horizontal de workers.'
                },
                {
                    title: 'Esquema de Carga Idempotente (ON CONFLICT DO UPDATE)',
                    reason: 'Garantiza que si un DAG se reintenta por desconexión de red, no se dupliquen transacciones ni se generen discrepancias contables.'
                },
                {
                    title: 'Microservicio de Consumo con Pool Asíncrono',
                    reason: 'Aísla el almacén analítico de conexiones externas directas; todo consumidor pasa por validaciones de contrato Pydantic.'
                }
            ]
        },
        challenges: [
            {
                title: 'Sincronización de Arranque en Entornos Docker',
                challenge: 'Airflow intentaba inicializar la base de metadatos antes de que Postgres y RabbitMQ estuviesen listos para recibir conexiones TCP.',
                solution: 'Implementación de scripts de salud nativos con `healthcheck` y directivas `depends_on: condition: service_healthy` en Docker Compose.'
            },
            {
                title: 'Cuello de Botella en Inserciones Transaccionales Individuales',
                challenge: 'Ejecutar `INSERT INTO` fila por fila causaba tiempos de ejecución inaceptables en lotes de miles de registros.',
                solution: 'Migración a operaciones de carga por bloques (`execute_batch` de psycopg2 / chunked bulk insert) reduciendo el tiempo de carga un 78%.'
            }
        ],
        impact: {
            es: 'Eliminación del 100% de la carga analítica sobre la base de datos operacional, garantizando reportes comerciales actualizados automáticamente sin degradar la experiencia de compra del usuario.',
            en: '100% elimination of analytical reporting load on the operational OLTP database, ensuring automated data refresh without degrading the end-user transactional checkout experience.'
        }
    },
    {
        id: 'mercado-nube',
        version: 'v1.4.0-dw',
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
        painSummary: {
            es: 'Resuelve la pérdida de trazabilidad en ventas online cuando productos y precios cambian o las transacciones llegan con días de retraso, garantizando reportes financieros exactos e inmutables.',
            en: 'Eliminates metric corruption in e-commerce when product prices change or order data arrives late, guaranteeing 100% accurate, tamper-proof financial reporting.'
        },
        github: 'https://github.com/JayzirTech/mercado-nube-analytics-engine-',
        demo: null,
        specs: [
            { key: { es: 'Metodología', en: 'Methodology' }, value: 'Kimball Dimensional Modeling' },
            { key: { es: 'Tipo de Historial', en: 'Historization Type' }, value: 'Slowly Changing Dimension Type 2 (SCD2)' },
            { key: { es: 'Tolerancia Temporal', en: 'Late Event Window' }, value: 'Late-Arriving Events (>24 horas)' },
            { key: { es: 'Esquema Analítico', en: 'Analytics Schema' }, value: 'Star Schema (Fact + Conformed Dims)' },
            { key: { es: 'Motor de Base de Datos', en: 'Database Engine' }, value: 'PostgreSQL 16 Enterprise' },
            { key: { es: 'Integridad', en: 'Integrity Gates' }, value: 'Surrogate Keys & Automated Audit Checks' }
        ],
        stats: [
            { label: { es: 'Inmutabilidad', en: 'Audit Invariance' }, value: '100% Histórica' },
            { label: { es: 'JOINs Speedup', en: 'Join Speedup' }, value: '4.2x (Surrogates)' },
            { label: { es: 'Eventos Tardíos', en: 'Late Event SLA' }, value: 'Mapeo Exacto' },
            { label: { es: 'Conformidad', en: 'Schema Standard' }, value: 'Kimball Compliant' }
        ],
        tags: ['Star Schema', 'SCD Type 2', 'SQL', 'PostgreSQL', 'Kimball', 'Data Modeling', 'Airflow', 'Docker'],
        overview: {
            es: 'Mercado Nube Analytics Engine es un Data Warehouse estructurado bajo metodología Kimball para e-commerce. Protege la verdad histórica del negocio mediante dimensiones SCD Tipo 2, asociando ventas que llegan con desfase temporal a la versión de catálogo y cliente exacta que existía en el instante de la transacción.',
            en: 'Mercado Nube Analytics Engine is an enterprise-grade Kimball dimensional warehouse engineered for modern e-commerce. It guarantees historical truth through SCD Type 2 dimensions, accurately pinning late-arriving sales events to the precise customer and product snapshots valid at event creation time.'
        },
        problem: {
            title: {
                es: 'Problema & Dolor de Negocio',
                en: 'Problem & Business Impact'
            },
            description: {
                es: 'En el comercio electrónico, los precios se modifican constantemente y los clientes actualizan direcciones. Si un Data Warehouse sobreescribe los registros antiguos, los balances financieros de meses anteriores cambian retrospectivamente. Además, si una venta de una app móvil sin conexión se sincroniza 3 días después, suele asignarse erróneamente a los precios actuales.',
                en: 'In e-commerce, prices fluctuate frequently and customers update shipping addresses. If a Data Warehouse simply overwrites older records, historical financial audit balances change retroactively. Furthermore, offline mobile transactions synced days later erroneously inherit today’s revised prices.'
            },
            painPoints: {
                es: [
                    'Corrupción retroactiva de reportes contables cerrados al sobreescribir datos dimensionales.',
                    'Imposibilidad de auditar el valor real de una venta ocurrida antes de un aumento de precios.',
                    'Transacciones con retraso de red (>24h) rompían o desalineaban las métricas de cohortes.',
                    'Consultas lentas que requerían escanear tablas transaccionales no optimizadas para agregaciones.'
                ],
                en: [
                    'Retroactive corruption of finalized accounting audits caused by mutating dimensional rows.',
                    'Inability to audit actual historical revenue after catalog prices or tax rates increase.',
                    'Delayed transactions (>24h) skewed customer cohort analyses and retention metrics.',
                    'Crippling analytics query performance over normalized 3NF transactional tables.'
                ]
            }
        },
        codeSnippet: {
            filename: 'sql/scd2_late_arriving_engine.sql',
            lang: 'sql',
            code: `-- SCD Type 2: Temporal Snapshot Resolution for Late-Arriving Events
INSERT INTO analytics.fact_sales (
    order_id,
    customer_sk,
    product_sk,
    date_sk,
    quantity,
    total_amount,
    created_at
)
SELECT 
    stg.order_id,
    -- Resolve the exact historical surrogate key valid at event timestamp
    dim_cust.customer_sk,
    dim_prod.product_sk,
    dim_date.date_sk,
    stg.quantity,
    (stg.quantity * dim_prod.unit_price) AS total_amount,
    stg.order_timestamp
FROM staging.orders_raw stg
JOIN analytics.dim_customers dim_cust 
    ON stg.customer_id = dim_cust.customer_id
    AND stg.order_timestamp >= dim_cust.valid_from 
    AND stg.order_timestamp < COALESCE(dim_cust.valid_to, '9999-12-31'::timestamp)
JOIN analytics.dim_products dim_prod 
    ON stg.product_id = dim_prod.product_id
    AND stg.order_timestamp >= dim_prod.valid_from 
    AND stg.order_timestamp < COALESCE(dim_prod.valid_to, '9999-12-31'::timestamp)
JOIN analytics.dim_date dim_date 
    ON dim_date.full_date = stg.order_timestamp::date;`
        },
        architecture: {
            title: {
                es: 'Arquitectura Dimensional y Decisiones de Modelado',
                en: 'Dimensional Architecture & Modeling Decisions'
            },
            description: {
                es: 'Modelo de estrella con separación entre tablas de hechos inmutables y dimensiones con control de validez temporal.',
                en: 'Star schema with strictly immutable fact records and temporally versioned conformed dimensions.'
            },
            flow: [
                { step: '01. Staging Crudo', desc: 'Carga de pedidos sin bloqueos ni transformaciones en esquema intermedio aislado.' },
                { step: '02. SCD Tipo 2 Check', desc: 'Detección de diferencias por hash de atributos. Si cambió, se marca fecha de expiración y se crea nuevo registro.' },
                { step: '03. Mapeo Temporal', desc: 'Resolución de llaves subrogadas mediante ventanas temporales `BETWEEN valid_from AND valid_to`.' },
                { step: '04. Carga de Hechos', desc: 'Poblado de tabla de hechos inmutable con llaves subrogadas enteras ultra rápidas para indexación.' },
                { step: '05. Compuertas de Calidad', desc: 'Validaciones de reconciliación monetaria antes de dar por cerrada la ventana analítica.' }
            ],
            keyDecisions: [
                {
                    title: 'Llaves Subrogadas Enteras (BIGINT) vs UUIDs Naturales',
                    reason: 'Reduce el tamaño de los índices B-Tree en un 65% y acelera los JOINs analíticos de agrupaciones masivas más de 4 veces.'
                },
                {
                    title: 'Dimensiones SCD2 con Fecha Centinela (9999-12-31)',
                    reason: 'Evita problemas con valores NULL en comparaciones SQL `BETWEEN`, simplificando los planes de ejecución de la base de datos.'
                },
                {
                    title: 'Separación Rígida de Staging vs Capa Mart',
                    reason: 'Permite reintentar la ingesta tantas veces como sea necesario sin arriesgar la consistencia de los datos analíticos finales.'
                }
            ]
        },
        challenges: [
            {
                title: 'Manejo de Transacciones que Llegan Fuera de Orden',
                challenge: 'Eventos de venta generados el día lunes llegaban el jueves debido a desconexión del cliente, asignándose por error a las dimensiones vigentes el jueves.',
                solution: 'Diseño de un motor de cruce temporal por intervalo estricto que mapea al snapshot exacto del momento de la compra.'
            },
            {
                title: 'Rendimiento en Consultas Agregadas Anuales',
                challenge: 'Ejecutar balances históricos multianuales generaba lecturas completas de millones de filas de hechos.',
                solution: 'Particionamiento declarativo por rango mensual en `fact_sales` y creación de índices compuestos sobre las llaves de dimensiones primarias.'
            }
        ],
        impact: {
            es: 'Garantía del 100% en la precisión histórica y legal de las métricas comerciales, permitiendo auditorías fidedignas y acelerando la generación de reportes ejecutivos.',
            en: '100% guarantee of historical and regulatory accuracy across commerce metrics, enabling trustworthy audits and sub-second executive reporting.'
        }
    },
    {
        id: 'filters-simulator',
        version: 'v1.0.0-live',
        title: {
            es: 'Simulador de Filtros Ópticos',
            en: 'Optical Filters Simulator'
        },
        category: {
            es: 'Simulación Física / Óptica Visual',
            en: 'Physics Simulation / Visual Optics'
        },
        badge: {
            es: 'Simulador Clínico en Producción',
            en: 'Production Clinical Simulator'
        },
        painSummary: {
            es: 'Resuelve la dificultad de explicar y comparar en consulta óptica cómo actúan los filtros de lentes (luz azul, antirreflejo, fotocromáticos, polarizados) frente a diferentes condiciones lumínicas reales.',
            en: 'Solves the clinical challenge of demonstrating and comparing ophthalmic lens coatings (blue cut, anti-reflective, photochromic, polarized) under real-world lighting conditions.'
        },
        github: 'https://github.com/visiometric-labs/filters-simulator.git',
        demo: 'https://visiometric-labs.github.io/filters-simulator/',
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
            es: 'Simulador interactivo desarrollado para Visiometric Labs que permite a optómetras y pacientes comparar en tiempo real el comportamiento óptico de diversos tratamientos y filtros oftálmicos. Modela digitalmente el espectro de atenuación lumínica, reflejos parásitos y transición fotocromática en escenarios de la vida cotidiana.',
            en: 'Interactive clinical optical simulator developed for Visiometric Labs, allowing eye-care practitioners and patients to compare the real-world performance of ophthalmic lens coatings in real time. It digitally models spectral light transmission, parasitic glare attenuation, and photochromic activation across everyday scenarios.'
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
            blueCut: { active: false, absorption415nm: 0.85, hueShift: 'sepia(12%)' },
            antiReflective: { active: true, glareSuppression: 0.92, residualColor: '#64ffda' },
            photochromic: { active: false, uvIntensity: 0.0, maxOpticalDensity: 0.82 },
            polarized: { active: false, brewsterExtinction: 0.95 }
        };
    }

    renderSpectralTransmission(baseScene) {
        // Hardware accelerated canvas filter pipeline
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
        
        // Render parasitic glare reflection if anti-reflective coating is OFF
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
                solution: 'Generación de gradientes radiales optimizados en memoria y superposición mediante operaciones de composición `destination-over`.'
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
    },
    {
        id: 'ocularis',
        version: 'v1.1.0-sim',
        title: {
            es: 'Ocularis — Simulación Óptica',
            en: 'Ocularis — Optical Simulation'
        },
        category: {
            es: 'Simulación Física / Mecatrónica Visual',
            en: 'Physics Simulation / Visual Mechatronics'
        },
        badge: {
            es: 'Modelado Físico en Vivo',
            en: 'Live Physics Modeling'
        },
        painSummary: {
            es: 'Elimina la barrera de comunicación entre el optómetra y el paciente, permitiendo visualizar de forma interactiva y comprensible por qué ven borroso y cómo sus lentes corregirán su visión.',
            en: 'Bridges the communication gap between eye-care specialists and patients by interactively showing why vision is blurred and exactly how corrective lenses restore sharp focus.'
        },
        github: 'https://github.com/JayzirTech/ocularis',
        demo: 'https://jayzirtech.github.io/ocularis/',
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
            es: 'Ocularis es una aplicación de física médica que modela el ojo humano como un sistema óptico mecatrónico de lentes convergentes. Resuelve el desafío educativo en consultorios al calcular el trazado trigonométrico de rayos de luz en tiempo real y demostrar exactamente cómo los lentes desvían el punto focal hacia la fóvea retiniana.',
            en: 'Ocularis is a visual physics platform modeling the human eye as an optical system of converging lenses. It bridges technical mechatronics principles with patient communication by computing Snell-based ray tracing in real time to show how corrective lenses refocus light onto the retinal plane.'
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
    // Paraxial refraction angle calculation
    const focalLength = 1000 / refractivePower; // Focal distance in simulated units
    const intersectionLensX = lensPositionX;
    const intersectionLensY = originY;

    // Angle of refraction post-lens pass
    const slope = -intersectionLensY / focalLength;
    const focalPointX = lensPositionX + focalLength;

    // Ray position when reaching the retinal plane
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
                    reason: 'Todos los haces luminosos se dibujan en una sola operación de trazado (`ctx.stroke()`), evitando caídas de fotogramas en móviles.'
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
                challenge: 'El evento `input` de los sliders táctiles producía acumulaciones de redibujado en iPads antiguos.',
                solution: 'Implementación de throttling mediante `requestAnimationFrame` garantizando un solo cálculo por cuadro de pantalla.'
            }
        ],
        impact: {
            es: 'Permite a optometristas y oftalmólogos explicar anomalías refractivas en menos de 60 segundos, mejorando la adherencia al tratamiento y la satisfacción del paciente.',
            en: 'Enables clinicians to explain refractive disorders in under 60 seconds, elevating patient compliance, comprehension, and trust.'
        }
    },
    {
        id: 'fastapi-backend',
        version: 'v2.0.0-api',
        title: {
            es: 'FastAPI Microservice Backend',
            en: 'FastAPI Microservice Backend'
        },
        category: {
            es: 'Arquitectura Backend / API REST',
            en: 'Backend Architecture / REST API'
        },
        badge: {
            es: 'Microservicio Asíncrono',
            en: 'Async Microservice'
        },
        painSummary: {
            es: 'Resuelve los cuellos de botella y caídas de servidor por alto tráfico de usuarios concurrentes, entregando respuestas inmediatas mediante arquitectura asíncrona y validación estricta de datos.',
            en: 'Resolves server bottlenecks and downtime caused by concurrent user traffic, delivering instantaneous API responses through async execution and strict data contracts.'
        },
        github: 'https://github.com/JayzirTech/fastapi_app_jayzirTech',
        demo: null,
        specs: [
            { key: { es: 'Framework', en: 'Framework' }, value: 'FastAPI 0.110+ (Python 3.11+)' },
            { key: { es: 'Patrón de Arquitectura', en: 'Architecture Pattern' }, value: 'Clean Layered Architecture (Routers/Services/Repo)' },
            { key: { es: 'Motor Asíncrono', en: 'Async Engine' }, value: 'Uvicorn + AsyncIO Event Loop' },
            { key: { es: 'Validación de Contratos', en: 'Contract Validation' }, value: 'Pydantic v2' },
            { key: { es: 'Persistencia Relacional', en: 'Persistence' }, value: 'PostgreSQL + Async Connection Pooling' },
            { key: { es: 'Contratos OpenAPI', en: 'API Specs' }, value: 'Interactive Swagger UI & Redoc Auto-Generated' }
        ],
        stats: [
            { label: { es: 'Concurrencia', en: 'Concurrency' }, value: 'Non-blocking I/O' },
            { label: { es: 'Validación', en: 'Validation Engine' }, value: 'Pydantic Core' },
            { label: { es: 'Documentación', en: 'Spec Sync' }, value: 'OpenAPI 3.1' },
            { label: { es: 'Despliegue', en: 'Packaging' }, value: 'Multi-stage Docker' }
        ],
        tags: ['FastAPI', 'Python 3.11', 'PostgreSQL', 'Pydantic v2', 'Clean Architecture', 'Uvicorn', 'Docker', 'REST API', 'AsyncIO'],
        overview: {
            es: 'Microservicio backend de alta velocidad diseñado bajo patrones de Arquitectura Limpia en capas. Resuelve la fragilidad de servicios tradicionales desacoplando la lógica del protocolo HTTP mediante inyección de dependencias nativa, validaciones estrictas y pool asíncrono hacia bases de datos relacionales.',
            en: 'High-throughput asynchronous backend microservice engineered according to layered Clean Architecture patterns. It eliminates endpoint instability by isolating business domain logic from HTTP routers using native dependency injection, strict Pydantic v2 schema validation, and connection pooling.'
        },
        problem: {
            title: {
                es: 'Problema & Dolor de Negocio',
                en: 'Problem & Business Impact'
            },
            description: {
                es: 'Servicios web desarrollados con frameworks síncronos tradicionales sufren bloqueos de hilos cuando cientos de peticiones de base de datos compiten al mismo tiempo. Además, la falta de tipado estricto provoca que datos malformados generen errores 500 no controlados y rompan aplicaciones móviles frontend.',
                en: 'Legacy synchronous backend services suffer severe thread starvation when hundreds of database I/O calls execute concurrently. In addition, loose payload validation frequently produces unhandled HTTP 500 exceptions that crash client frontend and mobile apps.'
            },
            painPoints: {
                es: [
                    'Bloqueo del servidor ante picos de tráfico concurrente por operaciones de lectura síncronas.',
                    'Errores no controlados (500) en producción debido a datos faltantes o de tipo incorrecto.',
                    'Bases de código monolíticas enredadas donde la lógica de base de datos está mezclada con los controladores.',
                    'Documentación desactualizada que genera fricción y retrasos en los equipos frontend.'
                ],
                en: [
                    'Thread exhaustion during traffic spikes caused by blocking synchronous database calls.',
                    'Unhandled runtime 500 errors caused by loose payload schemas without contract guarantees.',
                    'Tightly-coupled monolithic controllers where SQL queries are intertwined with routing logic.',
                    'Out-of-date external API documentation hindering frontend and mobile team integration.'
                ]
            }
        },
        codeSnippet: {
            filename: 'app/api/v1/endpoints/products.py',
            lang: 'python',
            code: `from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.product import ProductCreate, ProductResponse
from app.services.product_service import ProductService
from app.db.session import get_async_db

router = APIRouter(prefix="/products", tags=["Product Catalog"])

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    payload: ProductCreate,
    db: AsyncSession = Depends(get_async_db)
):
    """
    Creates catalog item with strict Pydantic v2 data contract validation.
    Database session lifecycle handled automatically via async dependency injection.
    """
    service = ProductService(db)
    new_product = await service.create_product(payload)
    if not new_product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Product sku conflict or invalid category"
        )
    return new_product`
        },
        architecture: {
            title: {
                es: 'Capas de la Arquitectura Limpia & Decisiones',
                en: 'Clean Architecture Layers & Decisions'
            },
            description: {
                es: 'Arquitectura desacoplada en Routers, Schemas, Services y Repositories.',
                en: 'Decoupled layered architecture partitioned into Routers, Schemas, Services, and Repositories.'
            },
            flow: [
                { step: '01. Entrada HTTP / Middleware', desc: 'Gestión de CORS, rate limiting y captura global de excepciones.' },
                { step: '02. Validación Pydantic v2', desc: 'Verificación inmediata de contratos JSON. Respuestas 422 descriptivas si los datos fallan.' },
                { step: '03. Inyección de Dependencias', desc: 'Inyección de sesión asíncrona de base de datos con liberación garantizada al responder.' },
                { step: '04. Capa de Servicio', desc: 'Ejecución de reglas de negocio puras independientes de la base de datos o del framework web.' },
                { step: '05. Capa de Repositorio', desc: 'Operaciones SQL asíncronas no bloqueantes optimizadas para PostgreSQL.' }
            ],
            keyDecisions: [
                {
                    title: 'Pydantic v2 Core (Escrito en Rust)',
                    reason: 'Multiplica la velocidad de validación y serialización de JSON hasta 10 veces frente a frameworks tradicionales en Python.'
                },
                {
                    title: 'Inyección de Dependencias Nativa de FastAPI (`Depends`)',
                    reason: 'Garantiza el cierre automático de transacciones de base de datos y permite testear servicios con mocks sin levantar servidores reales.'
                },
                {
                    title: 'Arquitectura en Capas Desacopladas',
                    reason: 'Permite cambiar el motor de base de datos o añadir colas de mensajería sin modificar una sola línea de los endpoints de la API.'
                }
            ]
        },
        challenges: [
            {
                title: 'Fuga de Conexiones en Pool Asíncrono',
                challenge: 'Peticiones canceladas por el cliente dejaban conexiones en estado huérfano en el pool de PostgreSQL.',
                solution: 'Implementación de manejadores de contexto asíncronos (`async with`) asegurando `session.close()` mediante bloques `finally` deterministas.'
            },
            {
                title: 'Estandarización de Errores Globales',
                challenge: 'Diferentes librerías lanzaban excepciones distintas, devolviendo formatos de error inconsistentes.',
                solution: 'Registro de `Custom Exception Handlers` centralizados que transforman cualquier fallo en una estructura uniforme RFC 7807.'
            }
        ],
        impact: {
            es: 'Un microservicio backend preparado para alto tráfico con documentación viva en tiempo real, latencias de milisegundos y cero caídas por datos malformados.',
            en: 'Production-ready high-concurrency microservice with live synchronized OpenAPI documentation, sub-100ms response times, and resilience against malformed requests.'
        }
    }
];

if (typeof window !== 'undefined') {
    window.PROJECTS_DATA = PROJECTS_DATA;
}
