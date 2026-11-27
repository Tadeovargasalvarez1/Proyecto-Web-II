import { test } from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-for-auth-service-tests';

const { createAuthService } = await import('../src/services/auth.service.js');
const { default: app } = await import('../src/app.js');
const { loginSchema } = await import('../src/validators/auth.validator.js');

function createFixture() {
  const users = new Map();
  let nextId = 1;
  const repository = {
    async findUserByEmail(email) {
      return [...users.values()].find((user) => user.email === email) || null;
    },
    async findUserById(id) {
      return users.get(id) || null;
    },
    async createUser(attributes) {
      const user = { id: String(nextId++), ...attributes };
      users.set(user.id, user);
      return user;
    },
  };
  const service = createAuthService({ userRepository: repository, secret: process.env.JWT_SECRET });
  return { service, users };
}

test('registro guarda hash, asigna rol estudiante y devuelve token sin exponer contraseña', async () => {
  const { service, users } = createFixture();
  const result = await service.register({ name: 'Ana Pérez', email: 'ana@example.com', password: 'correcta-123', role: 'instructor' });

  assert.equal(result.user.role, 'student');
  assert.equal('passwordHash' in result.user, false);
  assert.equal(await bcrypt.compare('correcta-123', users.get(result.user.id).passwordHash), true);
  assert.equal(jwt.verify(result.token, process.env.JWT_SECRET).sub, result.user.id);
});

test('registro rechaza un correo ya existente', async () => {
  const { service } = createFixture();
  const account = { name: 'Ana Pérez', email: 'ana@example.com', password: 'correcta-123' };
  await service.register(account);

  await assert.rejects(service.register(account), { statusCode: 409 });
});

test('inicio de sesión devuelve error genérico para correo o contraseña incorrectos', async () => {
  const { service } = createFixture();
  await service.register({ name: 'Ana Pérez', email: 'ana@example.com', password: 'correcta-123' });

  await assert.rejects(
    service.login({ email: 'ana@example.com', password: 'incorrecta-123' }),
    { statusCode: 401, message: 'Correo o contraseña incorrectos' },
  );
  await assert.rejects(
    service.login({ email: 'nadie@example.com', password: 'incorrecta-123' }),
    { statusCode: 401, message: 'Correo o contraseña incorrectos' },
  );
});

test('el inicio de sesión rechaza contraseñas que bcrypt truncaría', () => {
  const result = loginSchema.safeParse({ email: 'ana@example.com', password: 'a'.repeat(73) });
  assert.equal(result.success, false);
});

test('GET /api/auth/me exige un token y el registro valida el cuerpo', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const unauthorized = await fetch(`http://localhost:${port}/api/auth/me`);
    assert.equal(unauthorized.status, 401);
    assert.deepEqual(await unauthorized.json(), { success: false, message: 'Se requiere autenticación' });

    const invalid = await fetch(`http://localhost:${port}/api/auth/register`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'no-es-correo', password: '123' }),
    });
    assert.equal(invalid.status, 400);
    assert.equal((await invalid.json()).success, false);
  } finally {
    server.close();
  }
});
