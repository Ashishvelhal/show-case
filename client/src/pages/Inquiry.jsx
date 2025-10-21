import React, { useState, useEffect } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../components/common/apiConfig';
import { Box, Typography, List, ListItem, ListItemText, Paper, CircularProgress, Alert } from '@mui/material';

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.INQUIRIES), {
          credentials: 'include', // Include cookies for auth
          headers: {
            'Authorization': `Bearer ${token}`, // Also send token in header as backup
          },
        });
        const data = await response.json();
        if (response.ok) {
          setInquiries(data);
        } else {
          setError(data.message || 'Failed to fetch inquiries.');
        }
      } catch (err) {
        setError('Network error.');
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inquiries
      </Typography>
      {inquiries.length === 0 ? (
        <Typography variant="body1">No inquiries found.</Typography>
      ) : (
        <List>
          {inquiries.map((inquiry) => (
            <ListItem key={inquiry._id}>
              <ListItemText
                primary={`${inquiry.name} (${inquiry.email})`}
                secondary={inquiry.message}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Inquiry;
