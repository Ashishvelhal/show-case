import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgb(var(--base-100))',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(var(--base-200), 0.5)',
    '& fieldset': {
      borderColor: 'rgb(var(--border-color))',
    },
    '&:hover fieldset': {
      borderColor: 'rgb(var(--primary))',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(var(--primary))',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgb(var(--text-secondary))',
    fontWeight: 500,
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    '&.Mui-focused': {
      color: 'rgb(var(--primary))',
    },
  },
}));

const CartForm = ({ open, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    primaryNumber: '',
    secondaryNumber: '',
    address: '',
    landmark: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.primaryNumber.trim()) {
      newErrors.primaryNumber = 'Primary number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.primaryNumber.replace(/\s/g, ''))) {
      newErrors.primaryNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.secondaryNumber && !/^[6-9]\d{9}$/.test(formData.secondaryNumber.replace(/\s/g, ''))) {
      newErrors.secondaryNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.landmark.trim()) {
      newErrors.landmark = 'Landmark is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data to send to parent component
      const cartData = {
        product: {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        customer: formData,
        orderDate: new Date().toISOString()
      };

      // Call the parent's onSubmit function
      await onSubmit(cartData);

      // Show success message (you can use a toast notification library)
      alert('Product purchased successfully!');

      // Reset form and close
      setFormData({
        fullName: '',
        primaryNumber: '',
        secondaryNumber: '',
        address: '',
        landmark: '',
        pincode: ''
      });
      onClose();
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('Failed to process purchase. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        fullName: '',
        primaryNumber: '',
        secondaryNumber: '',
        address: '',
        landmark: '',
        pincode: ''
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }
      }}
    >
      <FormContainer>
        <DialogTitle sx={{
          textAlign: 'center',
          pb: 2,
          fontWeight: 700,
          color: 'rgb(var(--text-primary))',
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
        }}>
          Delivery Information
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ px: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Primary Number *"
                  value={formData.primaryNumber}
                  onChange={handleChange('primaryNumber')}
                  error={!!errors.primaryNumber}
                  helperText={errors.primaryNumber}
                  placeholder="Enter 10-digit mobile number"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Secondary Number"
                  value={formData.secondaryNumber}
                  onChange={handleChange('secondaryNumber')}
                  error={!!errors.secondaryNumber}
                  helperText={errors.secondaryNumber}
                  placeholder="Enter 10-digit mobile number (optional)"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address *"
                  value={formData.address}
                  onChange={handleChange('address')}
                  error={!!errors.address}
                  helperText={errors.address}
                  placeholder="Enter your complete address"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Landmark *"
                  value={formData.landmark}
                  onChange={handleChange('landmark')}
                  error={!!errors.landmark}
                  helperText={errors.landmark}
                  placeholder="Nearby landmark for easy delivery"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Pincode *"
                  value={formData.pincode}
                  onChange={handleChange('pincode')}
                  error={!!errors.pincode}
                  helperText={errors.pincode}
                  placeholder="Enter 6-digit pincode"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(var(--primary), 0.05)', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgb(var(--text-secondary))', mb: 1 }}>
                <strong>Product Details:</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgb(var(--text-secondary))' }}>
                {product?.name} - {product?.price}
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{
            pt: 2,
            gap: 2,
            justifyContent: 'center'
          }}>
            <Button
              onClick={handleClose}
              disabled={isSubmitting}
              variant="outlined"
              sx={{
                minWidth: 120,
                borderRadius: '25px',
                textTransform: 'none',
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                minWidth: 120,
                background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                color: 'white',
                borderRadius: '25px',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)',
                  opacity: 0.9,
                },
                '&:disabled': {
                  background: 'rgba(var(--primary), 0.5)',
                },
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif'
              }}
            >
              {isSubmitting ? 'Processing Purchase...' : 'Buy Now'}
            </Button>
          </DialogActions>
        </form>
      </FormContainer>
    </Dialog>
  );
};

export default CartForm;
