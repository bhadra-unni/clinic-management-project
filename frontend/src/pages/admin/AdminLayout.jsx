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
  Dashboard, People, CalendarToday, AddCircle, Mail, Settings, Menu, Logout
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, link: '/admin/dashboard' },
  { text: 'Doctor List', icon: <People />, link: '/admin/doctor-list' },
  { text: 'Patient List', icon: <People />, link: '/admin/patient-list' },
  { text: 'Appointment Details', icon: <CalendarToday />, link: '/admin/appointment-details' },
  { text: 'Add Doctor', icon: <AddCircle />, link: '/admin/add-doctor' },
  { text: 'Messages', icon: <Mail />, link: '/admin/messages' }
];

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
navigate("/login/admin");

  };

  const drawerContent = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
        Clinic Management
      </Typography>
      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        {navItems.map(({ text, icon, link }) => (
          <ListItem button key={text} component={Link} to={link}>
            <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} sx={{color: 'white'}}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" component="div">
            Welcome Admin!
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
              backgroundColor: '#1976d2',
              color: 'white',
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
        }}
      >
        <Toolbar /> {/* spacer */}
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
