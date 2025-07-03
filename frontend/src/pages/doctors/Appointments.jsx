import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Paper, Snackbar, Alert
} from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      const doctorId = localStorage.getItem('doctorId');
      if (!doctorId) return console.warn("No doctorId in localStorage");

      try {
        const doctorRes = await axios.get(`http://localhost:3000/api/doctors/dashboard/${doctorId}`);
        const doctorName = doctorRes.data.name;

        const apptRes = await axios.get(`http://localhost:3000/appointments/doctor/${doctorName}`);
        setAppointments(apptRes.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
      setAppointments(prev =>
        prev.map(appt =>
          appt._id === id ? { ...appt, status: 'Cancelled' } : appt
        )
      );
      setSnackbar({ open: true, message: res.data.message, severity: 'success' });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to cancel appointment',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Appointments
      </Typography>

      <Paper sx={{ overflowX: 'auto', borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Patient</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt._id}>
                <TableCell>{appt.patientName}</TableCell>
                <TableCell>{appt.department}</TableCell>
                <TableCell>
                  {dayjs(appt.date).isValid()
                    ? dayjs(appt.date).format('DD-MM-YYYY')
                    : 'Invalid date'}
                </TableCell>
                <TableCell sx={{ color: appt.status === 'Cancelled' ? 'red' : 'green' }}>
                  {appt.status}
                </TableCell>
                <TableCell>
                  {appt.status === 'Confirmed' ? (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleCancel(appt._id)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      —
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Snackbar for cancel success/error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Appointments;
