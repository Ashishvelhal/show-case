import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, useMediaQuery, useTheme, Container, Paper, Divider } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Dashboard, People, Settings, Logout, Help } from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const drawerWidth = 280;

const SidebarContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (item) => {
    if (item.path === '') {
      navigate('/dashboard');
    } else {
      navigate(item.path);
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '', color: '#4caf50' }, // Empty for index
    { text: 'Users', icon: <People />, path: 'users', color: '#2196f3' },
    { text: 'Settings', icon: <Settings />, path: 'settings', color: '#ff9800' },
    { text: 'Inquiry', icon: <Help />, path: 'inquiry', color: '#9c27b0' },
  ];

  const isActive = (path) => {
    if (path === '') {
      return location.pathname === '/dashboard';
    }
    const fullPath = `/dashboard/${path}`;
    return location.pathname === fullPath || location.pathname.startsWith(fullPath + '/');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
        height: '100%',
        color: 'white',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
          Admin Panel
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Manage your application
        </Typography>
      </Box>
      <List sx={{ pt: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleMenuClick(item)}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: '8px',
              backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'translateX(5px)',
              },
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&::before': isActive(item.path) ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: item.color,
              } : {},
            }}
          >
            <Box sx={{ color: item.color, mr: 2, fontSize: '1.5rem' }}>
              {item.icon}
            </Box>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 600 : 400,
                fontSize: '0.95rem',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          2023 Admin Dashboard
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
              overflow: 'hidden',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
              overflow: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: '12px',
              background: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default SidebarContainer;
