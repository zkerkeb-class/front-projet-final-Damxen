import { useState } from 'react';
import EscBSH from '../assets/EscBSH.jpg';
import ClairObs from '../assets/Expp.mp4';

const Game = () => {
  const [launched, setLaunched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLaunchGame = () => {
    if (launched || loading) return;

    setLaunched(true);
    setLoading(true);

    const script = document.createElement('script');
    script.src = '/unity/webgl.loader.js';

    script.onload = () => {
      const canvas = document.querySelector('#unity-canvas');
      if (!canvas) {
        console.error('Canvas not found');
        return;
      }

      window
        .createUnityInstance(canvas, {
          dataUrl: '/unity/webgl.data',
          frameworkUrl: '/unity/webgl.framework.js',
          codeUrl: '/unity/webgl.wasm',
          streamingAssetsUrl: 'StreamingAssets',
          companyName: 'Dams',
          productName: 'Escape The Backshrooms',
          productVersion: '1.0',
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    };

    document.body.appendChild(script);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/*Vidéo en fond */}
      <video
        src={ClairObs}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: 'scale(1.2)',
          zIndex: -1,
        }}
      />

      {/*Jeu*/}
      {!launched ? (
        <div
          onClick={handleLaunchGame}
          className="game-hover-container"
          style={{
            position: 'relative',
            cursor: 'pointer',
            borderRadius: '1rem',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            zIndex: 1,
          }}
        >
          <img
            src={EscBSH}
            alt="Escape Backshrooms"
            style={{
              width: '100%',
              maxWidth: '600px',
              display: 'block',
              borderRadius: '1rem',
            }}
          />
          <div className="hover-overlay">
            <div className="play-button">▶</div>
          </div>
        </div>
      ) : (
        <>
          {loading && <div className="unity-loader" style={{ zIndex: 1 }}></div>}
          <canvas
            id="unity-canvas"
            width="960"
            height="600"
            style={{
              width: '100%',
              maxWidth: '960px',
              height: '100%',
              maxHeight: '90vh',
              backgroundColor: '#000',
              borderRadius: '8px',
              objectFit: 'contain',
              display: loading ? 'none' : 'block',
              zIndex: 1,
            }}
          ></canvas>
        </>
      )}
    </div>
  );
};

export default Game;
