import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Breadcrumbs,
  Link,
  Skeleton,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { buildApiUrl, API_ENDPOINTS } from '../../components/common/apiConfig';

const ProductCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  borderRadius: '16px',
  overflow: 'hidden',
  backgroundColor: 'background.paper',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
  },
});

const ProductImage = styled(CardMedia)({
  height: 250,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)',
  },
});

const ProductContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  '& > *:last-child': {
    marginTop: 'auto',
  },
});

const CategoryHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: '3rem',
  padding: '2rem',
  background: 'linear-gradient(135deg, rgba(var(--primary), 0.1) 0%, rgba(var(--secondary), 0.1) 100%)',
  borderRadius: '16px',
  border: '1px solid rgba(var(--primary), 0.2)',
});

const BackButton = styled(Button)({
  marginBottom: '1rem',
  color: 'rgb(var(--primary))',
  borderColor: 'rgb(var(--primary))',
  '&:hover': {
    backgroundColor: 'rgba(var(--primary), 0.05)',
    borderColor: 'rgb(var(--primary))',
  },
});

const ShopByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductsByCategory();
  }, [category]);

  const fetchProductsByCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`));
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

  const handleViewDetails = (product) => {
    navigate(`/shop/category/${product.category}`, {
      state: { selectedProduct: product }
    });
  };

  const handleBackToShop = () => {
    navigate('/shop');
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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <BackButton
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToShop}
        >
          Back to Shop
        </BackButton>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <BackButton
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToShop}
        >
          Back to Shop
        </BackButton>

        <Breadcrumbs sx={{ mb: 3 }}>
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
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/shop"
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' }
            }}
          >
            Shop
          </Link>
          <Typography color="textPrimary">{formatCategoryName(category)}</Typography>
        </Breadcrumbs>

        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Box textAlign="center">
          <Button variant="contained" onClick={fetchProductsByCategory}>
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <BackButton
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackToShop}
      >
        Back to Shop
      </BackButton>

      <Breadcrumbs sx={{ mb: 3 }}>
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
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          component={RouterLink}
          to="/shop"
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' }
          }}
        >
          Shop
        </Link>
        <Typography color="textPrimary">{formatCategoryName(category)}</Typography>
      </Breadcrumbs>

      <CategoryHeader>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${getCategoryColor(category)} 0%, ${getCategoryColor(category)}dd 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {formatCategoryName(category)} Collection
        </Typography>
        <Chip
          label={`${products.length} ${products.length === 1 ? 'Product' : 'Products'} Available`}
          sx={{
            backgroundColor: `${getCategoryColor(category)}20`,
            color: getCategoryColor(category),
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        />
        <Typography variant="body1" color="text.secondary" sx={{
          mt: 2,
          maxWidth: 600,
          mx: 'auto',
        }}>
          Explore our exclusive collection of {formatCategoryName(category).toLowerCase()}.
          Each piece is carefully crafted with attention to detail and artistic excellence.
        </Typography>
      </CategoryHeader>

      {products.length === 0 ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No Products Found
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            There are currently no products in the {formatCategoryName(category)} category.
          </Typography>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleBackToShop}
              sx={{
                background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                color: 'white',
              }}
            >
              Browse All Products
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                color: 'rgb(var(--primary))',
                borderColor: 'rgb(var(--primary))',
                '&:hover': {
                  backgroundColor: 'rgba(var(--primary), 0.05)',
                  borderColor: 'rgb(var(--primary))',
                },
              }}
            >
              Back to Home
            </Button>
          </Stack>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard>
                <ProductImage
                  component="img"
                  image={product.image}
                  title={product.name}
                  alt={product.name}
                />
                <ProductContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        minHeight: '3.3rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: 'rgb(var(--text-primary))',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                        minHeight: '2.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          '& p': { margin: 0, fontSize: 'inherit' },
                          '& h1, & h2, & h3, & h4, & h5, & h6': {
                            fontSize: 'inherit',
                            margin: 0,
                            fontWeight: 'bold'
                          },
                          '& ul, & ol': {
                            margin: 0,
                            paddingLeft: '1em'
                          },
                          '& blockquote': {
                            margin: 0,
                            fontStyle: 'italic'
                          }
                        }}
                        dangerouslySetInnerHTML={{
                          __html: product.details || 'No description available'
                        }}
                      />
                    </Typography>
                    <Chip
                      label={formatCategoryName(product.category)}
                      size="small"
                      sx={{
                        backgroundColor: `${getCategoryColor(product.category)}20`,
                        color: getCategoryColor(product.category),
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        fontFamily: 'monospace'
                      }}
                    >
                      ${product.price}
                    </Typography>
                    <Stack spacing={1}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleViewDetails(product)}
                        startIcon={<VisibilityIcon />}
                        sx={{
                          background: `linear-gradient(45deg, ${getCategoryColor(category)} 0%, ${getCategoryColor(category)}dd 100%)`,
                          color: 'white',
                          '&:hover': {
                            background: `linear-gradient(45deg, ${getCategoryColor(category)} 0%, ${getCategoryColor(category)}dd 100%)`,
                            opacity: 0.9,
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Stack>
                  </Box>
                </ProductContent>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ShopByCategory;
