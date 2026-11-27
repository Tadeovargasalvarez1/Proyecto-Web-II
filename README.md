# MiniAula

Plataforma web de cursos cortos (Mini LMS) — Proyecto final de **Ingeniería Web 2**.

## Descripción

MiniAula conecta dos tipos de usuarios:

- **Instructor**: administra cursos, lecciones y cuestionarios, y consulta el progreso de sus estudiantes.
- **Estudiante**: explora cursos, se inscribe, consume lecciones, responde cuestionarios y consulta su progreso.

## Objetivos

- Aplicación cliente-servidor con API REST y SPA.
- Arquitectura por capas, modular y mantenible.
- Autenticación con JWT y autorización por rol.
- Despliegue reproducible con Docker Compose.

## Stack tecnológico

| Capa | Tecnologías |
|---|---|
| Backend | Node.js 22+, Express 5, ES Modules, Sequelize 6, PostgreSQL 17, JWT, bcrypt, Zod, Helmet, CORS, Express Rate Limit, Morgan |
| Frontend | React 19, Vite 8, React Router 7, Tailwind CSS 3, Context API, Axios, React Hook Form |
| Infraestructura | Docker, Docker Compose, Nginx, Git/GitHub |

## Arquitectura general

```
Navegador ─► web (Nginx) ─/api─► api (Express) ─► db (PostgreSQL)
API: Routes → Controllers → Services → Repositories → Models → PostgreSQL
```

Detalle en [docs/architecture.md](docs/architecture.md).

## Estructura de directorios

```
.
├── api/                 Backend (Express)
│   ├── src/
│   │   ├── config/      environment.js, database.js, cors.js, sequelize-cli.cjs
│   │   ├── routes/      index.js (GET /api/health)
│   │   ├── controllers/ services/ repositories/ models/
│   │   ├── middlewares/ validators/ utils/ docs/
│   │   ├── app.js       App Express (sin listen)
│   │   └── server.js    Conexión a BD + arranque
│   ├── migrations/ seeders/ tests/
│   ├── .sequelizerc  Dockerfile  .env.example
├── web/                 Frontend (React + Vite)
│   ├── src/ components/{common,layout,ui} pages/{auth,student,instructor,errors}
│   │        routes/ services/ contexts/ hooks/ layouts/ utils/ assets/
│   ├── Dockerfile (multi-etapa)  nginx.conf  .env.example
│   └── vite.config.js  tailwind.config.js  postcss.config.js
├── docs/                architecture, database-design, api-structure, development-guide
├── docker-compose.yml   db + api + web
└── .env.example         variables para Docker Compose
```

## Requisitos previos

- Node.js ≥ 22 y npm
- Docker Desktop (con Docker Compose v2)
- Git

## Variables de entorno

| Archivo | Uso |
|---|---|
| `.env.example` (raíz) | Docker Compose: credenciales de PostgreSQL, JWT, puertos |
| `api/.env.example` | Ejecutar la API en local |
| `web/.env.example` | `VITE_API_URL` (por defecto `/api`) |

Copia cada `.env.example` a `.env` y **cambia `DB_PASSWORD` y `JWT_SECRET`**. Los `.env` nunca se suben al repositorio.

## Ejecución con Docker

```bash
cp .env.example .env        # editar DB_PASSWORD y JWT_SECRET
docker compose up --build
```

- Frontend: http://localhost:8080
- API: http://localhost:3000/api/health (también vía http://localhost:8080/api/health)

Si el puerto 3000 u 8080 está ocupado, cambia `API_PORT` / `WEB_PORT` en `.env`.

Detener: `docker compose down` (añade `-v` para borrar los datos de PostgreSQL).

## Desarrollo local (sin Docker para el código)

```bash
# Base de datos sola
docker compose up -d db

# API
cd api
cp .env.example .env        # mismas credenciales que el .env raíz
npm install
npm run dev                 # http://localhost:3000/api/health

# Frontend (otra terminal)
cd web
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173 (proxy /api → :3000)
```

| Comando | Dónde | Qué hace |
|---|---|---|
| `npm run dev` | api / web | Modo desarrollo con recarga |
| `npm start` | api | Arranque normal |
| `npm test` | api | Pruebas (`node:test`) |
| `npm run db:migrate` | api | Ejecutar migraciones |
| `npm run build` | web | Compilar a `dist/` |

## Organización de Git

Ramas `main` (estable), `develop` (integración), `feature/*`, `fix/*`, `docs/*`. Commits con Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`). Ver [docs/development-guide.md](docs/development-guide.md).

## Estado actual

**Fase 1 (20 %) — Arquitectura e infraestructura: completada.**

- Estructura del monorepo, capas del backend y del frontend.
- `GET /api/health` funcionando con prueba automatizada.
- Conexión a PostgreSQL y Sequelize CLI configurados.
- Pantalla de bienvenida responsive con indicador de conexión a la API.
- Docker Compose con PostgreSQL (healthcheck + volumen), API y Nginx.

## Funcionalidades pendientes

- Fase 2: modelos y migraciones de las 6 entidades, registro/login con JWT y bcrypt, middlewares de autenticación, roles y validación Zod.
- CRUD de cursos, lecciones y preguntas (instructor).
- Catálogo, inscripciones y consumo de lecciones (estudiante).
- Cuestionarios, calificación y seguimiento del progreso.
- Panel de estadísticas del instructor.
- Datos de prueba (seeders).
