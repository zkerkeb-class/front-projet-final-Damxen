import { useTheme } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-icon-button" onClick={toggleTheme} title="Changer de thème">
      {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </button>
  );
}
