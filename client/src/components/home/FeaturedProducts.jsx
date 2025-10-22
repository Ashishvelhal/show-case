import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { buildApiUrl, API_ENDPOINTS } from '../common/apiConfig';
import ProductDetail from './ProductDetail';

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

const CategoryFilter = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
  marginBottom: '2rem',
});

const CategoryChip = styled(Chip)(({ theme, active }) => ({
  cursor: 'pointer',
  fontWeight: 500,
  fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  transition: 'all 0.3s ease',
  backgroundColor: active ? 'rgb(var(--primary))' : 'rgba(var(--primary), 0.1)',
  color: active ? 'white' : 'rgb(var(--primary))',
  '&:hover': {
    backgroundColor: active ? 'rgb(var(--primary))' : 'rgba(var(--primary), 0.15)',
    transform: 'translateY(-2px)',
  },
}));

const ProductCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  minHeight: '400px',
  maxWidth: '350px',
  margin: '0 auto',
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
  height: 200,
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

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS));
        const data = await response.json();
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [products, selectedCategory]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleViewCategoryProducts = (category) => {
    navigate(`/products/${category}`);
  };

  const formatCategoryName = (category) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Section>
      <Container maxWidth="lg">
        <SectionTitle variant="h3" component="h2">
          Featured Creations
        </SectionTitle>

        {/* Category Filter */}
        <CategoryFilter>
          <CategoryChip
            label="All Products"
            active={selectedCategory === 'all'}
            onClick={() => handleCategoryClick('all')}
          />
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={formatCategoryName(category)}
              active={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </CategoryFilter>

        <Grid container spacing={4} sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}>
          {filteredProducts.slice(0, 8).map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id} sx={{
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
                      ${product.price}
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
          {/* Category-specific buttons */}
          {categories.slice(0, 3).map((category) => (
            <Button
              key={category}
              variant="outlined"
              size="large"
              onClick={() => handleViewCategoryProducts(category)}
              sx={{
                color: 'rgb(var(--primary))',
                borderColor: 'rgb(var(--primary))',
                px: 3,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 600,
                ml: 2,
                '&:hover': {
                  backgroundColor: 'rgba(var(--primary), 0.05)',
                  borderColor: 'rgb(var(--primary))',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              View {formatCategoryName(category)}
            </Button>
          ))}
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