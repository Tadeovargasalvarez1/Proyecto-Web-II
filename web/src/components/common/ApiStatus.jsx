// Muestra si el frontend llega a GET /api/health (verificación de la fase 1).
import { useEffect, useState } from 'react';
import { getHealth } from '../../services/api.js';

export default function ApiStatus() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    getHealth()
      .then((data) => setStatus(data.success ? 'ok' : 'error'))
      .catch(() => setStatus('error'));
  }, []);

  const styles = {
    checking: ['bg-slate-100 text-slate-600', 'Comprobando API…'],
    ok: ['bg-emerald-50 text-emerald-700', 'API conectada'],
    error: ['bg-rose-50 text-rose-700', 'API no disponible'],
  };
  const [className, label] = styles[status];

  return (
    <span role="status" className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${className}`}>
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}
