# web/src — organización

| Carpeta | Contenido | Estado |
|---|---|---|
| `components/common` | Piezas compartidas con lógica ligera (`Logo`, `ApiStatus`) | Fase 1 |
| `components/layout` | `Navbar`, `Footer` | Fase 1 |
| `components/ui` | Primitivas visuales reutilizables (`Button`) | Fase 1 |
| `layouts/` | Plantillas de página con `<Outlet />` (`MainLayout`; luego paneles de estudiante/instructor) | Fase 1 |
| `pages/auth` | Login y registro (React Hook Form) | Fase 2 |
| `pages/student` | Catálogo, curso, lección, cuestionario, progreso | Fases 3+ |
| `pages/instructor` | Panel, editor de cursos/lecciones/preguntas, progreso de alumnos | Fases 3+ |
| `pages/errors` | `NotFoundPage` | Fase 1 |
| `routes/` | `AppRoutes`; luego rutas protegidas por rol | Fase 1 |
| `services/` | Cliente Axios (`api.js`) y servicios por módulo | Fase 1 |
| `contexts/` | `AuthContext` (Context API) | Esqueleto |
| `hooks/` | `useAuth` | Esqueleto |
| `utils/`, `assets/` | Helpers e imágenes | Vacías (`.gitkeep`) |
