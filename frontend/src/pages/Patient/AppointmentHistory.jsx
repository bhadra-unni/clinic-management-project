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
    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:3000/appointments');
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (_id) => {
    try {
      await fetch(`http://localhost:3000/appointments/cancel/${_id}`, {
        method: 'PUT',
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === _id ? { ...appt, status: 'Cancelled' } : appt
        )
      );
    } catch (err) {
      console.error('Failed to cancel:', err);
    }
  };

  const canCancelAppointment = (dateStr) => {
    const appointmentDate = dayjs(dateStr, ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM-DD-YYYY']);
    const now = dayjs();
    return appointmentDate.isAfter(now.add(24, 'hour'));
  };

  const isPastAppointment = (dateStr) => {
    const appointmentDate = dayjs(dateStr, ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM-DD-YYYY']);
    return appointmentDate.isBefore(dayjs(), 'day');
  };

  const upcomingAppointments = appointments.filter(appt => !isPastAppointment(appt.date));
  const pastAppointments = appointments.filter(appt => isPastAppointment(appt.date));

  const renderTable = (data, title) => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Doctor</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((appt) => (
              <TableRow key={appt._id}>
                <TableCell>{appt.doctor}</TableCell>
                <TableCell>{appt.department}</TableCell>
                <TableCell>
                  {dayjs(appt.date, ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM-DD-YYYY'], true).isValid()
                    ? dayjs(appt.date, ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM-DD-YYYY']).format('DD MMM YYYY')
                    : 'Invalid date'}
                </TableCell>
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
                  {appt.status === 'Confirmed' && !isPastAppointment(appt.date) && canCancelAppointment(appt.date) && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleCancel(appt._id)}
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
    </Box>
  );

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
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: '#1976d2' }}
        >
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
          <>
            {upcomingAppointments.length > 0 && renderTable(upcomingAppointments, 'Upcoming Appointments')}
            {pastAppointments.length > 0 && renderTable(pastAppointments, 'Past Appointments')}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AppointmentHistory;
