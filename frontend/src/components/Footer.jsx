import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#3f51b5',
        color: 'white',
        py: 4,
        mt: 'auto',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ borderColor: 'white', mb: 2 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
          }}
        >
          <img
            src="/Python.svg.png"
            alt="Python Logo"
            style={{ width: 30, height: 30 }}
          />
          <img
            src="/react.png"
            alt="React Logo"
            style={{ width: 30, height: 30 }}
          />
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{
            fontWeight: 500,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          © 2024 Sean Joerick Macarayo. Aspiring Developer. All rights reserved.
        </Typography>

        <Typography
          variant="caption"
          align="center"
          sx={{
            display: 'block',
            fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
            opacity: 0.7,
            mt: 1, 
          }}
        >
          Built with passion and learning every day.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
