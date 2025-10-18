import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductDetail from './ProductDetail';
import img1 from '../../assets/2.jpg';
import img2 from '../../assets/3.jpg';
import img3 from '../../assets/4.jpg';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: 'rgb(var(--base-100))',
  transition: 'background-color 0.3s ease',
}));

const SectionTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '3rem',
  fontWeight: 700,
  color: 'rgb(var(--text-primary))',
  position: 'relative',
  fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  transition: 'color 0.3s ease',
  '&::after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
    margin: '1rem auto 0',
    borderRadius: '2px',
    transition: 'background 0.3s ease',
  },
});

const ProductCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  minHeight: '400px', // Consistent minimum height for all cards
  maxWidth: '350px', // Consistent maximum width
  margin: '0 auto', // Center cards horizontally
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: 'rgb(var(--base-100))',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px rgba(var(--primary), 0.1)',
  },
});

const ProductImage = styled(CardMedia)({
  height: 200, // Fixed height for consistency
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
  backgroundColor: 'rgb(var(--base-100))',
  '& > *:last-child': {
    marginTop: 'auto',
  },
});

const products = [
  {
    id: 1,
    name: 'Ocean Wave Resin Art',
    price: '$149',
    image: img1,
  },
  {
    id: 2,
    name: 'Geode Resin Coaster Set',
    price: '$89',
    image: img2,
  },
  {
    id: 3,
    name: 'Galaxy Resin Tray',
    price: '$129',
    image: img3,
  },
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'unset';
  };

  return (
    <Section>
      <Container maxWidth="lg">
        <SectionTitle variant="h3" component="h2">
          Featured Creations
        </SectionTitle>
        <Grid container spacing={4} sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch' // Ensures all cards have same height
        }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{
              display: 'flex',
              minWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 21px)', lg: 'calc(25% - 24px)' },
              maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 21px)', lg: 'calc(25% - 24px)' }
            }}>
              <ProductCard>
                <ProductImage
                  component="img"
                  image={product.image}
                  title={product.name}
                  alt={product.name}
                />
                <ProductContent>
                  <Box sx={{ mb: 2, flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'rgb(var(--text-primary))',
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
                    }}>
                      {product.name}
                    </Typography>
                    <Typography variant="h6" sx={{
                      fontWeight: 700,
                      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
                    }}>
                      {product.price}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleViewDetails(product)}
                    sx={{
                      color: 'rgb(var(--primary))',
                      borderColor: 'rgb(var(--primary))',
                      '&:hover': {
                        backgroundColor: 'rgba(var(--primary), 0.05)',
                        borderColor: 'rgb(var(--primary))',
                      },
                      transition: 'all 0.3s ease',
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
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
    </Section>
  );
};

export default FeaturedProducts;