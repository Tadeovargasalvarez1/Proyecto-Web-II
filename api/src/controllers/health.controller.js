// Los controladores solo traducen HTTP <-> servicios. La lógica de negocio vive en src/services.
import { getHealthStatus } from '../services/health.service.js';

export async function getHealth(req, res) {
  res.json(await getHealthStatus());
}
