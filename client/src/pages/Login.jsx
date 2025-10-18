import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Tabs, Tab, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleModeChange = (event, newMode) => {
    setMode(newMode);
    setError(''); // Clear error when switching modes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      // API call for login
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); // Store the real JWT token
          await Swal.fire({
            title: 'Welcome back!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/dashboard');
        } else {
          setError(data.message || 'Login failed.');
        }
      } catch (err) {
        setError('Network error.');
      }
    } else if (mode === 'signup') {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      // Simulate signup logic (replace with actual API call)
      try {
        const payload = { fullName: name, email, password, adminSecret };
        console.log('Sending signup request:', payload); // Debug log
        const response = await fetch('http://localhost:3001/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName: name, email, password, adminSecret }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); // Store the real JWT token
          await Swal.fire({
            title: 'Success!',
            text: 'Account created successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/dashboard');
        } else {
          setError(data.message || 'Signup failed.');
        }
      } catch (err) {
        setError('Network error.');
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        padding: 2,
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, width: '100%', maxWidth: 450, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome
        </Typography>
        <Tabs
          value={mode}
          onChange={handleModeChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Login" value="login" />
          <Tab label="Sign Up" value="signup" />
        </Tabs>
        <Divider sx={{ mb: 3 }} />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <TextField
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          )}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {mode === 'signup' && (
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          )}
          {mode === 'signup' && (
            <TextField
              label="Admin Secret (optional)"
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
