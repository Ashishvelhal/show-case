import React from 'react';
import { Box, Typography, Button, Container, Grid, IconButton, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const DetailContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1300,
  overflowY: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const DetailContent = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgb(var(--base-100))',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '800px',
  maxHeight: '85vh',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
}));

const ProductGrid = styled(Grid)(({ theme }) => ({
  minHeight: '100%',
  '@media (min-width: 900px)': {
    display: 'grid',
    gridTemplateColumns: '5fr 7fr',
    '& > div:first-child': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(3),
      backgroundColor: 'rgb(var(--base-200))',
    },
    '& > div:last-child': {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3),
      overflowY: 'auto',
    }
  }
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 12,
  top: 12,
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: 'rgb(var(--text-primary))',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  // Extended product details
  const productDetails = {
    ...product,
    description: 'This beautiful handcrafted piece is made with the highest quality materials and attention to detail. Each piece is unique and made to order.',
    materials: 'Eco-resin, pigments, and natural elements',
    dimensions: '12" x 12" x 1.5"',
    careInstructions: 'Dust with a soft, dry cloth. Avoid direct sunlight and extreme temperatures.',
    shippingInfo: 'Ships within 5-7 business days. Free shipping on all orders over $100.',
  };

  return (
    <DetailContainer onClick={(e) => e.target === e.currentTarget && onClose()}>
      <DetailContent>
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>

        <ProductGrid>
          {/* Image Section - Left Side */}
          <Grid item xs={12} md={5} sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 0 },
            backgroundColor: 'rgb(var(--base-200))',
            borderRadius: { xs: '12px', md: '12px 0 0 12px' },
            minHeight: { xs: 'auto', md: '100%' }
          }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: { xs: '250px', md: '400px' },
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Grid>

          {/* Content Section - Right Side */}
          <Grid item xs={12} md={7} sx={{
            p: { xs: 2, md: 0 },
            overflowY: { xs: 'auto', md: 'auto' },
            maxHeight: { xs: '60vh', md: '100%' },
            display: { xs: 'block', md: 'block' }
          }}>
            <Typography variant="h5" component="h1" sx={{
              mb: 1.5,
              fontWeight: 700,
              color: 'rgb(var(--text-primary))'
            }}>
              {product.name}
            </Typography>

            <Typography variant="h6" sx={{
              mb: 2,
              fontWeight: 700,
              color: 'rgb(var(--primary))'
            }}>
              {product.price}
            </Typography>

            <Typography variant="body2" sx={{
              mb: 2,
              lineHeight: 1.6,
              color: 'rgb(var(--text-secondary))'
            }}>
              {productDetails.description}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{
                fontWeight: 600,
                mb: 0.5,
                color: 'rgb(var(--text-primary))'
              }}>
                Materials:
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgb(var(--text-secondary))' }}>
                {productDetails.materials}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{
                fontWeight: 600,
                mb: 0.5,
                color: 'rgb(var(--text-primary))'
              }}>
                Dimensions:
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgb(var(--text-secondary))' }}>
                {productDetails.dimensions}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: 'rgb(var(--border-color))' }} />

            <Box sx={{
              display: 'flex',
              gap: 1.5,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                  color: 'white',
                  py: 1.2,
                  borderRadius: '25px',
                  fontWeight: 600,
                  flex: 1,
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(var(--primary), 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                size="medium"
                sx={{
                  color: 'rgb(var(--primary))',
                  borderColor: 'rgb(var(--primary))',
                  py: 1.2,
                  borderRadius: '25px',
                  fontWeight: 600,
                  flex: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(var(--primary), 0.05)',
                    borderColor: 'rgb(var(--primary))',
                  },
                }}
              >
                Add to Wishlist
              </Button>
            </Box>

            <Box sx={{
              mt: 2,
              pt: 2,
              borderTop: '1px solid rgb(var(--border-color))',
              textAlign: 'center'
            }}>
              <Typography variant="caption" sx={{ color: 'rgb(var(--text-secondary))' }}>
                {productDetails.shippingInfo}
              </Typography>
            </Box>
          </Grid>
        </ProductGrid>
      </DetailContent>
    </DetailContainer>
  );
};

export default ProductDetail;
