import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Box)({
  padding: '6rem 0',
});

const AboutCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
}));

const About = () => {
  return (
    <Box>
      <Section sx={{ backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(90deg, #0af, #a0f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About Us
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              We are a team of passionate developers and designers creating amazing web experiences.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <AboutCard>
                <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
                  Our Mission
                </Typography>
                <Typography color="textSecondary">
                  To deliver innovative and high-quality web solutions that help businesses grow and succeed in the digital world.
                </Typography>
              </AboutCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <AboutCard>
                <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
                  Our Vision
                </Typography>
                <Typography color="textSecondary">
                  To be a leading force in web development, known for our creativity, technical excellence, and client satisfaction.
                </Typography>
              </AboutCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <AboutCard>
                <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
                  Our Values
                </Typography>
                <Typography color="textSecondary">
                  We value innovation, quality, transparency, and building lasting relationships with our clients.
                </Typography>
              </AboutCard>
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Box>
  );
};

export default About;
