import { createAuthService } from '../services/auth.service.js';
import { env } from '../config/environment.js';

const authService = createAuthService({ secret: env.jwt.secret, expiresIn: env.jwt.expiresIn });

export async function register(req, res) {
  const data = await authService.register(req.body);
  res.status(201).json({ success: true, message: 'Cuenta creada correctamente', data });
}

export async function login(req, res) {
  const data = await authService.login(req.body);
  res.json({ success: true, message: 'Sesión iniciada correctamente', data });
}

export async function me(req, res) {
  const user = await authService.getCurrentUser(req.auth.userId);
  res.json({ success: true, message: 'Usuario autenticado', data: { user } });
}
