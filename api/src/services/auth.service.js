import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/app-error.js';
import * as defaultUserRepository from '../repositories/user.repository.js';

const SALT_ROUNDS = 12;

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function createAuthService({
  userRepository = defaultUserRepository,
  secret,
  expiresIn = '1d',
}) {
  if (!secret) throw new Error('JWT_SECRET es obligatorio para autenticación');

  function createToken(user) {
    return jwt.sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });
  }

  async function register({ name, email, password }) {
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) throw new AppError('Ya existe una cuenta con ese correo', 409);

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    let user;
    try {
      // El alta pública siempre crea estudiantes; el rol instructor requiere un flujo autorizado.
      user = await userRepository.createUser({ name, email, passwordHash, role: 'student' });
    } catch (error) {
      // La restricción única de la base de datos resuelve registros concurrentes.
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new AppError('Ya existe una cuenta con ese correo', 409);
      }
      throw error;
    }

    return { user: toPublicUser(user), token: createToken(user) };
  }

  async function login({ email, password }) {
    const user = await userRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError('Correo o contraseña incorrectos', 401);
    }

    return { user: toPublicUser(user), token: createToken(user) };
  }

  async function getCurrentUser(id) {
    const user = await userRepository.findUserById(id);
    if (!user) throw new AppError('La sesión ya no corresponde a una cuenta activa', 401);
    return toPublicUser(user);
  }

  return { register, login, getCurrentUser };
}
