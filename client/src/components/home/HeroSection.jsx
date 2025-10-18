import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)({
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  padding: '6rem 0',
  background: 'linear-gradient(135deg, rgb(var(--base-200)) 0%, rgb(var(--base-300)) 100%)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'rgb(var(--primary))\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    animation: 'float 25s linear infinite',
    zIndex: 0,
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0) rotate(0deg)' },
    '100%': { transform: 'translateY(-50%) rotate(360deg)' },
  },
});

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
});

const HeroTitle = styled(Typography)({
  background: 'linear-gradient(90deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  marginBottom: '1.5rem',
  textShadow: '0 2px 10px rgba(var(--primary), 0.1)',
  transition: 'background 0.3s ease',
});

const HeroSubtitle = styled(Typography)({
  color: 'rgb(var(--text-secondary))',
  fontSize: '1.25rem',
  maxWidth: '700px',
  margin: '0 auto 2.5rem',
  lineHeight: 1.7,
  transition: 'color 0.3s ease',
});

const CTAButton = styled(Button)({
  background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
  color: 'white',
  padding: '0.8rem 2.5rem',
  borderRadius: '50px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1.1rem',
  boxShadow: '0 4px 15px rgba(var(--primary), 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 7px 20px rgba(var(--primary), 0.4)',
  },
});

const HeroSection = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <HeroContent>
          <Typography
            variant="overline"
            sx={{
              display: 'inline-block',
              color: 'rgb(var(--primary))',
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: 2,
              background: 'rgba(var(--primary), 0.1)',
              px: 2,
              py: 0.5,
              borderRadius: '50px',
              transition: 'color 0.3s ease, background-color 0.3s ease',
            }}
          >
            Handcrafted Resin Art
          </Typography>
          <HeroTitle variant="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' } }}>
            Transform Your Space with <br />
            <Box component="span" sx={{ color: 'primary.main' }}>Resin Art</Box>
          </HeroTitle>
          <HeroSubtitle>
            Discover unique, hand-poured resin creations that bring color and life to any space.
            Each piece is a one-of-a-kind work of art, crafted with premium materials and attention to detail.
          </HeroSubtitle>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton variant="contained" size="large">
              Shop Collection
            </CTAButton>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgb(var(--primary))',
                color: 'rgb(var(--primary))',
                '&:hover': {
                  borderColor: 'rgb(var(--primary))',
                  backgroundColor: 'rgba(var(--primary), 0.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Learn More
            </Button>
          </Box>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
