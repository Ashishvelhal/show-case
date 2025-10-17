import React from 'react';
import { Box, Typography, Container, Grid, Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: '#f8f9ff',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledAvatar = styled(Avatar)({
  width: '150px',
  height: '150px',
  margin: '0 auto 2rem',
  border: '5px solid white',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
});

const FeatureItem = styled(Box)({
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
});

const features = [
  {
    icon: '🎨',
    title: 'Handcrafted',
    description: 'Each piece is carefully hand-poured and finished with attention to detail.',
  },
  {
    icon: '✨',
    title: 'Unique Designs',
    description: 'No two pieces are exactly alike, ensuring you get a one-of-a-kind creation.',
  },
  {
    icon: '🌿',
    title: 'Eco-Friendly',
    description: 'We use non-toxic, environmentally responsible materials in all our creations.',
  },
];

const AboutSection = () => {
  return (
    <Section>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: '#2d3748',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                    marginTop: '1rem',
                    borderRadius: '2px',
                  },
                }}
              >
                Our Story
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Welcome to our world of resin art, where creativity meets craftsmanship. 
                What started as a passion project has blossomed into a thriving business 
                dedicated to creating stunning, one-of-a-kind resin pieces.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                Our mission is to bring beauty and uniqueness into your space with our 
                handcrafted resin art. Each piece is made with love and attention to detail, 
                ensuring you receive a work of art that tells its own story.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(37, 117, 252, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Learn More About Us
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    paddingTop: '100%',
                  },
                  '& img': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Resin Art Creation Process" 
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              mb: 6,
              color: '#2d3748',
              position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                margin: '1rem auto 0',
                borderRadius: '2px',
              },
            }}
          >
            Why Choose Our Resin Art
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureItem>
                    <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                      {feature.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </FeatureItem>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Section>
  );
};

export default AboutSection;
