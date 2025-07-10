import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import AdminLayout from './AdminLayout';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors`);
      setDoctors(res.data);
    } catch (err) {
      setError('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/doctors/${id}`);
      setSuccess('Doctor deleted successfully!');
      setDoctors(doctors.filter((doc) => doc._id !== id));
    } catch (err) {
      setError('Failed to delete doctor');
    }
  };

  const handleEdit = (doctor) => {
    navigate('/admin/add-doctor', { state: doctor });
  };

  const handleOpenResetDialog = (id) => {
    setSelectedDoctorId(id);
    setOpenDialog(true);
  };

  const handleResetPassword = async () => {
    try {
      await axios.put(`/doctors/${selectedDoctorId}/reset-password`, {
        newPassword,
      });
      setSuccess('Password reset successfully');
    } catch (err) {
      setError('Failed to reset password');
    } finally {
      setOpenDialog(false);
      setNewPassword('');
      setSelectedDoctorId(null);
    }
  };

  return (
    <AdminLayout>
      <br />
      <Typography variant="h4" fontWeight="bold" align="center" color='primary' gutterBottom>
        Doctor List
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 1000, mx: 'auto', mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}><strong>Name</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Email</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Department</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Fees (₹)</strong></TableCell>
                <TableCell sx={{ color: '#fff' }} align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.department}</TableCell>
                  <TableCell>{doctor.fees}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(doctor)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(doctor._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenResetDialog(doctor._id)}
                      sx={{ ml: 1 }}
                    >
                      Reset Password
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {doctors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No doctors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Reset Password Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            label="New Password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleResetPassword}>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default DoctorList;
