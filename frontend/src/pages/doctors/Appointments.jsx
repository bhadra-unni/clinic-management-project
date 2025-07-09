import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Paper, Snackbar, Alert, CircularProgress
} from '@mui/material';
import dayjs from 'dayjs';
import axios from '../axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true); // ✅ loading state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true); // start loading
      const doctorId = localStorage.getItem('doctorId');
      if (!doctorId) return console.warn("No doctorId in localStorage");

      try {
        const doctorRes = await axios.get(`/api/doctors/dashboard/${doctorId}`);
        const doctorName = doctorRes.data.name;

        const apptRes = await axios.get(`/appointments/doctor/${doctorName}`);
        const prescriptionsRes = await axios.get(`/prescriptions/doctor/${doctorName}`);

        const updatedAppointments = apptRes.data.map(appt => {
          const hasPrescription = prescriptionsRes.data.some(pres =>
            pres.patientName === appt.patientName &&
            pres.specialization === appt.department &&
            dayjs(pres.date).format('YYYY-MM-DD') === dayjs(appt.date).format('YYYY-MM-DD')
          );
          return { ...appt, hasPrescription };
        });

        const today = dayjs().format('YYYY-MM-DD');

        const upcoming = updatedAppointments.filter(appt => {
          const apptDate = dayjs(appt.date).format('YYYY-MM-DD');
          return appt.status === 'Confirmed' && apptDate >= today;
        });

        const past = updatedAppointments.filter(appt => {
          const apptDate = dayjs(appt.date).format('YYYY-MM-DD');
          return appt.status === 'Cancelled' || appt.status === 'Completed' || apptDate < today;
        });

        setAppointments({ upcoming, past });

      } catch (err) {
        console.error("Failed to fetch appointments or prescriptions", err);
      } finally {
        setLoading(false); // end loading
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      const res = await axios.put(`/appointments/cancel/${id}`);
      setAppointments(prev => ({
        upcoming: prev.upcoming.map(appt =>
          appt._id === id ? { ...appt, status: 'Cancelled' } : appt
        ),
        past: prev.past.map(appt =>
          appt._id === id ? { ...appt, status: 'Cancelled' } : appt
        )
      }));
      setSnackbar({ open: true, message: res.data.message, severity: 'success' });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to cancel appointment',
        severity: 'error',
      });
    }
  };

  const renderTable = (data, title) => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
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
            {data.length > 0 ? (
              data.map((appt) => (
                <TableRow key={appt._id}>
                  <TableCell>{appt.patientName}</TableCell>
                  <TableCell>{appt.department}</TableCell>
                  <TableCell>{dayjs(appt.date).format('DD-MM-YYYY')}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        appt.status === 'Cancelled'
                          ? 'red'
                          : appt.status === 'Completed'
                          ? '#1976d2'
                          : 'green',
                    }}
                  >
                    {appt.status}
                  </TableCell>
                  <TableCell>
                    {appt.status === 'Confirmed' &&
                    !appt.hasPrescription &&
                    dayjs(appt.date).isAfter(dayjs().add(48, 'hour')) ? (
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
                        {appt.status === 'Cancelled' || appt.status === 'Completed' ? '—' : ''}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
    <Box sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Appointments
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress size={40} color="primary" />
        </Box>
      ) : (
        <>
          {renderTable(appointments.upcoming, 'Upcoming Appointments')}
          {appointments.past.length > 0 && renderTable(appointments.past, 'Past Appointments')}
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
  );
};

export default Appointments;
