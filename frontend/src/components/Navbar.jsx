import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../context/AuthContext';

function Navbar() {
  const { logout, loading } = useLogout();
  const { authUser } = useAuthContext();

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Avatar src={authUser.img_url} />
          {!isMobile && (
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              Hello, {authUser.username}!
            </Typography>
          )}
        </Box>
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={logout}
          disabled={loading}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
