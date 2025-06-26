// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react';
import {
  Box, Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText,
  AppBar, Typography, IconButton, Snackbar, Alert
} from '@mui/material';
import {
  Dashboard as DashboardIcon, People as PeopleIcon, ListAlt as ListAltIcon,
  PersonAdd as PersonAddIcon, Mail as MailIcon, Settings as SettingsIcon,
  Logout as LogoutIcon, Menu as MenuIcon
} from '@mui/icons-material';

import AddDoctor from './AddDoctor';
import DoctorList from './DoctorList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('addDoctor');
  const [doctors, setDoctors] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [mobileOpen, setMobileOpen] = useState(false);

  const showSnackbar = (msg, severity) => {
    setSnackbarMessage(msg);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleLogout = () => {
    showSnackbar("Logged out", "info");
    setTimeout(() => console.log("Logged out"), 1500);
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, tab: 'dashboard' },
    { text: 'Doctor List', icon: <PeopleIcon />, tab: 'doctorList' },
    { text: 'Add Doctor', icon: <PersonAddIcon />, tab: 'addDoctor' },
    { text: 'Appointments', icon: <ListAltIcon />, tab: 'appointments' },
    { text: 'Messages', icon: <MailIcon />, tab: 'messages' },
    { text: 'Settings', icon: <SettingsIcon />, tab: 'settings' },
  ];

  const drawerContent = (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', height: '100%' }}>
      <Toolbar />
      <List>
        {navItems.map(item => (
          <ListItem button key={item.text} selected={activeTab === item.tab} onClick={() => {
            setActiveTab(item.tab);
            setMobileOpen(false);
          }}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
          <IconButton color="inherit" onClick={handleLogout}><LogoutIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: 240 } }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: 240 } }}
        open
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, width: { sm: `calc(100% - 240px)` } }}>
        {activeTab === 'addDoctor' && <AddDoctor doctors={doctors} setDoctors={setDoctors} showSnackbar={showSnackbar} />}
        {activeTab === 'doctorList' && <DoctorList doctors={doctors} />}
        {activeTab === 'dashboard' && <Typography align="center" variant="h4">Welcome to Dashboard</Typography>}
        {/* Add more tab views here */}
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
