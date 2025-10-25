import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Container,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Alert,
  Pagination,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { buildApiUrl, API_ENDPOINTS } from '../../components/common/apiConfig';

const ProductCard = styled(Card)(({ theme }) => ({
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
}));

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

const CategoryChip = styled(Chip)(({ theme, active }) => ({
  margin: '0 4px 8px 0',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: active ? 'primary.main' : 'grey.100',
  color: active ? 'white' : 'text.primary',
  '&:hover': {
    backgroundColor: active ? 'primary.dark' : 'grey.200',
    transform: 'scale(1.05)',
  },
}));

const FilterSection = styled(Box)({
  backgroundColor: 'background.paper',
  borderRadius: '12px',
  padding: '1.5rem',
  marginBottom: '2rem',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
});

const ShopCollection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch data
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS));
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.CATEGORIES_MANAGEMENT));
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => {
        const stripHtml = (html) => {
          const tmp = document.createElement("DIV");
          tmp.innerHTML = html;
          return (tmp.textContent || tmp.innerText || "").toLowerCase();
        };

        return product.name.toLowerCase().includes(searchLower) ||
               stripHtml(product.details).includes(searchLower) ||
               product.category.toLowerCase().includes(searchLower);
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleViewDetails = (product) => {
    navigate(`/products/${product.category}`, {
      state: { selectedProduct: product }
    });
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Extract unique categories from products
  const productCategories = [...new Set(products.map(product => product.category))];

  const formatCategoryName = (category) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Box textAlign="center">
          <Button variant="contained" onClick={fetchProducts} sx={{
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
          }}>
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Filters Section */}
      <FilterSection>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                {productCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {formatCategoryName(category)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="price-low">Price (Low to High)</MenuItem>
                <MenuItem value="price-high">Price (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} products found
            </Typography>
          </Grid>
        </Grid>
      </FilterSection>

      {/* Category Chips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterIcon sx={{ mr: 1 }} />
          Filter by Category
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <CategoryChip
            label="All Products"
            active={selectedCategory === 'all'}
            onClick={() => handleViewCategory('all')}
          />
          {productCategories.map((category) => (
            <CategoryChip
              key={category}
              label={formatCategoryName(category)}
              active={selectedCategory === category}
              onClick={() => handleViewCategory(category)}
            />
          ))}
        </Box>
      </Box>

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No products available at the moment'
            }
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
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
                          mb: 1,
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
                            background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                            color: 'white',
                            '&:hover': {
                              background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
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

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ShopCollection;
