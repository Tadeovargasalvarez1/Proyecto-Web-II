# api/src — capas

| Carpeta | Responsabilidad | Estado |
|---|---|---|
| `config/` | Entorno, base de datos, CORS, Sequelize CLI | Fase 1 |
| `routes/` | Definición y agrupación de endpoints | `GET /api/health` |
| `controllers/` | Recibir la petición HTTP y enviar la respuesta (sin lógica de negocio) | health |
| `services/` | Lógica de negocio | health |
| `repositories/` | Consultas a la base de datos vía Sequelize; los servicios nunca usan modelos directamente | Fase 2 |
| `models/` | Entidades Sequelize y asociaciones | Fase 2 |
| `middlewares/` | Errores (fase 1); JWT, roles y validación (fase 2) | Parcial |
| `validators/` | Esquemas Zod por módulo | Fase 2 |
| `utils/` | Utilidades compartidas (`AppError`) | Fase 1 |
| `docs/` | Ver `/docs/api-structure.md` | — |

Las carpetas vacías se conservan en git mediante `.gitkeep`.
