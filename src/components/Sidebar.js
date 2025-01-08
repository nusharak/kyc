import React from 'react'; 
import { Drawer, List, ListItem, ListItemText, Toolbar, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  activeListItem: {
    backgroundColor: 'blue',
    color: 'white',
  },
  header: {
    backgroundColor: '#1976d2',  // Set the background color of the top portion
    height: 58,               // Adjust height as needed
  }
}));

function Sidebar() {
  const classes = useStyles();
  const location = useLocation(); // To highlight the active link

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar className={classes.header} />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <Link to="/admin-dashboard/dashboard" className={classes.link}>
            <ListItem
              button
              className={`${classes.listItem} ${location.pathname === '/admin-dashboard/dashboard' ? classes.activeListItem : ''}`}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/admin-dashboard/kyc-applications" className={classes.link}>
            <ListItem
              button
              className={`${classes.listItem} ${location.pathname === '/admin-dashboard/kyc-applications' ? classes.activeListItem : ''}`}
            >
              <ListItemText primary="KYC Applications" />
            </ListItem>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
