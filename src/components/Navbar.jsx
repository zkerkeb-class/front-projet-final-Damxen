import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitch from './ThemeSwitch';
import LogoutIcon from '@mui/icons-material/Logout';





const Navbar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-logo orange-text">GameHub</div>
      <div className="nav-links">
        <Link className="nav-link" to="/">Accueil</Link>
        {user && <Link className="nav-link" to="/game">Jeux</Link>}
        {user && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
        {!user && (
          <>
            <Link className="nav-link" to="/login">Connexion</Link>
            <Link className="nav-link" to="/register">Inscription</Link>
          </>
        )}

        <div className="theme-toggle">
          <ThemeSwitch />
        </div>

        {user && (
          <button className="logout-link icon-only" onClick={handleLogout} title="Déconnexion">
            <LogoutIcon fontSize="medium" />
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
