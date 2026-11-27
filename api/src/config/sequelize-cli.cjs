// Configuración usada solo por sequelize-cli (migraciones/seeders). Lee las mismas variables que environment.js.
const base = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
};

module.exports = { development: base, test: base, production: base };
