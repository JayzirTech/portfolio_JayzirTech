/**
 * ==========================================================================
 * Project: DataMart Analytical ETL Pipeline
 * ==========================================================================
 */
(function () {
    const project = {
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
        theme: {
            accent: '#38bdf8',
            accentContrast: '#07162c',
            accentSoft: 'rgba(56, 189, 248, 0.08)',
            accentGlow: 'rgba(56, 189, 248, 0.25)',
            accentBorder: 'rgba(56, 189, 248, 0.3)'
        },
        painSummary: {
            es: 'Evita el colapso de bases de datos operacionales cuando finanzas y analistas saturan el sistema con reportes pesados. Centraliza y procesa ventas automáticamente sin interrumpir la operación del negocio.',
            en: 'Prevents operational database crashes when finance and analytics teams run heavy reports on production systems. Automatically centralizes and transforms sales data without business disruption.'
        },
        github: 'https://github.com/JayzirTech/datamart-analytics-etl-pipeline',
        demo: null,
        videoEmbed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/M46kV_vK2ys?si=DIT9DdLT98SY3KmD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
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
                solution: 'Implementación de scripts de salud nativos con healthcheck y directivas depends_on: condition: service_healthy en Docker Compose.'
            },
            {
                title: 'Cuello de Botella en Inserciones Transaccionales Individuales',
                challenge: 'Ejecutar INSERT INTO fila por fila causaba tiempos de ejecución inaceptables en lotes de miles de registros.',
                solution: 'Migración a operaciones de carga por bloques (execute_batch de psycopg2 / chunked bulk insert) reduciendo el tiempo de carga un 78%.'
            }
        ],
        impact: {
            es: 'Eliminación del 100% de la carga analítica sobre la base de datos operacional, garantizando reportes comerciales actualizados automáticamente sin degradar la experiencia de compra del usuario.',
            en: '100% elimination of analytical reporting load on the operational OLTP database, ensuring automated data refresh without degrading the end-user transactional checkout experience.'
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
