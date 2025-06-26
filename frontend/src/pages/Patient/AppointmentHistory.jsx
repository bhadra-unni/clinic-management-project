// src/pages/Patient/AppointmentHistory.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, CircularProgress
} from '@mui/material';
import dayjs from 'dayjs';
import doctorImg from '../../assets/image.jpg';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAppointments([
      {
        id: 1,
        doctor: 'Dr. Anita',
        date: '2025-06-28',
        time: '10:30 AM',
        status: 'Confirmed',
      },
    ]);
    setLoading(false);
  }, []);

  const handleCancel = (id) => {
    console.log(`Cancel appointment ID: ${id}`);
  };

  const isFutureDate = (dateStr) => dayjs(dateStr).isAfter(dayjs());

  return (
    <Box
      sx={{
        pt: 8,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.4)), url(${doctorImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          maxWidth: 1000,
          mx: 'auto',
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Appointment History
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : appointments.length === 0 ? (
          <Box textAlign="center" mt={6}>
            <Typography variant="h6" color="text.secondary">No appointments yet</Typography>
            <Typography variant="body2" color="text.secondary">
              Book your first appointment and it will show up here!
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Doctor</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell>{appt.doctor}</TableCell>
                    <TableCell>{dayjs(appt.date).format('DD MMM YYYY')}</TableCell>
                    <TableCell>{appt.time}</TableCell>
                    <TableCell>
                      <Typography color={
                        appt.status === 'Confirmed' ? 'green'
                        : appt.status === 'Pending' ? 'orange'
                        : 'red'
                      }>
                        {appt.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {appt.status === 'Confirmed' && isFutureDate(appt.date) && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleCancel(appt.id)}
                          sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default AppointmentHistory;
