# Diseño de base de datos (previsto para la fase 2)

PostgreSQL 17 + Sequelize 6. En la fase 1 solo existe la conexión y la configuración de Sequelize CLI; **ninguna tabla está creada todavía**.

## Entidades

### 1. Usuario (`users`)
| Campo | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | STRING | |
| email | STRING | único |
| password_hash | STRING | bcrypt |
| role | ENUM(`instructor`, `student`) | |
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

Los campos exactos se confirmarán contra el documento académico al implementar las migraciones.

## Flujo de trabajo

```bash
cd api
npx sequelize-cli migration:generate --name create-users   # luego renombrar a .cjs
npm run db:migrate
```
