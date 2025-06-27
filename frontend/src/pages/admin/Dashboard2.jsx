import React from 'react';
import {
  Box, Grid, Typography, Card, CardContent, CircularProgress
} from '@mui/material';
import { Group, Person, EventNote } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  // Simulated data (replace with props/context/api)
  const doctorList = [ ]; // 0 doctors
  const patientList = [{}] // 0 patients
  const appointmentList = []; // No appointments yet

  // Calculate percentages
  const total = doctorList.length + patientList.length + appointmentList.length || 1;

  const cardData = [
    {
      icon: <Group sx={{ fontSize: 50, color: '#5A5AFA' }} />,
      title: 'Total Doctors',
      value: doctorList.length,
      percent: Math.round((doctorList.length / total) * 100),
      path: '/admin/doctor-list',
    },
    {
      icon: <Person sx={{ fontSize: 50, color: '#5A5AFA' }} />,
      title: 'Total Patients',
      value: patientList.length,
      percent: Math.round((patientList.length / total) * 100),
      path: '/admin/patient-list',
    },
    {
      icon: <EventNote sx={{ fontSize: 50, color: '#5A5AFA' }} />,
      title: 'Appointment',
      value: appointmentList.length,
      percent: 0,
      path: '/admin/appointment-details',
    }
  ];

  return (
   <AdminLayout>
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                textAlign: 'center',
                py: 4,
                cursor: 'pointer',
                borderRadius: 3,
                transition: '0.3s',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.03)',
                },
              }}
              onClick={() => navigate(card.path)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {card.title}
                </Typography>

                <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                  {card.value}
                </Typography>

                {/* Circular percentage progress */}
                <Box sx={{ position: 'relative', display: 'inline-flex', mt: 1 }}>
                  <CircularProgress
                    variant="determinate"
                    value={card.percent}
                    size={80}
                    thickness={5}
                    sx={{ color: '#5A5AFA' }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      {card.percent}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </AdminLayout>   
  );
};

export default Dashboard;
