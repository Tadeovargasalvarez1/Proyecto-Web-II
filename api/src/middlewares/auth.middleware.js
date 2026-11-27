import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import { AppError } from '../utils/app-error.js';

export function requireAuth(req, res, next) {
  const [scheme, token] = (req.get('authorization') || '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Se requiere autenticación', 401));
  }

  try {
    const payload = jwt.verify(token, env.jwt.secret);
    if (typeof payload !== 'object' || !payload.sub) {
      throw new Error('Token sin sujeto');
    }
    req.auth = { userId: payload.sub, role: payload.role };
    return next();
  } catch {
    return next(new AppError('Token inválido o expirado', 401));
  }
}
