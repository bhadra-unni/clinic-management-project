


import React from 'react';
import { Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';

const stats = [
  { label: 'Upcoming Appointments', value: 5, icon: <EventNoteIcon /> },
  { label: 'Patients Treated', value: 128, icon: <PersonIcon /> },
  { label: 'Specialization', value: 'Cardiology', icon: <LocalHospitalIcon /> },
];

const DoctorHome = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome, Dr. Sharma 👨‍⚕️
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'gray', mb: 4 }}>
        Here's a quick overview of your activity
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                backgroundColor: '#fff',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              }}
            >
              <Avatar sx={{ bgcolor: '#1a73e8', mr: 2 }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: '#e3f2fd',
            borderLeft: '6px solid #1a73e8',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Reminder 💡
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Don’t forget to check the patient notes before today's appointments.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DoctorHome;
