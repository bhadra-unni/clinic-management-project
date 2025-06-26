import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Box, Chip, Avatar, Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import { format } from 'date-fns';
import doctorImg from '../../assets/image.jpg';

const prescriptions = [
  {
    id: 1,
    date: '2025-06-23',
    doctorName: 'Dr. Ravi Sharma',
    department: 'Cardiology',
    notes: 'Follow up after 1 week.',
    medicines: [
      { name: 'Aspirin', dosage: '75mg', frequency: 'Once Daily', duration: '7 days', instructions: 'After meals' },
      { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once Daily', duration: '30 days', instructions: 'At bedtime' },
    ]
  },
  {
    id: 2,
    date: '2025-06-12',
    doctorName: 'Dr. Neha Singh',
    department: 'Neurology',
    notes: 'MRI scan recommended.',
    medicines: [
      { name: 'Gabapentin', dosage: '300mg', frequency: 'Twice Daily', duration: '15 days', instructions: 'With food' }
    ]
  }
];

const ViewPrescription = () => {
  return (
    <Box
      sx={{
        pt: 10,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
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
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          maxWidth: 1000,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
          Your Prescriptions
        </Typography>

        {prescriptions.map((prescription, index) => (
          <Accordion
            key={prescription.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: '#f5faff',
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.01)',
              },
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={2} alignItems="center">
                <DescriptionIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography fontWeight="bold">
                    {index + 1}. {format(new Date(prescription.date), 'dd MMM yyyy')} – {prescription.doctorName}
                  </Typography>
                  <Typography fontSize="0.85rem" color="text.secondary">
                    {prescription.department}
                  </Typography>
                </Box>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {prescription.doctorName.charAt(0)}
                </Avatar>
                <Typography fontWeight="medium">{prescription.doctorName}</Typography>
                <Chip
                  label={prescription.department}
                  color="info"
                  variant="outlined"
                  sx={{ ml: 'auto' }}
                />
              </Stack>

              <Typography mb={1}><strong>Date:</strong> {format(new Date(prescription.date), 'dd MMM yyyy')}</Typography>
              <Typography mb={2}><strong>Notes:</strong> {prescription.notes}</Typography>

              <Typography variant="h6" mt={2} mb={1} color="primary">
                Medicines
              </Typography>

              <Box sx={{ overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: '#1976d2' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dosage</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Frequency</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Duration</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Instructions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prescription.medicines.map((med, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{med.name}</TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                        <TableCell>{med.duration}</TableCell>
                        <TableCell>{med.instructions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default ViewPrescription;
