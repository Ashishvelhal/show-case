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
  position: 'relative',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
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

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <Typography variant="body1" sx={{ color: 'rgb(var(--text-secondary))', mb: 3, fontStyle: 'italic', lineHeight: 1.8, transition: 'color 0.3s ease' }}>
                    {testimonial.content}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'rgb(var(--text-primary))' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgb(var(--text-secondary))' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </TestimonialCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Testimonials;
