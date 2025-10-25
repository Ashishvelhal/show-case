import React from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  EmojiObjects,
  Visibility,
  Favorite,
  Code,
  DesignServices,
  Speed,
  Group,
  Star,
  TrendingUp
} from '@mui/icons-material';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled(Box)({
  padding: '8rem 0',
  background: 'linear-gradient(135deg, rgb(var(--base-200)) 0%, rgb(var(--base-300)) 50%, rgb(var(--base-200)) 100%)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background-color 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(var(--primary), 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(var(--secondary), 0.03) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(var(--accent), 0.02) 0%, transparent 50%)',
    animation: `${float} 20s ease-in-out infinite`,
  },
});

const HeroSection = styled(Box)({
  padding: '10rem 0 6rem 0',
  background: 'linear-gradient(135deg, rgb(var(--base-300)) 0%, rgb(var(--primary), 0.05) 50%, rgb(var(--base-200)) 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(var(--primary), 0.02) 0%, transparent 70%), radial-gradient(circle at 80% 20%, rgba(var(--secondary), 0.02) 0%, transparent 70%)',
    animation: `${float} 25s ease-in-out infinite reverse`,
  },
});

const AboutCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(var(--primary), 0.1), 0 4px 16px rgba(var(--secondary), 0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, rgb(var(--primary)), rgb(var(--secondary)))',
    transform: 'scaleX(0)',
    transition: 'transform 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(var(--primary), 0.15), 0 10px 20px rgba(var(--secondary), 0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
  '& .card-icon': {
    animation: `${fadeInUp} 0.6s ease-out forwards`,
    animationDelay: '0.2s',
  },
}));

const StatsCard = styled(Paper)({
  padding: '2rem',
  textAlign: 'center',
  borderRadius: '16px',
  background: 'linear-gradient(145deg, rgba(var(--primary), 0.1) 0%, rgba(var(--secondary), 0.05) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(var(--primary), 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(var(--primary), 0.2)',
  },
});

const FloatingIcon = styled(Box)({
  position: 'absolute',
  top: '20%',
  right: '10%',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, rgba(var(--primary), 0.1), rgba(var(--secondary), 0.1))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${float} 6s ease-in-out infinite`,
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
});

const About = () => {
  const stats = [
    { number: '500+', label: 'Projects Completed', icon: <Star /> },
    { number: '50+', label: 'Happy Clients', icon: <Group /> },
    { number: '99%', label: 'Client Satisfaction', icon: <TrendingUp /> },
    { number: '24/7', label: 'Support Available', icon: <Speed /> },
  ];

  const features = [
    {
      icon: <EmojiObjects sx={{ fontSize: '3rem' }} />,
      title: 'Our Mission',
      description: 'To deliver innovative and high-quality web solutions that help businesses grow and succeed in the digital world.',
      color: 'primary.main',
    },
    {
      icon: <Visibility sx={{ fontSize: '3rem' }} />,
      title: 'Our Vision',
      description: 'To be a leading force in web development, known for our creativity, technical excellence, and client satisfaction.',
      color: 'secondary.main',
    },
    {
      icon: <Favorite sx={{ fontSize: '3rem' }} />,
      title: 'Our Values',
      description: 'We value innovation, quality, transparency, and building lasting relationships with our clients.',
      color: '#ff21a0',
    },
  ];

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="xl">
          <Box textAlign="center" position="relative" zIndex={1}>
            <Typography
              variant="overline"
              sx={{
                display: 'inline-block',
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: '0.2em',
                mb: 3,
                px: 3,
                py: 1,
                background: 'rgba(var(--primary), 0.1)',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(var(--primary), 0.2)',
                animation: `${fadeInUp} 0.8s ease-out`,
              }}
            >
              About Neon Showcase
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                fontWeight: 900,
                mb: 3,
                background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 50%, rgb(var(--accent)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(var(--primary), 0.3)',
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
                lineHeight: 1.1,
              }}
            >
              Crafting Digital
              <br />
              <Box component="span" sx={{ color: 'primary.main', position: 'relative' }}>
                Masterpieces
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '4px',
                    background: 'linear-gradient(90deg, rgb(var(--primary)), rgb(var(--secondary)))',
                    borderRadius: '2px',
                  }}
                />
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                mb: 6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                lineHeight: 1.6,
                animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
                fontWeight: 400,
              }}
            >
              We are a team of passionate developers and designers creating amazing web experiences
              that transform businesses and delight users worldwide.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
              }}
            >
              <Button
                component={Link}
                to="/shop"
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                  color: 'white',
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(var(--primary), 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(var(--primary), 0.4)',
                    background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                  },
                }}
              >
                Explore Our Work
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgb(var(--primary))',
                  color: 'rgb(var(--primary))',
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgb(var(--primary))',
                    backgroundColor: 'rgba(var(--primary), 0.05)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(var(--primary), 0.2)',
                  },
                }}
              >
                Get In Touch
              </Button>
            </Box>
          </Box>
          <FloatingIcon>
            <DesignServices sx={{ color: 'primary.main', fontSize: '2rem' }} />
          </FloatingIcon>
        </Container>
      </HeroSection>

      <Section>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${fadeInUp} 0.8s ease-out`,
              }}
            >
              Why Choose Us?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }}
            >
              Discover what sets us apart and makes us the perfect partner for your digital journey.
            </Typography>
          </Box>

          <Grid container spacing={4} mb={8} justifyContent="center" alignItems="stretch">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={8} md={4} key={feature.title}>
                <AboutCard sx={{ animation: `${fadeInUp} 0.8s ease-out ${index * 0.2}s both` }}>
                  <Box sx={{ color: feature.color, mb: 3, textAlign: 'center' }} className="card-icon">
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    color="primary"
                    gutterBottom
                    fontWeight="bold"
                    sx={{ textAlign: 'center', mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </AboutCard>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${fadeInUp} 0.8s ease-out`,
              }}
            >
              Our Impact
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                mb: 6,
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }}
            >
              Numbers that speak for themselves and showcase our commitment to excellence.
            </Typography>
          </Box>

          <Grid container spacing={4} mb={6} justifyContent="center" alignItems="stretch">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <StatsCard sx={{ animation: `${fadeInUp} 0.8s ease-out ${index * 0.1}s both` }}>
                  <Box sx={{ color: 'primary.main', mb: 2, fontSize: '2.5rem' }}>
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </StatsCard>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" sx={{ animation: `${fadeInUp} 0.8s ease-out 0.8s both` }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 4,
                color: 'text.primary',
              }}
            >
              Ready to Start Your Journey?
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                color: 'white',
                px: 6,
                py: 2.5,
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 10px 30px rgba(var(--primary), 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 40px rgba(var(--primary), 0.4)',
                  background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                },
              }}
            >
              Let's Create Something Amazing
            </Button>
          </Box>
        </Container>
      </Section>
    </Box>
  );
};

export default About;
