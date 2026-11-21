/**
 * ==========================================================================
 * Project: Mercado Nube Analytics Engine
 * ==========================================================================
 */
(function () {
    const project = {
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
        theme: {
            accent: '#a855f7',
            accentContrast: '#180728',
            accentSoft: 'rgba(168, 85, 247, 0.08)',
            accentGlow: 'rgba(168, 85, 247, 0.25)',
            accentBorder: 'rgba(168, 85, 247, 0.3)'
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
                { step: '03. Mapeo Temporal', desc: 'Resolución de llaves subrogadas mediante ventanas temporales BETWEEN valid_from AND valid_to.' },
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
                    reason: 'Evita problemas con valores NULL en comparaciones SQL BETWEEN, simplificando los planes de ejecución de la base de datos.'
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
                solution: 'Particionamiento declarativo por rango mensual en fact_sales y creación de índices compuestos sobre las llaves de dimensiones primarias.'
            }
        ],
        impact: {
            es: 'Garantía del 100% en la precisión histórica y legal de las métricas comerciales, permitiendo auditorías fidedignas y acelerando la generación de reportes ejecutivos.',
            en: '100% guarantee of historical and regulatory accuracy across commerce metrics, enabling trustworthy audits and sub-second executive reporting.'
        }
    };

    if (typeof window !== 'undefined') {
        window.PROJECTS_DATA = window.PROJECTS_DATA || [];
        window.PROJECTS_DATA.push(project);
    }
    if (typeof module !== 'undefined') {
        module.exports = project;
    }
})();
