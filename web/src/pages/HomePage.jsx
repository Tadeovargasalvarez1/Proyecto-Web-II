import ApiStatus from '../components/common/ApiStatus.jsx';

const features = [
  { title: 'Para estudiantes', text: 'Explora cursos cortos, inscríbete, avanza lección a lección y mide tu progreso.' },
  { title: 'Para instructores', text: 'Crea cursos, organiza lecciones y cuestionarios, y sigue el avance de tus alumnos.' },
  { title: 'Aprendizaje breve', text: 'Contenido concreto y evaluaciones rápidas para aprender sin perder el foco.' },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <ApiStatus />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Aprende en poco tiempo con <span className="text-brand-600">MiniAula</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            La plataforma de cursos cortos donde instructores publican contenido y estudiantes aprenden a su ritmo.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-3 sm:px-6">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-2 text-slate-600">{feature.text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
