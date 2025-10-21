import React, { useState } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../components/common/apiConfig';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import Swal from 'sweetalert2';

const ContactSection = styled(Box)({
  padding: '6rem 0',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
});

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
}));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.INQUIRIES), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        await Swal.fire({
          title: 'Success!',
          text: 'Your inquiry has been submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        await Swal.fire({
          title: 'Error',
          text: data.message || 'Failed to submit inquiry.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Network error. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <ContactSection>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h2" 
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(90deg, #0af, #a0f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>
            Have questions? We'd love to hear from you.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <ContactCard>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      multiline
                      rows={6}
                      required
                    />
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      sx={{
                        background: 'linear-gradient(45deg, #0af 0%, #a0f 100%)',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 5px 15px rgba(0, 170, 255, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </ContactCard>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <ContactCard sx={{ backgroundColor: '#f8f9fa' }}>
              <Box mb={4}>
                <Typography variant="h5" fontWeight="bold" mb={3} sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>
                  Get in Touch
                </Typography>
                <Typography color="textSecondary" mb={4} sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>
                  Have a project in mind or want to make an inquiry? Feel free to reach out to us.
                </Typography>
              </Box>
              
              <Box mb={3} display="flex" alignItems="center">
                <Email color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>Email</Typography>
                  <Typography sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>contact@neonshowcase.com</Typography>
                </Box>
              </Box>
              
              <Box mb={3} display="flex" alignItems="center">
                <Phone color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>Phone</Typography>
                  <Typography sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>+1 (555) 123-4567</Typography>
                </Box>
              </Box>
              
              <Box display="flex" alignItems="flex-start">
                <LocationOn color="primary" sx={{ mr: 2, mt: 0.5, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>Location</Typography>
                  <Typography sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>123 Neon Street<br />Tech City, TC 12345<br />United States</Typography>
                </Box>
              </Box>
            </ContactCard>
          </Grid>
        </Grid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
