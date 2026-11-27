# Guía de desarrollo

## Ramas

| Rama | Uso |
|---|---|
| `main` | Código estable / entregas |
| `develop` | Integración |
| `feature/<nombre>` | Nueva funcionalidad (desde `develop`) |
| `fix/<nombre>` | Corrección |
| `docs/<nombre>` | Documentación |

Flujo: `develop` → `feature/x` → Pull Request a `develop` → revisión → merge. `develop` se fusiona en `main` al cerrar cada fase.

## Commits (Conventional Commits)

```
feat: initialize backend architecture
fix: handle missing env vars
chore: configure docker environment
docs: add initial project documentation
refactor: | test: | style:
```

## Añadir un módulo en la API

1. `validators/x.validator.js` (Zod)
2. `models/x.model.js` + migración `.cjs`
3. `repositories/x.repository.js`
4. `services/x.service.js`
5. `controllers/x.controller.js`
6. `routes/x.routes.js` y montarlo en `routes/index.js`
7. Prueba en `tests/x.test.js`

## Reglas

- Nada de lógica de negocio en controladores.
- Ningún secreto en el código: todo por variables de entorno (`.env` está en `.gitignore`).
- Toda variable de entorno se lee desde `config/environment.js`.
- `npm test` (API) y `npm run build` (web) deben pasar antes de abrir un PR.
