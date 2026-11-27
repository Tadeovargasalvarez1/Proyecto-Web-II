// Botón reutilizable. Renderiza un <Link> si recibe "to".
import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-white text-brand-700 ring-1 ring-inset ring-brand-100 hover:bg-brand-50',
};

export default function Button({ to, variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${variants[variant]} ${className}`;
  return to ? <Link to={to} className={classes} {...props} /> : <button className={classes} {...props} />;
}
