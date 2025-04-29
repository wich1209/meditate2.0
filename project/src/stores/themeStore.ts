import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      initTheme: () => {
        const savedTheme = localStorage.getItem('theme-store')
          ? JSON.parse(localStorage.getItem('theme-store') || '{}')?.state?.theme || 'system'
          : 'system';
        
        if (savedTheme === 'system') {
          const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          set({ theme: isSystemDark ? 'dark' : 'light' });
        } else {
          set({ theme: savedTheme });
        }
      },
    }),
    {
      name: 'theme-store',
    }
  )
);