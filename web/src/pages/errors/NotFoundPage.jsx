import Button from '../../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="mt-4 text-slate-600">La página que buscas no existe o fue movida.</p>
      <Button to="/" className="mt-8">Volver al inicio</Button>
    </section>
  );
}
