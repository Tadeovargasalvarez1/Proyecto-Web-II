// Acceso centralizado y validado a las variables de entorno. Nunca escribir secretos aquí.
const required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length && process.env.NODE_ENV !== 'test') {
  throw new Error(`Faltan variables de entorno obligatorias: ${missing.join(', ')}`);
}
if (process.env.NODE_ENV !== 'test' && process.env.JWT_SECRET && Buffer.byteLength(process.env.JWT_SECRET, 'utf8') < 32) {
  throw new Error('JWT_SECRET debe tener al menos 32 bytes');
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'test' ? 'test-only-secret-do-not-use-outside-tests' : undefined),
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
