import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Divider, Stack, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Prescription = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/api/appointments/doctor/Dr. Sharma');
        const appointmentsWithPrescriptionFields = res.data.map(appt => ({
          ...appt,
          notes: '',
          medicines: [],
        }));
        setAppointments(appointmentsWithPrescriptionFields);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };
    fetchAppointments();
  }, []);

  const handleChange = (index, field, value, apptIndex) => {
    const updated = [...appointments];
    updated[apptIndex].medicines[index][field] = value;
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

  const deleteMedicine = (index, apptIndex) => {
    const updated = [...appointments];
    updated[apptIndex].medicines.splice(index, 1);
    setAppointments(updated);
  };

  const savePrescription = async (apptIndex) => {
    const data = appointments[apptIndex];
    try {
      await axios.post('/api/prescriptions', {
        patientName: data.patientName,
        date: data.date,
        specialization: data.department, // assuming 'department' is specialization
        notes: data.notes,
        medicines: data.medicines,
      });
      alert(`Prescription saved for ${data.patientName}`);
    } catch (err) {
      console.error(err);
      alert('Error saving prescription');
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Prescriptions
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments available.</Typography>
      ) : (
        appointments.map((appt, apptIndex) => (
          <Card key={appt._id || apptIndex} sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {appt.date} - <strong>{appt.patientName}</strong>
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
    </Box>
  );
};

export default Prescription;
