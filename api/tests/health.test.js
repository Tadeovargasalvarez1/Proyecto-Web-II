// Prueba de humo del endpoint de salud con el test runner nativo de Node (sin dependencias extra).
import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
const { default: app } = await import('../src/app.js');

test('GET /api/health responde correctamente', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://localhost:${port}/api/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { success: true, message: 'MiniAula API funcionando correctamente' });
  } finally {
    server.close();
  }
});
