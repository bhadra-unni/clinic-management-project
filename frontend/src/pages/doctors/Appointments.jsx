import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Paper
} from '@mui/material';
import axios from 'axios'; // ✅ required

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const doctorId = localStorage.getItem('doctorId'); // ✅ get doctorId from login
      if (!doctorId) return console.warn("No doctorId in localStorage");

      try {
        // 🔍 Fetch the doctor details to get the name
        const doctorRes = await axios.get(`http://localhost:3000/api/doctors/dashboard/${doctorId}`);
        const doctorName = doctorRes.data.name;

        // 🗓 Fetch appointments for that doctor
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
      await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
      setAppointments(prev => prev.map(appt =>
        appt._id === id ? { ...appt, status: 'Cancelled' } : appt
      ));
    } catch (err) {
      console.error('Cancel failed:', err);
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
                <TableCell>{appt.date}</TableCell>
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
    </Box>
  );
};

export default Appointments;
