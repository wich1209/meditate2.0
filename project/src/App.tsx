import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';
import HomePage from './pages/HomePage';
import MeditationPage from './pages/MeditationPage';
import SettingsPage from './pages/SettingsPage';
import ProgressPage from './pages/ProgressPage';
import Layout from './components/layout/Layout';

function App() {
  const { theme, initTheme } = useThemeStore();
  
  useEffect(() => {
    // Initialize theme based on system preference or stored preference
    initTheme();
  }, [initTheme]);
  
  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="meditation" element={<MeditationPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>
    </Routes>
  );
}

export default App;