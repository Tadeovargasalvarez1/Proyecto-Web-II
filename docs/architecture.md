# Arquitectura

## Vista general

```
Navegador ──► web (Nginx :80) ──/api/*──► api (Express :3000) ──► db (PostgreSQL :5432)
                 └─ sirve React compilado        red interna "backend" de Docker
```

- **Monorepo**: `api/` (backend) y `web/` (frontend) son aplicaciones independientes, cada una con su `package.json`, `Dockerfile` y `.env.example`.
- **Mismo origen**: en Docker, Nginx sirve el frontend y redirige `/api/*` a la API. En desarrollo, el proxy de Vite hace lo mismo. Por eso el frontend siempre llama a `/api` y CORS solo es necesario si se accede a la API directamente.

## Backend por capas

```
Routes → Controllers → Services → Repositories → Models (Sequelize) → PostgreSQL
```

| Capa | Responsabilidad | Regla |
|---|---|---|
| Routes | Declarar endpoints y aplicar middlewares | Sin lógica |
| Controllers | Leer `req`, llamar al servicio, responder | Sin lógica de negocio |
| Services | Reglas de negocio | No conocen Express |
| Repositories | Consultas Sequelize | Único sitio que toca los modelos |
| Models | Entidades y asociaciones | — |
| Middlewares | Errores, JWT, roles, validación Zod | — |
| Config | Entorno, BD, CORS | Toda variable de entorno pasa por `environment.js` |

`app.js` construye la app (sin `listen`) para poder probarla; `server.js` conecta a la BD y arranca.

### Seguridad transversal
- **Helmet**: cabeceras HTTP seguras.
- **CORS**: lista blanca desde `CORS_ORIGIN`.
- **express-rate-limit**: 300 peticiones / 15 min por IP (se endurecerá en `/auth` en la fase 2).
- **Morgan**: `dev` en desarrollo, `combined` en producción.
- **Errores**: `errorHandler` centralizado; los 5xx no exponen detalles fuera de desarrollo.
- `express.json` limitado a 1 MB.

## Frontend

React 19 + Vite + Tailwind CSS 3 + React Router 7.

- `App.jsx` → `BrowserRouter` → `AuthProvider` (Context API) → `AppRoutes`.
- `layouts/` definen la estructura (navbar/footer + `<Outlet />`).
- `services/api.js` es el único cliente Axios; los servicios de cada módulo lo reutilizan.
- Ver `web/src/README.md` para el detalle de carpetas.

## Decisiones técnicas

| Decisión | Motivo |
|---|---|
| ES Modules en la API | Requisito del stack; los archivos de Sequelize CLI usan `.cjs` porque la CLI no carga ESM |
| `node --env-file` en lugar de `dotenv` | Nativo en Node ≥ 22, evita una dependencia |
| `node:test` para pruebas | Nativo, sin dependencias extra |
| Tailwind 3 | El documento exige `tailwind.config.js` y `postcss.config.js` (Tailwind 4 ya no los usa) |
| Vite 8 | `@vitejs/plugin-react` actual lo requiere |
| Nginx como proxy de `/api` | Mismo origen: sin problemas de CORS ni URLs absolutas en el bundle |
