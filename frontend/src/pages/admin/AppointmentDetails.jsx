// src/pages/AppointmentDetails.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import AdminLayout from '../admin/AdminLayout';
import axios from 'axios';

const statusColors = {
  Pending: 'warning',
  Confirmed: 'success',
  Cancelled: 'error',
  Completed: 'info', 
};


const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
      setSnackbar({ open: true, message: 'Failed to fetch appointments', severity: 'error' });
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
      setSnackbar({ open: true, message: 'Appointment cancelled successfully', severity: 'success' });
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setSnackbar({ open: true, message: 'Failed to cancel appointment', severity: 'error' });
    }
  };

  const now = Date.now();

const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'


const upcomingAppointments = appointments.filter((appt) => {
  const apptDate = new Date(appt.date).toISOString().split('T')[0];
  return appt.status === 'Confirmed' && apptDate >= today;
});


const pastAppointments = appointments.filter((appt) => {
  const apptDate = new Date(appt.date).toISOString().split('T')[0];
  return (
    appt.status === 'Cancelled' || 
    apptDate < today || 
    (apptDate === today && appt.status === 'Completed')
  );
});





  const renderTable = (title, data) => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Patient Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Doctor Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Department</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((appt) => (
                <TableRow key={appt._id}>
                  <TableCell>{appt._id}</TableCell>
                  <TableCell>{appt.patientName}</TableCell>
                  <TableCell>{appt.doctor}</TableCell>
                  <TableCell>{appt.department}</TableCell>
                  <TableCell>{new Date(appt.date).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell>
                    <Chip label={appt.status} color={statusColors[appt.status] || 'default'} />
                  </TableCell>
                  
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: '95%', mx: 'auto', mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Appointment Details
        </Typography>

        {renderTable('Upcoming Appointments', upcomingAppointments)}
        {renderTable('Past Appointments', pastAppointments)}

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
    </AdminLayout>
  );
};

export default AppointmentDetails;
