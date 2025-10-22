import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Breadcrumbs,
  Link,
  IconButton,
} from '@mui/material';
import { ArrowBack, Home } from '@mui/icons-material';
import { buildApiUrl, API_ENDPOINTS } from '../components/common/apiConfig';
import ProductDetail from '../components/home/ProductDetail';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: 'rgb(var(--base-100))',
  transition: 'background-color 0.3s ease',
  minHeight: '100vh',
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

const CategoryChip = styled(Chip)({
  marginBottom: '2rem',
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: 'rgba(var(--primary), 0.1)',
  color: 'rgb(var(--primary))',
  fontWeight: 600,
  fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
});

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

const BackButton = styled(Button)({
  marginBottom: '2rem',
  color: 'rgb(var(--primary))',
  borderColor: 'rgb(var(--primary))',
  '&:hover': {
    backgroundColor: 'rgba(var(--primary), 0.05)',
    borderColor: 'rgb(var(--primary))',
  },
  transition: 'all 0.3s ease',
});

const NoProductsMessage = styled(Box)({
  textAlign: 'center',
  padding: '4rem 2rem',
  color: 'rgb(var(--text-secondary))',
});

const ProductsByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}/${category}`));
        if (!response.ok) {
          throw new Error(`Failed to fetch products for category: ${category}`);
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products by category:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProductsByCategory();
    }
  }, [category]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const formatCategoryName = (categoryName) => {
    return categoryName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      sculptures: '#ff6b6b',
      paintings: '#4ecdc4',
      jewelry: '#45b7d1',
      pottery: '#f9ca24',
      textiles: '#f0932b',
      other: '#6c5ce7'
    };
    return colors[categoryName] || colors.other;
  };

  if (loading) {
    return (
      <Section>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Typography variant="h5" color="textSecondary">
              Loading products...
            </Typography>
          </Box>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Container maxWidth="lg">
          <BackButton
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBackToHome}
          >
            Back to Home
          </BackButton>
          <NoProductsMessage>
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1">
              {error}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                color: 'white',
              }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </NoProductsMessage>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container maxWidth="lg">
        <BackButton
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBackToHome}
        >
          Back to Home
        </BackButton>

        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            color="inherit"
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'rgb(var(--text-secondary))',
              '&:hover': { color: 'rgb(var(--primary))' }
            }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography color="textPrimary" sx={{ display: 'flex', alignItems: 'center' }}>
            Products
          </Typography>
          <Typography color="textPrimary">
            {formatCategoryName(category)}
          </Typography>
        </Breadcrumbs>

        <Box textAlign="center" mb={4}>
          <SectionTitle variant="h3" component="h1">
            {formatCategoryName(category)} Collection
          </SectionTitle>
          <CategoryChip
            label={`${products.length} ${products.length === 1 ? 'Product' : 'Products'} Available`}
            sx={{
              backgroundColor: `${getCategoryColor(category)}20`,
              color: getCategoryColor(category),
            }}
          />
        </Box>

        {products.length === 0 ? (
          <NoProductsMessage>
            <Typography variant="h4" gutterBottom>
              No Products Found
            </Typography>
            <Typography variant="body1" gutterBottom>
              There are currently no products in the {formatCategoryName(category)} category.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBackToHome}
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                color: 'white',
              }}
            >
              Browse All Products
            </Button>
          </NoProductsMessage>
        ) : (
          <Grid container spacing={4} sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'stretch'
          }}>
            {products.map((product) => (
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
        )}
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

export default ProductsByCategory;
