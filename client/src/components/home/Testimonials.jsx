import React from 'react';
import { Box, Typography, Container, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: '#fff',
  position: 'relative',
  overflow: 'hidden',
}));

const TestimonialCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '2.5rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
  height: '100%',
  position: 'relative',
  '&::before': {
    content: '"\\201C"',
    position: 'absolute',
    top: '1.5rem',
    left: '2rem',
    fontSize: '5rem',
    color: 'rgba(106, 17, 203, 0.1)',
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
                          color: i < testimonial.rating ? '#f59e0b' : '#e2e8f0',
                          fontSize: '1.2rem',
                          mr: 0.5
                        }} 
                      />
                    ))}
                  </Box>
                  <Typography variant="body1" color="textSecondary" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.8 }}>
                    {testimonial.content}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2d3748' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
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
