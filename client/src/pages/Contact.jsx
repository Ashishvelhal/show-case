import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
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
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Have questions? We'd love to hear from you.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContactCard>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
          <Grid item xs={12} md={6}>
            <ContactCard sx={{ backgroundColor: '#f8f9fa' }}>
              <Box mb={4}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Get in Touch
                </Typography>
                <Typography color="textSecondary" mb={4}>
                  Have a project in mind or want to make an inquiry? Feel free to reach out to us.
                </Typography>
              </Box>
              
              <Box mb={3} display="flex" alignItems="center">
                <Email color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography>contact@neonshowcase.com</Typography>
                </Box>
              </Box>
              
              <Box mb={3} display="flex" alignItems="center">
                <Phone color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography>+1 (555) 123-4567</Typography>
                </Box>
              </Box>
              
              <Box display="flex" alignItems="flex-start">
                <LocationOn color="primary" sx={{ mr: 2, mt: 0.5, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Location</Typography>
                  <Typography>123 Neon Street<br />Tech City, TC 12345<br />United States</Typography>
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
