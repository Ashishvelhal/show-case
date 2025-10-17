import React from 'react';
import { Box, Container, Typography, IconButton, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Facebook, Twitter, Instagram, GitHub, Email, Phone } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      component="footer" 
      sx={{
        py: { xs: 3, sm: 4 },
        mt: 'auto',
        background: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(90deg, #0af, #a0f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              NEON SHOWCASE
            </Typography>
            <Typography variant="body2" sx={{ color: '#6c757d', mb: 2 }}>
              Creating beautiful resin art pieces that bring life to your space.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size={isMobile ? 'small' : 'medium'}
                sx={{ 
                  color: '#6c757d',
                  '&:hover': { 
                    color: '#0af',
                    transform: 'translateY(-2px)',
                    backgroundColor: 'rgba(0, 170, 255, 0.1)'
                  } 
                }}
              >
                <Facebook fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              <IconButton 
                size={isMobile ? 'small' : 'medium'}
                sx={{ 
                  color: '#6c757d',
                  '&:hover': { 
                    color: '#1DA1F2',
                    transform: 'translateY(-2px)',
                    backgroundColor: 'rgba(29, 161, 242, 0.1)'
                  } 
                }}
              >
                <Twitter fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              <IconButton 
                size={isMobile ? 'small' : 'medium'}
                sx={{ 
                  color: '#6c757d',
                  '&:hover': { 
                    color: '#E1306C',
                    transform: 'translateY(-2px)',
                    backgroundColor: 'rgba(225, 48, 108, 0.1)'
                  } 
                }}
              >
                <Instagram fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#343a40' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography 
                component="a" 
                href="/" 
                sx={{
                  color: '#6c757d',
                  textDecoration: 'none',
                  '&:hover': { color: '#0af' },
                  transition: 'color 0.2s ease',
                  fontSize: '0.9rem'
                }}
              >
                Home
              </Typography>
              {/* Other links... */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#343a40' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ color: '#6c757d', fontSize: '1.1rem' }} />
                <Typography variant="body2" sx={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  info@neonshowcase.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ color: '#6c757d', fontSize: '1.1rem' }} />
                <Typography variant="body2" sx={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ 
          mt: 4, 
          pt: 3, 
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          textAlign: 'center' 
        }}>
          <Typography variant="body2" sx={{ color: '#6c757d', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Neon Showcase. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;