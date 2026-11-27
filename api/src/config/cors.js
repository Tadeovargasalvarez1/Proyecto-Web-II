// CORS: solo los orígenes configurados (lista separada por comas) pueden llamar a la API.
import { env } from './environment.js';

export const corsOptions = {
  origin: env.corsOrigin.split(',').map((origin) => origin.trim()),
  credentials: true,
};
