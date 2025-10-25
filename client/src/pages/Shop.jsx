import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { Home } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Shop = () => {
  return (
    <Box sx={{ py: 4, minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography color="textPrimary">Shop</Typography>
        </Breadcrumbs>

        {/* Shop Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
            }}
          >
            Shop Collection
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our complete collection of handcrafted resin art. Browse by category or explore all our unique creations.
          </Typography>
        </Box>

        {/* Shop Content */}
        <Outlet />
      </Container>
    </Box>
  );
};

export default Shop;
