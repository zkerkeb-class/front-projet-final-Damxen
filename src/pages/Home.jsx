import { useRef, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import stillHereCinLol from '../assets/stillHereCinLol.mp4';
//import { useTranslation } from 'react-i18next';


// Slider personnalisé
const PrettoSlider = styled(Slider)({
  color: '#f5c518',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    display: 'none',
  },
});

const Home = () => {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(0.2);
  //const { t } = useTranslation(); == Pour i18n


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Vidéo en fond */}
      <video
        ref={videoRef}
        src={stillHereCinLol}
        autoPlay
        muted={false}
        loop
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

      {/* Texte d’introduction */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: '#fff',
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        }}
      >
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>Bienvenue dans <span className="orange-text">GameHub</span></h1>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Explorez, jouez, survivez.</p>
      </div>

      {/* Slider volume avec icône */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '20px',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '180px',
        }}
      >
        {volume === 0 ? (
          <VolumeOffIcon sx={{ color: '#f5c518' }} />
        ) : (
          <VolumeUpIcon sx={{ color: '#f5c518' }} />
        )}

        <PrettoSlider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default Home;
