# Estructura de la API

Base: `/api`. Todas las respuestas siguen el formato:

```json
{ "success": true, "message": "...", "data": {} }
{ "success": false, "message": "..." }
```

## Implementado (fase 1)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servicio |

```json
{ "success": true, "message": "MiniAula API funcionando correctamente" }
```

Cualquier otra ruta devuelve `404` con `success: false`.

## Previsto (fases siguientes)

| Módulo | Prefijo | Rol |
|---|---|---|
| Autenticación | `/api/auth` (register, login, me) | público / autenticado |
| Cursos | `/api/courses` | lectura: todos; escritura: instructor dueño |
| Lecciones | `/api/courses/:courseId/lessons` | instructor dueño / estudiante inscrito |
| Preguntas | `/api/lessons/:lessonId/questions` | instructor dueño / estudiante inscrito |
| Inscripciones | `/api/enrollments` | estudiante |
| Progreso | `/api/progress` | estudiante (propio) / instructor (sus cursos) |

Cada módulo añade: `routes/x.routes.js`, `controllers/x.controller.js`, `services/x.service.js`, `repositories/x.repository.js`, `validators/x.validator.js`.
