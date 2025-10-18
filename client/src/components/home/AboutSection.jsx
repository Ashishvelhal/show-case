import React from 'react';
import { Box, Typography, Container, Grid, Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: 'rgb(var(--base-200))',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background-color 0.3s ease',
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
  backgroundColor: 'rgb(var(--base-100))',
  borderRadius: '12px',
  boxShadow: '0 5px 20px rgba(var(--primary), 0.05)',
  height: '100%',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
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
  {
    icon: '💎',
    title: 'Premium Quality',
    description: 'Only the finest resins and materials are used to ensure longevity and beauty.',
  },
  {
    icon: '🎯',
    title: 'Custom Orders',
    description: 'Personalized designs tailored to your specific vision and space requirements.',
  },
  {
    icon: '🏆',
    title: 'Award Winning',
    description: 'Recognized by art communities for innovative techniques and stunning results.',
  },
];

const additionalFeatures = [
  {
    icon: '🔒',
    title: 'Durability',
    description: 'UV-resistant coatings ensure your pieces remain vibrant for years to come.',
  },
  {
    icon: '🚚',
    title: 'Fast Shipping',
    description: 'Carefully packaged and shipped worldwide with tracking and insurance.',
  },
  {
    icon: '💰',
    title: 'Best Value',
    description: 'Competitive pricing for premium, handcrafted art that appreciates in value.',
  },
  {
    icon: '🎨',
    title: 'Color Variety',
    description: 'Endless color combinations and effects from subtle pastels to bold statements.',
  },
  {
    icon: '📏',
    title: 'Size Options',
    description: 'From small coasters to large wall installations - we create pieces in any size.',
  },
  {
    icon: '✨',
    title: 'Special Effects',
    description: 'Metallic finishes, glow-in-the-dark elements, and 3D depth effects available.',
  },
];

const AboutSection = () => {
  return (
    <Section>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 6,
          '@media (max-width: 900px)': {
            flexDirection: 'column',
            textAlign: 'center'
          }
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: { xs: '1', md: '1' }
          }}>
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
                  color: 'rgb(var(--text-primary))',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                  '&::after': {
                    content: '""',
                    display: 'block',
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(90deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                    marginTop: '1rem',
                    borderRadius: '2px',
                    transition: 'background 0.3s ease',
                  },
                }}
              >
                Our Story
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgb(var(--text-secondary))', fontSize: '1.1rem', lineHeight: 1.8, mb: 3, transition: 'color 0.3s ease' }}>
                Welcome to our world of resin art, where creativity meets craftsmanship.
                What started as a passion project has blossomed into a thriving business
                dedicated to creating stunning, one-of-a-kind resin pieces.
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgb(var(--text-secondary))', fontSize: '1.1rem', lineHeight: 1.8, mb: 4, transition: 'color 0.3s ease' }}>
                Our mission is to bring beauty and uniqueness into your space with our
                handcrafted resin art. Each piece is made with love and attention to detail,
                ensuring you receive a work of art that tells its own story.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(var(--primary), 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Learn More About Us
              </Button>
            </motion.div>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: { xs: '1', md: '1' }
          }}>
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
          </Box>
        </Box>

        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: 'rgb(var(--text-primary))',
              position: 'relative',
              transition: 'color 0.3s ease',
              '&::after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                margin: '1rem auto 0',
                borderRadius: '2px',
                transition: 'background 0.3s ease',
              },
            }}
          >
            Why Choose Our Resin Art
          </Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 4,
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{
                display: 'flex',
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(33.333% - 21px)' },
                minWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 21px)' },
                maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 21px)' }
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ width: '100%', display: 'flex' }}
                >
                  <FeatureItem>
                    <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                      {feature.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'rgb(var(--text-primary))' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgb(var(--text-secondary))' }}>
                      {feature.description}
                    </Typography>
                  </FeatureItem>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

export default AboutSection;
