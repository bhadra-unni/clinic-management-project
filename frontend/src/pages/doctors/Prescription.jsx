import React, { useEffect, useState } from 'react';
import axios from '../axios';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Divider, Stack, Paper, IconButton,
  Snackbar, Alert, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

const Prescription = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const doctorName = localStorage.getItem('doctorName');
        if (!doctorName) return alert("Doctor not logged in");

        const res = await axios.get(`/appointments/doctor/${doctorName}`);
        const today = dayjs().format('YYYY-MM-DD');

        const prescriptionRes = await axios.get(`/prescriptions/doctor/${doctorName}`);
        const todayPrescriptions = prescriptionRes.data.filter(p =>
          dayjs(p.date).format('YYYY-MM-DD') === today
        );

        const filteredAppointments = res.data.filter(appt => {
          const apptDate = dayjs(appt.date).format('YYYY-MM-DD');
          return appt.status === 'Confirmed' && apptDate === today;
        });

        const appointmentsWithPrescriptionFields = filteredAppointments.map(appt => {
          const matchedPrescription = todayPrescriptions.find(p =>
            p.patientName === appt.patientName &&
            p.specialization === appt.department &&
            dayjs(p.date).format('YYYY-MM-DD') === dayjs(appt.date).format('YYYY-MM-DD')
          );

          const pastPrescriptions = prescriptionRes.data.filter(p =>
            p.patientName === appt.patientName &&
            p.doctorName === doctorName &&
            dayjs(p.date).isBefore(today)
          );

          return {
            ...appt,
            notes: matchedPrescription?.notes || '',
            medicines: matchedPrescription?.medicines || [],
            alreadyPrescribed: !!matchedPrescription,
            pastPrescriptions,
          };
        });

        setAppointments(appointmentsWithPrescriptionFields);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleChange = (medIndex, field, value, apptIndex) => {
    const updated = [...appointments];
    updated[apptIndex].medicines[medIndex][field] = value;
    setAppointments(updated);
  };

  const handleNotesChange = (value, apptIndex) => {
    const updated = [...appointments];
    updated[apptIndex].notes = value;
    setAppointments(updated);
  };

  const addMedicine = (apptIndex) => {
    const updated = [...appointments];
    updated[apptIndex].medicines.push({
      name: '', dosage: '', frequency: '', duration: '', instructions: ''
    });
    setAppointments(updated);
  };

  const deleteMedicine = (medIndex, apptIndex) => {
    const updated = [...appointments];
    updated[apptIndex].medicines.splice(medIndex, 1);
    setAppointments(updated);
  };

  const savePrescription = async (apptIndex) => {
    const data = appointments[apptIndex];
    try {
      await axios.post('/prescriptions', {
        patientName: data.patientName,
        doctorName: localStorage.getItem('doctorName'),
        date: new Date(data.date),
        specialization: data.department,
        notes: data.notes,
        medicines: data.medicines,
      });

      setSnackbar({ open: true, message: `Prescription saved for ${data.patientName}`, severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Error saving prescription',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Prescriptions
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : appointments.length === 0 ? (
        <Typography>No appointments available.</Typography>
      ) : (
        appointments.map((appt, apptIndex) => (
          <Card key={appt._id || apptIndex} sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {dayjs(appt.date).format('DD-MM-YYYY')} - <strong>{appt.patientName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Specialization: <strong>{appt.department}</strong>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Doctor Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={appt.notes}
                onChange={(e) => handleNotesChange(e.target.value, apptIndex)}
                placeholder="Add any observations or instructions..."
                sx={{ backgroundColor: '#f9f9f9', mb: 3 }}
              />

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Prescribed Medicines
              </Typography>

              {appt.medicines.length === 0 && (
                <Typography sx={{ color: 'gray', mb: 2 }}>No medicines added yet.</Typography>
              )}

              {appt.medicines.map((med, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 2, mb: 2, backgroundColor: '#f4f7fc',
                    borderRadius: 2, position: 'relative'
                  }}
                >
                  <Stack spacing={1}>
                    <TextField
                      label="Medicine Name"
                      fullWidth
                      value={med.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value, apptIndex)}
                    />
                    <TextField
                      label="Dosage (e.g. 500mg)"
                      fullWidth
                      value={med.dosage}
                      onChange={(e) => handleChange(index, 'dosage', e.target.value, apptIndex)}
                    />
                    <TextField
                      label="Frequency (e.g. 2 times/day)"
                      fullWidth
                      value={med.frequency}
                      onChange={(e) => handleChange(index, 'frequency', e.target.value, apptIndex)}
                    />
                    <TextField
                      label="Duration (e.g. 5 days)"
                      fullWidth
                      value={med.duration}
                      onChange={(e) => handleChange(index, 'duration', e.target.value, apptIndex)}
                    />
                    <TextField
                      label="Instructions (e.g. after food)"
                      fullWidth
                      value={med.instructions}
                      onChange={(e) => handleChange(index, 'instructions', e.target.value, apptIndex)}
                    />
                    <Box textAlign="right">
                      <IconButton
                        color="error"
                        onClick={() => deleteMedicine(index, apptIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Stack>
                </Paper>
              ))}

              {appt.pastPrescriptions.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Previous Prescriptions
                  </Typography>

                  {appt.pastPrescriptions.map((pres, presIndex) => (
                    <Paper
                      key={presIndex}
                      elevation={0}
                      sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Date: {dayjs(pres.date).format('DD-MM-YYYY')}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Notes: {pres.notes || '—'}
                      </Typography>
                      {pres.medicines.map((med, i) => (
                        <Typography key={i} variant="body2">
                          • {med.name}, {med.dosage}, {med.frequency}, {med.duration}, {med.instructions}
                        </Typography>
                      ))}
                    </Paper>
                  ))}
                </>
              )}

              <Button
                variant="outlined"
                onClick={() => addMedicine(apptIndex)}
                sx={{ mb: 3 }}
              >
                + Add Medicine
              </Button>

              <Box textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => savePrescription(apptIndex)}
                >
                  Save Prescription
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Prescription;
