import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'Cupcake', value: 'cupcake' },
  { name: 'Bumblebee', value: 'bumblebee' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Corporate', value: 'corporate' },
  { name: 'Synthwave', value: 'synthwave' },
  { name: 'Retro', value: 'retro' },
  { name: 'Cyberpunk', value: 'cyberpunk' },
  { name: 'Valentine', value: 'valentine' },
  { name: 'Halloween', value: 'halloween' },
  { name: 'Garden', value: 'garden' },
  { name: 'Forest', value: 'forest' },
  { name: 'Aqua', value: 'aqua' },
  { name: 'Lofi', value: 'lofi' },
  { name: 'Pastel', value: 'pastel' },
  { name: 'Fantasy', value: 'fantasy' },
  { name: 'Wireframe', value: 'wireframe' },
  { name: 'Black', value: 'black' },
  { name: 'Luxury', value: 'luxury' },
  { name: 'Dracula', value: 'dracula' },
  { name: 'CMYK', value: 'cmyk' },
  { name: 'Autumn', value: 'autumn' },
  { name: 'Business', value: 'business' },
  { name: 'Acid', value: 'acid' },
  { name: 'Lemonade', value: 'lemonade' },
  { name: 'Night', value: 'night' },
  { name: 'Coffee', value: 'coffee' },
  { name: 'Winter', value: 'winter' },
  { name: 'Dim', value: 'dim' },
  { name: 'Nord', value: 'nord' },
  { name: 'Sunset', value: 'sunset' },
];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Check localStorage first, then system preference, then default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.find(t => t.value === savedTheme)) {
      return savedTheme;
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme immediately to html and body elements
    const html = document.documentElement;
    const body = document.body;

    // Remove existing theme classes and attributes
    html.removeAttribute('data-theme');
    html.className = html.className.replace(/theme-\w+/g, '');
    body.removeAttribute('data-theme');
    body.className = body.className.replace(/theme-\w+/g, '');

    // Apply new theme
    html.setAttribute('data-theme', currentTheme);
    html.classList.add(`theme-${currentTheme}`);
    body.setAttribute('data-theme', currentTheme);
    body.classList.add(`theme-${currentTheme}`);

    // Save to localStorage
    localStorage.setItem('theme', currentTheme);

    // Force style recalculation
    html.offsetHeight; // Trigger reflow
  }, [currentTheme]);

  const changeTheme = (themeValue) => {
    if (themes.find(t => t.value === themeValue)) {
      setCurrentTheme(themeValue);
    }
  };

  const value = {
    currentTheme,
    themes,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
