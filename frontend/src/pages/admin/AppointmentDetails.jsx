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
} from '@mui/material';
import { Edit, Cancel } from '@mui/icons-material';
import AdminLayout from '../admin/AdminLayout';
import axios from 'axios';

const statusColors = {
  Pending: 'warning',
  Confirmed: 'success',
  Cancelled: 'error',
};

const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments'); // your API endpoint
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:3000/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: '95%', mx: 'auto', mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Appointment Details
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
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <TableRow key={appt._id}>
                    <TableCell>{appt._id}</TableCell>
                    <TableCell>{appt.patientName}</TableCell>
                    <TableCell>{appt.doctor}</TableCell>
                    <TableCell>{appt.department}</TableCell>
                    <TableCell>{appt.date}</TableCell>
                    <TableCell>
                      <Chip label={appt.status} color={statusColors[appt.status] || 'default'} />
                    </TableCell>
                    <TableCell>
                      {appt.status !== 'Cancelled' && (
                        <IconButton color="error" onClick={() => handleCancel(appt.id)}>
                          <Cancel />
                        </IconButton>
                      )}
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
    </AdminLayout>
  );
};

export default AppointmentDetails;
