import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import { ThemeProvider as DaisyThemeProvider, useTheme } from './contexts/ThemeContext';

// Material-UI theme creator based on Daisy UI theme
const createMuiTheme = (daisyTheme) => {
  const themeMap = {
    light: {
      primary: { main: '#0af' },
      secondary: { main: '#a0f' },
      background: { default: '#ffffff', paper: '#f8f9fa' },
      text: { primary: '#212529', secondary: '#495057' }
    },
    dark: {
      primary: { main: '#0af' },
      secondary: { main: '#a0f' },
      background: { default: '#212529', paper: '#343a40' },
      text: { primary: '#ffffff', secondary: '#adb5bd' }
    },
    cupcake: {
      primary: { main: '#ec4899' },
      secondary: { main: '#f87171' },
      background: { default: '#fffbeb', paper: '#fef3c7' },
      text: { primary: '#1f2937', secondary: '#6b7280' }
    },
    synthwave: {
      primary: { main: '#a855f7' },
      secondary: { main: '#ec4899' },
      background: { default: '#0f172a', paper: '#1e293b' },
      text: { primary: '#ffffff', secondary: '#94a3b8' }
    },
    cyberpunk: {
      primary: { main: '#06b6d4' },
      secondary: { main: '#ec4899' },
      background: { default: '#0a0e1a', paper: '#0f172a' },
      text: { primary: '#ffffff', secondary: '#94a3b8' }
    }
  };

  const colors = themeMap[daisyTheme] || themeMap.light;

  return createTheme({
    palette: {
      mode: daisyTheme === 'dark' ? 'dark' : 'light',
      primary: colors.primary,
      secondary: colors.secondary,
      background: colors.background,
      text: colors.text,
    },
    typography: {
      fontFamily: '"Orbitron", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: 'rgb(var(--base-100))',
            color: 'rgb(var(--base-content))',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
    },
  });
};

// Wrapper component to access theme context
const AppContent = () => {
  const { currentTheme } = useTheme();
  const muiTheme = createMuiTheme(currentTheme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

function App() {
  return (
    <DaisyThemeProvider>
      <AppContent />
    </DaisyThemeProvider>
  );
}

export default App;
