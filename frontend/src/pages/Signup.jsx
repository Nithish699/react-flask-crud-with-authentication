import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Link, InputAdornment, Avatar, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';  
import VpnKeyIcon from '@mui/icons-material/VpnKey';  
import LockIcon from '@mui/icons-material/Lock';  
import useSignup from '../hooks/useSignup';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gender: '',
  });
  const { signup, loading } = useSignup();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, gender } = formData;
    const result = await signup(username, password, gender);
    if (!result.success) {
      setFormData({
        username: '',
        password: '',
        gender: '',
      });
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
          Sign Up
        </Typography>
        
        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
          variant="outlined"
          name="username"
           autoComplete="off"
          value={formData.username}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 1,
              fontSize: { xs: 12, sm: 14 },
              backgroundColor: '#fff',
            },
          }}
        />
        
        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          variant="outlined"
          name="password"
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 1,
              fontSize: { xs: 12, sm: 14 },
              backgroundColor: '#fff',
            },
          }}
        />

        <FormControl fullWidth sx={{ mb: 2 }} required>
          <InputLabel>Gender</InputLabel>
          <Select
            value={formData.gender}
            label="Gender"
            name="gender"
            onChange={handleChange}
            sx={{
              backgroundColor: '#fff',
              fontSize: { xs: 12, sm: 14 },
              borderRadius: 1,
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

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
            position: 'relative'
          }}
          onClick={handleSubmit} 
          disabled={loading}
        >
          {loading ? (
            <CircularProgress/>
          ) : (
            'Sign Up'
          )}
        </Button>

        <Typography variant="body2">
          Already have an account?{' '}
          <Link href="/login" underline="hover" sx={{ color: 'primary.main', fontWeight: 600 }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signup;
