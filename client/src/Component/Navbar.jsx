import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NeonButton = styled(Button)(({ theme, active }) => ({
  color: active ? '#0af' : '#6c757d',
  border: active ? '1px solid #0af' : '1px solid transparent',
  boxShadow: active ? '0 0 5px rgba(0, 170, 255, 0.5)' : 'none',
  '&:hover': {
    backgroundColor: 'rgba(0, 170, 255, 0.05)',
    boxShadow: '0 0 15px rgba(0, 170, 255, 0.3)',
    color: '#0af',
    borderColor: '#0af',
  },
  margin: '0 5px',
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '1rem',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('md')]: {
    padding: '6px 12px',
    fontSize: '0.9rem',
    margin: '2px 0'
  }
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { 
      text: 'Contact', 
      path: '/contact',
      special: true
    }
  ];

  const drawer = (
    <Box sx={{ 
      width: 250, 
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'background.paper'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        p: 1
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            background: 'linear-gradient(90deg, #0af, #a0f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          NEON SHOWCASE
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              mb: 1,
              borderRadius: '8px',
              backgroundColor: isActive(item.path) ? 'rgba(0, 170, 255, 0.05)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 170, 255, 0.1)'
              }
            }}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                color: isActive(item.path) ? '#0af' : 'text.primary',
                fontWeight: isActive(item.path) ? 600 : 400
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(8px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : '0 1px 5px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        py: scrolled ? 0.5 : 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: { xs: '60px', md: '70px' }
        }}>
          <Box component={Link} to="/" sx={{ textDecoration: 'none' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                background: 'linear-gradient(90deg, #0af, #a0f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                '&:hover': {
                  opacity: 0.9,
                },
                transition: 'opacity 0.3s ease',
              }}
            >
              NEON SHOWCASE
            </Typography>
          </Box>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                color: '#6c757d',
                '&:hover': {
                  color: '#0af',
                  backgroundColor: 'rgba(0, 170, 255, 0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <NeonButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  active={isActive(item.path) ? 1 : 0}
                  sx={{
                    ...(item.special && {
                      background: isActive(item.path) 
                        ? 'linear-gradient(45deg, #0af 0%, #a0f 100%)' 
                        : 'transparent',
                      color: isActive(item.path) ? 'white' : 'inherit',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #0af 0%, #a0f 100%)',
                        color: 'white',
                      },
                    }),
                    mx: 0.5
                  }}
                >
                  {item.text}
                </NeonButton>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            borderLeft: '1px solid rgba(0, 0, 0, 0.05)'
          },
          display: { xs: 'block', md: 'none' }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;