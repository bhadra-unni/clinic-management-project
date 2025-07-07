import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import axios from '../axios';


const DoctorHome = () => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialization: '',
    upcomingAppointments: 0,
    patientsTreated: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchDoctorDetails = async () => {
    const doctorId = localStorage.getItem('doctorId');
    if (!doctorId) {
      setError("Doctor ID not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const doctorRes = await axios.get(`/api/doctors/dashboard/${doctorId}`);
      const doctorName = doctorRes.data.name;
      const specialization = doctorRes.data.specialization;

      const apptRes = await axios.get(`/appointments/doctor/${doctorName}`);

      const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

      const todaysAppointments = apptRes.data.filter(appt =>
        appt.status === 'Confirmed' &&
        new Date(appt.date).toISOString().split('T')[0] === today
      );

      const treatedPatients = apptRes.data.filter(appt =>
        appt.status === 'Completed'
      );

      setDoctorData({
        name: doctorName,
        specialization,
        upcomingAppointments: todaysAppointments.length,
        patientsTreated: treatedPatients.length,
      });
    } catch (err) {
      console.error("Error fetching doctor dashboard:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  fetchDoctorDetails();
}, []);


  const stats = [
    { label: 'Upcoming Appointments', value: doctorData.upcomingAppointments, icon: <EventNoteIcon /> },
    { label: 'Patients Treated', value: doctorData.patientsTreated, icon: <PersonIcon /> },
    { label: 'Specialization', value: doctorData.specialization, icon: <LocalHospitalIcon /> },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={5} mx={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome, Dr. {doctorData.name || '...'} 👨‍⚕️
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
