import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard, CalendarToday, Info, Menu, Logout
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, link: '/doctor/dashboard' },
  { text: 'Appointments', icon: <CalendarToday />, link: '/doctor/appointments' },
  { text: 'Prescriptions', icon: <Info />, link: '/doctor/prescriptions' },
];

const DoctorDashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    navigate('/login/doctor');
  };

  const drawerContent = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2, color: '#ffffff', fontWeight: 'bold', fontFamily: 'Segoe UI' }}
      >
        Doctor Panel
      </Typography>
      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        {navItems.map(({ text, icon, link }) => (
          <ListItem button key={text} component={Link} to={link}>
            <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ color: 'white', fontFamily: 'Segoe UI', fontSize: '0.95rem' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', fontFamily: 'Segoe UI', backgroundColor: '#f4f7fc', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#1a73e8',
          fontFamily: 'Segoe UI',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Welcome Doctor!
          </Typography>
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ ml: 2, fontWeight: 'bold' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation drawer"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: '#1a73e8',
              color: 'white',
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f4f7fc',
        }}
      >
        <Toolbar /> {/* spacer */}
        {children}
      </Box>
    </Box>
  );
};

export default DoctorDashboard;



