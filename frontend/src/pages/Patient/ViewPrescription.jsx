import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Box, Chip, Avatar, Stack, CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import { format } from 'date-fns';
import doctorImg from '../../assets/image.jpg';
import axios from '../axios';

const ViewPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.name) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`/prescriptions?patientName=${user.name}`);
        const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPrescriptions(sortedData);
      } catch (err) {
        console.error('Failed to fetch prescriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

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
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom color="primary">
          Your Prescriptions
        </Typography>

        {loading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : prescriptions.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No prescriptions found.
          </Typography>
        ) : (
          prescriptions.map((prescription, index) => (
            <Accordion
              key={prescription._id}
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
                      {prescription.specialization}
                    </Typography>
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {prescription.doctorName?.charAt(0)}
                  </Avatar>
                  <Typography fontWeight="medium">{prescription.doctorName}</Typography>
                  <Chip
                    label={prescription.specialization}
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
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dosage (mg)</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Frequency (times/day)</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Duration (days)</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Instructions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prescription?.medicines?.length > 0 ? (
                        prescription.medicines.map((med, i) => (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{med.name}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                            <TableCell>{med.duration}</TableCell>
                            <TableCell>{med.instructions}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No medicines prescribed.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ViewPrescription;
