

import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button, Divider, Stack, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const mockAppointments = [
  {
    id: 1,
    patientName: 'Arjun Menon',
    date: '2025-06-27',
    specialization: 'Cardiology',
    notes: '',
    medicines: [
      { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
    ]
  },
  {
    id: 2,
    patientName: 'Riya Nair',
    date: '2025-06-26',
    specialization: 'Neurology',
    notes: '',
    medicines: []
  }
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleChange = (index, field, value, apptIndex) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[apptIndex].medicines[index][field] = value;
    setAppointments(updatedAppointments);
  };

  const handleNotesChange = (value, apptIndex) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[apptIndex].notes = value;
    setAppointments(updatedAppointments);
  };

  const addMedicine = (apptIndex) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[apptIndex].medicines.push({
      name: '', dosage: '', frequency: '', duration: '', instructions: ''
    });
    setAppointments(updatedAppointments);
  };

  const deleteMedicine = (index, apptIndex) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[apptIndex].medicines.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  const savePrescription = (apptIndex) => {
    const data = appointments[apptIndex];
    console.log('Saving prescription:', data);
    alert('Prescription saved for ' + data.patientName);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Patient Appointments & Prescriptions
      </Typography>

      {appointments.map((appt, apptIndex) => (
        <Card key={appt.id} sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">{appt.date} – Dr. Gayathri</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Patient: <strong>{appt.patientName}</strong> &nbsp; | &nbsp;
              Specialization: <strong>{appt.specialization}</strong>
            </Typography>

            <Box mt={2}>
              <Typography variant="subtitle2">Doctor Notes</Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={appt.notes}
                onChange={(e) => handleNotesChange(e.target.value, apptIndex)}
                placeholder="notes"
                sx={{ my: 1 }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>Medicines</Typography>
            {appt.medicines.map((med, index) => (
              <Paper key={index} elevation={1} sx={{ p: 2, mb: 2 }}>
                <Stack spacing={2}>
                  <TextField
                    label="Medicine Name"
                    fullWidth
                    value={med.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value, apptIndex)}
                  />
                  <TextField
                    label="Dosage "
                    fullWidth
                    value={med.dosage}
                    onChange={(e) => handleChange(index, 'dosage', e.target.value, apptIndex)}
                  />
                  <TextField
                    label="Frequency "
                    fullWidth
                    value={med.frequency}
                    onChange={(e) => handleChange(index, 'frequency', e.target.value, apptIndex)}
                  />
                  <TextField
                    label="Duration "
                    fullWidth
                    value={med.duration}
                    onChange={(e) => handleChange(index, 'duration', e.target.value, apptIndex)}
                  />
                  <TextField
                    label="Instructions "
                    fullWidth
                    value={med.instructions}
                    onChange={(e) => handleChange(index, 'instructions', e.target.value, apptIndex)}
                  />
                  <Box textAlign="right">
                    <IconButton color="error" onClick={() => deleteMedicine(index, apptIndex)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Paper>
            ))}

            <Button
              variant="outlined"
              onClick={() => addMedicine(apptIndex)}
              sx={{ mt: 1 }}
            >
              + Add Medicine
            </Button>

            <Box mt={3}>
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
      ))}
    </Box>
  );
};

export default Appointments;
