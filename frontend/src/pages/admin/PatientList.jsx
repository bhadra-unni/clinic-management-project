import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from '@mui/material';
import AdminLayout from './AdminLayout';
import axios from '../axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/patients');
        setPatients(res.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <AdminLayout>
      <div style={{ padding: '2rem' }}>
        <Typography variant="h4" fontWeight="bold" align="center" color='primary' gutterBottom>
          Patient List
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Age</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.length > 0 ? (
                  patients.map((pat, index) => (
                    <TableRow key={pat._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{pat.name}</TableCell>
                      <TableCell>{pat.age}</TableCell>
                      <TableCell>{pat.email}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No patients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </AdminLayout>
  );
};

export default PatientList;
