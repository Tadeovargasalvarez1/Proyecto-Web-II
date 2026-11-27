// Instancia de Sequelize compartida por todos los modelos (se registran en src/models en la fase 2).
import { Sequelize } from 'sequelize';
import { env } from './environment.js';

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'postgres',
  logging: false,
});

export async function connectDatabase() {
  await sequelize.authenticate();
}
