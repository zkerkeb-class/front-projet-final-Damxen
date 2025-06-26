import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import useAuth from '../hooks/useAuth';
import registerBg from '../assets/the-witcher-geralt--moewalls-com.mp4'; 
//import { useTranslation } from 'react-i18next';

const Register = () => {
  const { setLoading, loading } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return showNotification('Les mots de passe ne correspondent pas', 'error');
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, pseudo })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l’inscription');

      showNotification('Inscription réussie ! Connecte-toi.', 'success');
      navigate('/login');
    } catch (err) {
      showNotification(err.message || 'Erreur inconnue', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ position: 'relative', overflow: 'hidden', marginTop:"5px" }}>
      {/* Vidéo de fond */}
      <video
        src={registerBg}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1, 
        }}
      />

      {/* Overlay sombre si nécessaire */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        }}
      />

      <div className="login-wrapper">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Adresse email</label>
          <input
            id="email"
            type="email"
            placeholder="Adresse mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="pseudo">Username</label>
          <input
            id="pseudo"
            type="text"
            placeholder="Nom d’utilisateur"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Création en cours...' : 'Créer un compte'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
