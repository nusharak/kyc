import React from 'react';
import { AppBar, Toolbar, Typography, Box, CssBaseline, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from './Sidebar';

const drawerWidth = 240;

function AdminLayout({ children }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" edge="end" sx={{ ml: 2 }} onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
