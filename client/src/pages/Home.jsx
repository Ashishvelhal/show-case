import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AboutSection from '../components/home/AboutSection';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <Testimonials />
    </Box>
  );
};

export default Home;