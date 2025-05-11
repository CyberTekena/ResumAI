
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Store theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      useThemeStore.getState().setTheme(savedTheme);
    } else {
      // Use system preference if no preference is stored
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      useThemeStore.getState().setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);
  
  return children;
}
