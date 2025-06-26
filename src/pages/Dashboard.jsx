import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import dashboardBg from '../assets/roundtable-hold-elden-ring-moewalls-com.mp4';

const Dashboard = () => {
  const { user, logout, setUser } = useAuthContext();
  const { showNotification } = useNotification();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [pseudo, setPseudo] = useState(user.pseudo);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, pseudo }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la mise à jour');

      setUser({ ...user, email, pseudo });
      showNotification('Profil mis à jour !', 'success');
    } catch (err) {
      showNotification(err.message || 'Erreur serveur', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 🎬 Vidéo de fond */}
      <video
        src={dashboardBg}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* 📋 Formulaire */}
      <div
        style={{
          zIndex: 1,
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '1rem',
          minWidth: '320px',
          maxWidth: '400px',
          width: '90%',
          marginTop:'20px',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Bienvenue, {user.pseudo} 👋</h2>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Pseudo</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Sauvegarde...' : 'Enregistrer'}
          </button>
        </form>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', height: '30%', fontSize: "20px" }}>
          <button type="button" onClick={handleLogout}>🚪 Déconnexion</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
