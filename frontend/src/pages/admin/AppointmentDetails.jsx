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
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AdminLayout from '../admin/AdminLayout';
import axios from '../axios';
import dayjs from 'dayjs';

const statusColors = {
  Pending: 'warning',
  Confirmed: 'success',
  Cancelled: 'error',
  Completed: 'info',
};

const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
      setSnackbar({ open: true, message: 'Failed to fetch appointments', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const today = dayjs().format('YYYY-MM-DD');

  const upcomingAppointments = appointments.filter((appt) => {
    const apptDate = dayjs(appt.date).format('YYYY-MM-DD');
    return appt.status === 'Confirmed' && apptDate >= today;
  });

  const pastAppointments = appointments.filter((appt) => {
    const apptDate = dayjs(appt.date).format('YYYY-MM-DD');
    return (
      appt.status === 'Cancelled' ||
      apptDate < today ||
      (apptDate === today && appt.status === 'Completed')
    );
  });

  const renderTable = (title, data) => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight='bold' gutterBottom>
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
                  <TableCell>{dayjs(appt.date).format('DD-MM-YYYY')}</TableCell>
                  <TableCell>
                    <Chip label={appt.status} color={statusColors[appt.status] || 'default'} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
        <Typography variant="h4" fontWeight="bold" align="center" color='primary' gutterBottom>
          Appointment Details
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {renderTable('Upcoming Appointments', upcomingAppointments)}
            {renderTable('Past Appointments', pastAppointments)}
          </>
        )}

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
