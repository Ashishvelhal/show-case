import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Toolbar,
  InputAdornment,
  Tooltip,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { buildApiUrl, API_ENDPOINTS } from '../components/common/apiConfig';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(API_ENDPOINTS.CATEGORIES_MANAGEMENT));
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      showSnackbar('Error fetching categories', 'error');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [categories, searchTerm]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setEditingCategory(null);
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name });
    } else {
      resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const handleInputChange = (value) => {
    setFormData({ name: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCategory
        ? buildApiUrl(`${API_ENDPOINTS.CATEGORIES_MANAGEMENT}/${editingCategory._id}`)
        : buildApiUrl(API_ENDPOINTS.CATEGORIES_MANAGEMENT);

      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save category');

      showSnackbar(
        `Category ${editingCategory ? 'updated' : 'created'} successfully`,
        'success'
      );
      handleCloseDialog();
      fetchCategories();
    } catch (error) {
      showSnackbar('Error saving category', 'error');
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(
        buildApiUrl(`${API_ENDPOINTS.CATEGORIES_MANAGEMENT}/${category._id}`),
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete category');

      showSnackbar('Category deleted successfully', 'success');
      fetchCategories();
    } catch (error) {
      showSnackbar('Error deleting category', 'error');
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Category Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your product categories by adding, editing, and removing category names.
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Total Categories: <Chip label={categories.length} color="primary" size="small" />
        </Typography>
      </Box>

      {/* Toolbar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Toolbar sx={{ px: 0 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ mr: 2 }}
          >
            Add Category
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <TextField
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Toolbar>
      </Paper>

      {/* Categories Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell><strong>Category Name</strong></TableCell>
              <TableCell><strong>Created</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Loading categories...
                </TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  {searchTerm ? 'No categories match your search' : 'No categories found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category._id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {category.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(category)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(category)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => handleInputChange(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Categories;
