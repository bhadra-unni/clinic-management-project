// src/pages/Patient/BookAppointment.jsx
import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import doctorImg from '../../assets/image.jpg';

const BookAppointment = () => {
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const departments = ['Cardiology', 'Neurology'];
  const doctors = {
    Cardiology: ['Dr. Ravi', 'Dr. Neha'],
    Neurology: ['Dr. Sameer'],
  };
  const slots = ['10:00 AM', '10:30 AM', '11:00 AM'];

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setDepartment('');
      setDoctor('');
      setDate(null);
      setSlot('');
      setLoading(false);
      setOpenSuccess(true);
    }, 1000);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          pt: 8,
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
        <Paper
          elevation={4}
          sx={{
            position: 'relative',
            zIndex: 1,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            p: 4,
            width: '100%',
            maxWidth: 500,
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.01)',
            },
          }}
        >
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Book Appointment
          </Typography>

          <Typography fontWeight="bold" mt={2}>Select Department</Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
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

          <Typography fontWeight="bold" mt={2}>Select Doctor</Typography>
          <FormControl fullWidth margin="dense" disabled={!department}>
            <InputLabel id="doctor-label">Doctor</InputLabel>
            <Select
              labelId="doctor-label"
              value={doctor}
              label="Doctor"
              onChange={(e) => setDoctor(e.target.value)}
            >
              {(doctors[department] || []).map((doc) => (
                <MenuItem key={doc} value={doc}>{doc}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography fontWeight="bold" mt={2}>Select Date</Typography>
          <DatePicker
            label="Choose Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            disablePast
            slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
          />

          <Typography fontWeight="bold" mt={2}>Choose Time Slot</Typography>
          <Box display="flex" gap={2} mt={1} flexWrap="wrap">
            {slots.map((s) => (
              <Button
                key={s}
                variant={slot === s ? 'contained' : 'outlined'}
                onClick={() => setSlot(s)}
                sx={{ transition: '0.2s', '&:hover': { transform: 'scale(1.05)' } }}
              >
                {s}
              </Button>
            ))}
          </Box>

          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              disabled={!department || !doctor || !date || !slot || loading}
              onClick={handleSubmit}
              sx={{
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Appointment'}
            </Button>
          </Box>

          <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                Appointment Confirmed
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenSuccess(false)}
                  sx={{ ml: 'auto' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography>Your appointment has been successfully booked.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenSuccess(false)} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </Box>
  );
};

export default BookAppointment;
