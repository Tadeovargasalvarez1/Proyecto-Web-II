import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" aria-label="MiniAula, inicio">
          <Logo />
        </Link>
        {/* Fase 2: enlaces de login/registro y menú según rol */}
      </nav>
    </header>
  );
}
