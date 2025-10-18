import React from 'react';
import { Box, Typography, Container, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: 'rgb(var(--base-100))',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background-color 0.3s ease',
}));

const TestimonialCard = styled(Box)({
  backgroundColor: 'rgb(var(--base-100))',
  borderRadius: '12px',
  padding: '2.5rem',
  boxShadow: '0 10px 30px rgba(var(--primary), 0.05)',
  height: '100%',
  minHeight: '280px',
  width: '100%',
  maxWidth: '380px',
  position: 'relative',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
  '&::before': {
    content: '"\\201C"',
    position: 'absolute',
    top: '1.5rem',
    left: '2rem',
    fontSize: '5rem',
    color: 'rgba(var(--primary), 0.1)',
    fontFamily: 'Georgia, serif',
    lineHeight: 1,
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(var(--primary), 0.1)',
  },
});

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Interior Designer',
    content: 'The resin art pieces I purchased completely transformed my living space. The colors are even more vibrant in person and the quality is exceptional!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Art Collector',
    content: 'I\'ve collected art for years, and these resin pieces are among my favorites. The attention to detail and unique designs are truly impressive.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Homeowner',
    content: 'The resin coffee table I ordered is absolutely stunning. It\'s the centerpiece of my living room and always gets compliments from guests.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Gallery Owner',
    content: 'Working with this resin artist has been a game-changer for my gallery. The pieces sell out quickly and customers are always impressed by the craftsmanship.',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Restaurant Owner',
    content: 'I commissioned a custom resin piece for my restaurant\'s dining area. It creates such a warm, inviting atmosphere that customers comment on it daily.',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 5,
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Office Manager',
    content: 'The resin wall art in our office lobby has completely modernized our space. It\'s become a conversation starter for clients and employees alike.',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <Section>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 6,
            color: 'rgb(var(--text-primary))',
            position: 'relative',
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
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
          What Our Customers Say
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          overflow: 'hidden',
          width: '100%',
          py: 2,
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            animation: 'float 20s linear infinite',
            '@keyframes float': {
              '0%': {
                transform: 'translateX(0%)',
              },
              '100%': {
                transform: 'translateX(-50%)',
              },
            },
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              animation: 'none',
              gap: 3
            }
          }}>
            {testimonials.map((testimonial, index) => (
              <Box key={testimonial.id} sx={{
                width: { xs: '100%', sm: '400px', md: '380px' },
                flex: '0 0 auto',
                mx: { xs: 0, sm: 1, md: 1.5 }
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <TestimonialCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          sx={{
                            color: i < testimonial.rating ? 'rgb(var(--warning))' : 'rgb(var(--base-300))',
                            fontSize: '1.2rem',
                            mr: 0.5,
                            transition: 'color 0.3s ease',
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{
                      color: 'rgb(var(--text-secondary))',
                      mb: 3,
                      fontStyle: 'italic',
                      lineHeight: 1.8,
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      transition: 'color 0.3s ease'
                    }}>
                      {testimonial.content}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{
                          fontWeight: 600,
                          color: 'rgb(var(--text-primary))',
                          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
                        }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{
                          color: 'rgb(var(--text-secondary))',
                          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
                        }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </TestimonialCard>
                </motion.div>
              </Box>
            ))}

            {/* Duplicate testimonials for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <Box key={`duplicate-${testimonial.id}`} sx={{
                width: { xs: '100%', sm: '400px', md: '380px' },
                flex: '0 0 auto',
                mx: { xs: 0, sm: 1, md: 1.5 }
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <TestimonialCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          sx={{
                            color: i < testimonial.rating ? 'rgb(var(--warning))' : 'rgb(var(--base-300))',
                            fontSize: '1.2rem',
                            mr: 0.5,
                            transition: 'color 0.3s ease',
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{
                      color: 'rgb(var(--text-secondary))',
                      mb: 3,
                      fontStyle: 'italic',
                      lineHeight: 1.8,
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      transition: 'color 0.3s ease'
                    }}>
                      {testimonial.content}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{
                          fontWeight: 600,
                          color: 'rgb(var(--text-primary))',
                          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
                        }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{
                          color: 'rgb(var(--text-secondary))',
                          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
                        }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </TestimonialCard>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

export default Testimonials;
