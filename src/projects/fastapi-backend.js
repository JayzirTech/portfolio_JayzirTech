/**
 * ==========================================================================
 * Project: FastAPI Microservice Backend
 * ==========================================================================
 */
(function () {
    const project = {
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
                    title: 'Inyección de Dependencias Nativa de FastAPI (Depends)',
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
                solution: 'Implementación de manejadores de contexto asíncronos (async with) asegurando session.close() mediante bloques finally deterministas.'
            },
            {
                title: 'Estandarización de Errores Globales',
                challenge: 'Diferentes librerías lanzaban excepciones distintas, devolviendo formatos de error inconsistentes.',
                solution: 'Registro de Custom Exception Handlers centralizados que transforman cualquier fallo en una estructura uniforme RFC 7807.'
            }
        ],
        impact: {
            es: 'Un microservicio backend preparado para alto tráfico con documentación viva en tiempo real, latencias de milisegundos y cero caídas por datos malformados.',
            en: 'Production-ready high-concurrency microservice with live synchronized OpenAPI documentation, sub-100ms response times, and resilience against malformed requests.'
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
