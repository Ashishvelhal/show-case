import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { useTheme } from '../contexts/ThemeContext';

const ThemeDropdown = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (themeValue) => {
    changeTheme(themeValue);
    handleClose();
  };

  const getThemeColor = (themeValue) => {
    const colorMap = {
      light: '#ffffff',
      dark: '#000000',
      cupcake: '#fef3c7',
      bumblebee: '#fde047',
      emerald: '#10b981',
      corporate: '#7c3aed',
      synthwave: '#ec4899',
      retro: '#f59e0b',
      cyberpunk: '#06b6d4',
      valentine: '#f43f5e',
      halloween: '#f97316',
      garden: '#22c55e',
      forest: '#16a34a',
      aqua: '#06b6d4',
      lofi: '#f3f4f6',
      pastel: '#fbbf24',
      fantasy: '#8b5cf6',
      wireframe: '#f8fafc',
      black: '#000000',
      luxury: '#1f2937',
      dracula: '#7c3aed',
      cmyk: '#ef4444',
      autumn: '#dc2626',
      business: '#1f2937',
      acid: '#10b981',
      lemonade: '#fbbf24',
      night: '#1e293b',
      coffee: '#92400e',
      winter: '#e2e8f0',
      dim: '#374151',
      nord: '#5b21b6',
      sunset: '#f59e0b'
    };
    return colorMap[themeValue] || '#6b7280';
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: 'rgb(var(--primary))',
          '&:hover': {
            backgroundColor: 'rgba(var(--primary), 0.1)',
          },
          ml: 1
        }}
        title="Change Theme"
      >
        <PaletteIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 500,
            width: 220,
            backgroundColor: 'rgb(var(--base-100))',
            color: 'rgb(var(--text-primary))',
            overflow: 'auto'
          }
        }}
      >
        {themes.slice(0, 32).map((theme) => (
          <MenuItem
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            selected={currentTheme === theme.value}
            sx={{
              backgroundColor: currentTheme === theme.value ? 'rgba(var(--primary), 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(var(--primary), 0.1)'
              }
            }}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: getThemeColor(theme.value),
                  border: '1px solid',
                  borderColor: 'rgb(var(--border-color))'
                }}
              />
            </ListItemIcon>
            <ListItemText primary={theme.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThemeDropdown;
