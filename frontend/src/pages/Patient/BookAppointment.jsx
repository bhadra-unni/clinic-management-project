// BookAppointment.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import doctorImg from '../../assets/image.jpg';

const BookAppointment = () => {
  const [departments, setDepartments] = useState([]);
  const [doctorsByDept, setDoctorsByDept] = useState({});
  const [doctor, setDoctor] = useState(null);
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('http://localhost:3000/doctors');
        const data = await res.json();
        const grouped = {};
        data.forEach((doc) => {
          if (!grouped[doc.department]) grouped[doc.department] = [];
          grouped[doc.department].push(doc); // store full doctor object
        });
        setDoctorsByDept(grouped);
        setDepartments(Object.keys(grouped));
      } catch (err) {
        console.error('Failed to load doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const payload = {
        doctor: doctor?.name,
        department,
        date: dayjs(date).format('YYYY-MM-DD'),
        status: 'Confirmed',
        patientName: user?.name || 'Unknown',
      };

      const res = await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Booking failed');

      setSnackbarMessage('Appointment successfully booked!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setDepartment('');
      setDoctor(null);
      setDate(null);
    } catch (err) {
      console.error('Booking error:', err.message);
      setSnackbarMessage('Failed to book appointment. Try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          pt: 1,
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          mt: -4,
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
        <Paper
          elevation={4}
          sx={{
            position: 'relative',
            zIndex: 1,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            p: 5,
            width: '100%',
            maxWidth: 600,
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="center" color='primary' gutterBottom>
            Book Appointment
          </Typography>

          {/* Department Select */}
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>
            Select Department:
          </Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              value={department}
              label="Department"
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctor(null);
              }}
            >
              {departments.map((dep) => (
                <MenuItem key={dep} value={dep}>
                  {dep}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Doctor Select */}
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>
            Select Doctor:
          </Typography>
          <FormControl fullWidth margin="dense" disabled={!department}>
            <InputLabel>Doctor</InputLabel>
            <Select
              value={doctor?.name || ''}
              label="Doctor"
              onChange={(e) => {
                const selected = doctorsByDept[department]?.find(
                  (d) => d.name === e.target.value
                );
                setDoctor(selected);
              }}
            >
              {(doctorsByDept[department] || []).map((doc) => (
                <MenuItem key={doc.name} value={doc.name}>
                  {doc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Display Doctor Fees */}
          

          {/* Date Picker */}
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>
            Select Date:
          </Typography>
          <DatePicker
            label="Choose Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            disablePast
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'dense',
              },
            }}
          />
          {doctor && (
            <Box
              sx={{
                mt: 2,
                p: 1,
                border: '1px dashed #ccc',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                textAlign: 'center',
              }}
            >
              <Typography variant="subtitle2">Consultation Fee</Typography>
              <Typography variant="h6" color="primary">
                ₹{doctor.fees}
              </Typography>
            </Box>
          )}

          {/* Submit Button */}
          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              sx={{
                borderRadius: 8,
                px: 4,
                py: 1,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
              disabled={!department || !doctor || !date || loading}
              onClick={handleSubmit}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Appointment'}
            </Button>

            <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
              You need to pay the consultation fee when you meet the doctor. Appointments can be
              cancelled up to 24 hours in advance.
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookAppointment;
