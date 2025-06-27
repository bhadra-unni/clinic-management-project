
import React, { useEffect, useState } from 'react';
import {
  Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import AdminLayout from './AdminLayout';
//import { getAllPatients } from '../../assets/services/adminService';


const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Mock data instead of API call
    const mockPatients = [
      { _id: '1', name: 'Alice Brown', age: 30, email: 'alice@example.com' },
    ];
    setPatients(mockPatients);
  }, []);

  return (
   <AdminLayout>
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Patient List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2'}}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Age</TableCell>
              <TableCell sx={{ color: '#fff' }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((pat, index) => (
              <TableRow key={pat._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pat.name}</TableCell>
                <TableCell>{pat.age}</TableCell>
                <TableCell>{pat.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </AdminLayout> 
  );
};

export default PatientList;