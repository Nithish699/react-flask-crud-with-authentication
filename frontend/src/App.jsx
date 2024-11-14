import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Table from './components/Table';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { FaRegHandPeace } from 'react-icons/fa';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Toaster />

      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            authUser ? (
              <>
                <Navbar />
                <Box
                  component="main"
                  sx={{
                    flex: 1,
                    mt: 4,
                    mb: 2,
                  }}
                >
                  <Container>
                    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <FaRegHandPeace style={{ marginRight: '8px', color: '#3f51b5' }} />
                      Welcome to the Product Section
                    </Typography>
                    <Table />
                  </Container>
                </Box>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />

        {/* Login route */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </Box>
  );
}

export default App;
