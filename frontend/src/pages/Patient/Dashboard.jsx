import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Logout } from '@mui/icons-material';
import doctorImg from '../../assets/image.jpg';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Book Appointment',
    description: 'Schedule visits with your preferred doctor.',
    icon: <CalendarMonthIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    link: '/patient/book',
  },
  {
    title: 'View Prescriptions',
    description: 'Access your medication records and advice.',
    icon: <AssignmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    link: '/patient/prescriptions',
  },
  {
    title: 'Medical History',
    description: 'Keep track of your appointments and treatments.',
    icon: <MedicalServicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    link: '/patient/history',
  },
];

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUser(storedUser);
  }, []);

  const navbarHeight = 64;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    navigate('/login/patient')
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: '#ffffffdd',
          color: '#1976d2',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', height: `${navbarHeight}px` }}>
          <Typography variant="h5" fontWeight="bold">
            ClinicCare+
          </Typography>
          <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          pt: `calc(${navbarHeight}px + 100px)`,
          justifyContent: 'flex-start',
          px: { xs: 3, md: 10 },
          pb: { xs: 8, md: 10 },
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.85), rgba(255,255,255,0.4)), url(${doctorImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          width: '100%',
        }}
      >
        <Box sx={{ maxWidth: 600, mt: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
            Welcome back{user.name ? `, ${user.name}` : ''} 👋
          </Typography>
          <Typography variant="h5" fontWeight="medium" gutterBottom color="text.secondary">
            Your health records are just a click away.
          </Typography>
          <Typography variant="body1" mb={3}>
            Book appointments, manage your prescriptions, and access your medical history with ease.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" href="/patient/book">
              Book Now
            </Button>
            <Button variant="outlined" color="primary" href="/patient/history">
              View History
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Feature Cards */}
      <Box sx={{ py: 6, px: { xs: 2, md: 10 }, backgroundColor: '#f0f8ff' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                width: 260,
                height: 260,
                p: 2,
                borderRadius: 4,
                boxShadow: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box mb={1}>{feature.icon}</Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                href={feature.link}
                size="small"
                sx={{ alignSelf: 'center', mb: 1 }}
              >
                GO
              </Button>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
