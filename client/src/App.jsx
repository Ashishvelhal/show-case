import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0af',
    },
    secondary: {
      main: '#a0f',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#212529',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
