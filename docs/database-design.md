# Diseño de base de datos

PostgreSQL 17 + Sequelize 6. La fase 1 dejó lista la conexión y Sequelize CLI. La fase 2 comenzó con la migración de usuarios (`api/migrations/20261127000000-create-users.cjs`); las demás entidades aún están pendientes.

## Entidades

### 1. Usuario (`users`) — primera migración de fase 2
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | STRING(120) | obligatorio |
| email | STRING(255) | obligatorio, único sin distinguir mayúsculas |
| password_hash | STRING(255) | obligatorio, bcrypt |
| role | ENUM(`instructor`, `student`) | obligatorio; por defecto `student` |
| created_at / updated_at | DATE | |

### 2. Curso (`courses`)
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| instructor_id | FK → users | rol instructor |
| title | STRING | |
| description | TEXT | |
| is_published | BOOLEAN | |

### 3. Lección (`lessons`)
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| course_id | FK → courses | |
| title | STRING | |
| content | TEXT | |
| position | INTEGER | orden dentro del curso |

### 4. Pregunta (`questions`)
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| lesson_id | FK → lessons | cuestionario de la lección |
| statement | TEXT | |
| options | JSONB | lista de opciones |
| correct_option | INTEGER | índice de la opción correcta |

### 5. Inscripción (`enrollments`)
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| student_id | FK → users | |
| course_id | FK → courses | |
| enrolled_at | DATE | |
| | | único (`student_id`, `course_id`) |

### 6. Progreso (`progress`)
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| enrollment_id | FK → enrollments | |
| lesson_id | FK → lessons | |
| completed | BOOLEAN | |
| score | INTEGER | resultado del cuestionario |
| | | único (`enrollment_id`, `lesson_id`) |

## Relaciones

```
User(instructor) 1─N Course 1─N Lesson 1─N Question
User(student)    1─N Enrollment N─1 Course
Enrollment       1─N Progress   N─1 Lesson
```

Los campos exactos de las entidades pendientes se confirmarán contra el documento académico al implementar sus migraciones.

## Flujo de trabajo

```bash
cd api
npx sequelize-cli migration:generate --name create-users   # luego renombrar a .cjs
npm run db:migrate
```
