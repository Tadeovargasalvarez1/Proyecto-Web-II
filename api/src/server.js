// Punto de entrada: conecta con PostgreSQL y luego inicia el servidor HTTP.
import app from './app.js';
import { env } from './config/environment.js';
import { connectDatabase } from './config/database.js';

try {
  await connectDatabase();
  console.log('Conexión a PostgreSQL establecida');
} catch (error) {
  console.error('No se pudo conectar a PostgreSQL:', error.message);
  process.exit(1);
}

app.listen(env.port, () => {
  console.log(`MiniAula API escuchando en el puerto ${env.port}`);
});
