import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Link, InputAdornment, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';  
import VpnKeyIcon from '@mui/icons-material/VpnKey';  
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';  
import useLogin from '../hooks/useLogin';

function Login() {
  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { login, loading, error } = useLogin();
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const result = await login(username, password);
    if (!result.success) {
      setFormData({ username: '', password: '' });
    }
  };


  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          padding: { xs: 3, sm: 4 }, 
          border: '1px solid #ddd',
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: '#f9f9f9',
          width: '100%', 
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'primary.main',
            width: 50,
            height: 50,
            margin: '0 auto',
            mb: 3,
          }}
        >
          <LockIcon sx={{ fontSize: 35, color: '#fff' }} />
        </Avatar>

        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: '#333', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Login
        </Typography>

        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
          variant="outlined"
          autoFocus
          name="username"
           autoComplete="off"
          value={formData.username}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 3 }}
          variant="outlined"
          name="password"
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mb: 2,
            py: { xs: 1, sm: 1.5 },
            fontSize: { xs: 14, sm: 16 },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Link href="/login" underline="hover" sx={{ color: 'primary.main', fontWeight: 600, mb: 2, display: 'block', fontSize: { xs: 12, sm: 14 } }}>
          Forgot Password?
        </Link>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 3,
            py: { xs: 1, sm: 1.5 },
            fontSize: { xs: 14, sm: 16 },
            fontWeight: 600,
            borderRadius: 2,
            borderColor: 'red', 
            color: 'red',      
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GoogleIcon sx={{ mr: 1, color: 'red' }} /> 
          Continue with Google
        </Button>

        {/* Signup link */}
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link href="/signup" underline="hover" sx={{ color: 'primary.main', fontWeight: 600 }}>
            Signup
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
