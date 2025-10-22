import React, { useState, useEffect } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../components/common/apiConfig';
import {
  Box, Typography, TextField, Button, Card, CardContent, CardActions,
  Grid, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Fab, InputAdornment, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add, Edit, Delete, Image } from '@mui/icons-material';

const Settings = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    details: '',
    category: '',
    image: '',
    dimensions: '',
    materials: ''
  });

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS));
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.CATEGORIES_MANAGEMENT));
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.price || !formData.details || !formData.category) {
      alert('Please fill in all required fields including category');
      return;
    }

    try {
      if (editingProduct) {
        // Update product
        await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS) + '/' + editingProduct._id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new product
        await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setOpen(false);
      setFormData({
        name: '',
        price: '',
        details: '',
        category: '',
        image: '',
        dimensions: '',
        materials: ''
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS) + '/' + id, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      price: '',
      details: '',
      category: '',
      image: '',
      dimensions: '',
      materials: ''
    });
    setEditingProduct(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      {categories.length === 0 && (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'warning.light', borderRadius: 1, color: 'warning.dark' }}>
          <Typography variant="body1">
            No categories available. Please go to the Categories section in the dashboard to create categories first.
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
            <Card>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                  Category: {product.category || 'No category'}
                </Typography>
                <Typography variant="body2">{product.details}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(product)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(product._id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Add />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={formData.price}
            onChange={handleChange('price')}
            fullWidth
            margin="normal"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            label="Details"
            value={formData.details}
            onChange={handleChange('details')}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={handleChange('category')}
              label="Category"
              disabled={categories.length === 0}
              required
            >
              <MenuItem value="">
                <em>{categories.length === 0 ? 'Loading categories...' : 'Select a category'}</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              {/* Show current category if it's not in the list (for editing existing products) */}
              {formData.category && !categories.some(cat => cat.name === formData.category) && (
                <MenuItem value={formData.category} disabled>
                  {formData.category} (current)
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            label="Dimensions"
            value={formData.dimensions}
            onChange={handleChange('dimensions')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Materials"
            value={formData.materials}
            onChange={handleChange('materials')}
            fullWidth
            margin="normal"
          />
          <Button
            variant="outlined"
            component="label"
            startIcon={<Image />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </Button>
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              style={{ width: '100%', marginTop: 16 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
