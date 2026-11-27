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

## Implementado (fase 2, inicio)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Crea una cuenta y devuelve el usuario público y un JWT |
| POST | `/api/auth/login` | Valida correo y contraseña y devuelve el usuario público y un JWT |
| GET | `/api/auth/me` | Devuelve el usuario de un JWT válido |

El registro público siempre asigna el rol `student`; el rol `instructor` no se puede elegir desde ese endpoint. La contraseña se guarda como hash bcrypt y nunca se incluye en las respuestas. `JWT_SECRET` debe configurarse con al menos 32 bytes antes de arrancar la API fuera de pruebas; los archivos `.env.example` indican cómo generar uno.

## Previsto (fases siguientes)

| Módulo | Prefijo | Rol |
|---|---|---|
| Cursos | `/api/courses` | lectura: todos; escritura: instructor dueño |
| Lecciones | `/api/courses/:courseId/lessons` | instructor dueño / estudiante inscrito |
| Preguntas | `/api/lessons/:lessonId/questions` | instructor dueño / estudiante inscrito |
| Inscripciones | `/api/enrollments` | estudiante |
| Progreso | `/api/progress` | estudiante (propio) / instructor (sus cursos) |

Cada módulo añade: `routes/x.routes.js`, `controllers/x.controller.js`, `services/x.service.js`, `repositories/x.repository.js`, `validators/x.validator.js`.
