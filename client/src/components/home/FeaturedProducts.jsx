import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#fff',
}));

const SectionTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '3rem',
  fontWeight: 700,
  color: '#2d3748',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    margin: '1rem auto 0',
    borderRadius: '2px',
  },
});

const ProductCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '12px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
  },
});

const ProductImage = styled(CardMedia)({
  height: 250,
  width: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.1) 100%)',
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const ProductContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '1.5rem',
  minHeight: '180px',
  '& > *:last-child': {
    marginTop: 'auto',
  },
});

const products = [
  {
    id: 1,
    name: 'Ocean Wave Resin Art',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1629196916689-19c6a4c5b1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    name: 'Geode Resin Coaster Set',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1633613286848-e6b1caf7f7c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Galaxy Resin Tray',
    price: '$129',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
];

const FeaturedProducts = () => {
  return (
    <Section>
      <Container maxWidth="lg">
        <SectionTitle variant="h3" component="h2">
          Featured Creations
        </SectionTitle>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ display: 'flex' }}>
              <ProductCard>
                <ProductImage
                  component="img"
                  image={product.image}
                  title={product.name}
                  alt={product.name}
                />
                <ProductContent>
                  <Box sx={{ mb: 2, flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      {product.price}
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    sx={{
                      color: '#6a11cb',
                      borderColor: '#6a11cb',
                      '&:hover': {
                        backgroundColor: 'rgba(106, 17, 203, 0.05)',
                        borderColor: '#6a11cb',
                      },
                    }}
                  >
                    View Details
                  </Button>
                </ProductContent>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
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
            View All Products
          </Button>
        </Box>
      </Container>
    </Section>
  );
};

export default FeaturedProducts;