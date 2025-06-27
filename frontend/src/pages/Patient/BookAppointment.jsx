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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import doctorImg from '../../assets/image.jpg';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [departments, setDepartments] = useState([]);
  const [doctorsByDept, setDoctorsByDept] = useState({});
  const [doctor, setDoctor] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('http://localhost:3000/doctors');
        const data = await res.json();

        const grouped = {};
        data.forEach((doc) => {
          if (!grouped[doc.department]) grouped[doc.department] = [];
          grouped[doc.department].push(doc.name);
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
        doctor,
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

      setDepartment('');
      setDoctor('');
      setDate(null);

      navigate('/patient/history');
    } catch (err) {
      console.error('Booking error:', err.message);
      alert('Failed to book appointment. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          pt: 4,
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          mt:-4,
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
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Book Appointment
          </Typography>

          {/* Department Select */}
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>Select Department:</Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              value={department}
              label="Department"
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctor('');
              }}
            >
              {departments.map((dep) => (
                <MenuItem key={dep} value={dep}>{dep}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Doctor Select */}
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>Select Doctor:</Typography>
          <FormControl fullWidth margin="dense" disabled={!department}>
            <InputLabel>Doctor</InputLabel>
            <Select
              value={doctor}
              label="Doctor"
              onChange={(e) => setDoctor(e.target.value)}
            >
              {(doctorsByDept[department] || []).map((doc) => (
                <MenuItem key={doc} value={doc}>{doc}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date Picker */}
          <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>Select Date:</Typography>
          <DatePicker
            label="Choose Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            disablePast
            slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
          />

          {/* Submit Button */}
          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              disabled={!department || !doctor || !date || loading}
              onClick={handleSubmit}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Appointment'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default BookAppointment;
