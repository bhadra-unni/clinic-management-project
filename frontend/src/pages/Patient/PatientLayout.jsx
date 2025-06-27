// src/pages/Patient/PatientLayout.jsx
import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, Typography, Drawer, List, ListItem,
  ListItemIcon, ListItemText, IconButton, Divider, Button,
  useTheme, useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  EventAvailable,
  History,
  Menu,
  Logout,
  Description,
} from '@mui/icons-material';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/patient/dashboard' },
  { text: 'Book Appointment', icon: <EventAvailable />, link: '/patient/book' },
  { text: 'View Appointments', icon: <History />, link: '/patient/history' },
  { text: 'Prescriptions', icon: <Description />, link: '/patient/prescriptions' },
];

const PatientLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/patient/dashboard';

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const drawerContent = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#1976d2', fontWeight: 'bold' }}>
        ClinicCare+
      </Typography>
      <Divider sx={{ backgroundColor: '#1976d2' }} />
      <List>
        {navItems.map(({ text, icon, link }) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={link}
            selected={location.pathname === link}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#e3f2fd',
                borderRadius: 2,
              },
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderRadius: 2,
              },
            }}
          >
            <ListItemIcon sx={{ color: '#1976d2' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} sx={{ color: '#1976d2' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#ffffffee',
          color: '#1976d2',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {!isDashboard && isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h5" component="div">
            ClinicCare+
          </Typography>
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {!isDashboard && (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="sidebar">
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'block' },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                backgroundColor: '#ffffff',
                borderRight: '1px solid #e0e0e0',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </Box>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: isDashboard ? '100%' : { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PatientLayout;
