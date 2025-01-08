import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header({ onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          KYC Dashboard
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
