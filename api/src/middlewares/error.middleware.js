// Manejo centralizado de 404 y errores. Lanzar un AppError (utils/app-error.js) desde cualquier capa.
import { env } from '../config/environment.js';

export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

// Express identifica el manejador de errores por sus 4 parámetros.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    success: false,
    message: status >= 500 ? 'Error interno del servidor' : err.message,
    ...(env.nodeEnv === 'development' && status >= 500 && { stack: err.stack }),
  });
}
