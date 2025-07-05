import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import axios from 'axios';



const AddDoctor = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    fees: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const [departments, setDepartments] = useState([]);
const [useNewDept, setUseNewDept] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.department || !form.fees) {
      setError('Please fill all required fields.');
      return;
    }

    if (!location.state && (form.password !== form.confirmPassword)) {
      setError('Passwords do not match.');
      return;
    }

    try {
      if (location.state) {
        // EDIT MODE
        const doctorId = location.state._id;
        const updatedData = {
          name: form.name,
          email: form.email,
          department: form.department,
          fees: form.fees,
        };
        await axios.put(`http://localhost:3000/doctors/${doctorId}`, updatedData);
        setSuccess('Doctor updated successfully!');
      } else {
        // ADD MODE
        await axios.post('http://localhost:3000/doctors', form);
        setSuccess('Doctor added successfully!');
      }

      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        fees: '',
      });

      setError('');
      setTimeout(() => navigate('/admin/doctor-list'), 1000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
      setSuccess('');
    }
  };

  useEffect(() => {
    if (location.state) {
      const { name, email, department, fees } = location.state;
      setForm({
        name,
        email,
        password: '',
        confirmPassword: '',
        department,
        fees,
      });
    }
  }, [location]);
  axios.get('http://localhost:3000/doctors').then(res => {
  const uniqueDepartments = [...new Set(res.data.map(doc => doc.department))];
  setDepartments(uniqueDepartments);
});


  return (
    <AdminLayout>
      <br /><br />
      <Paper
        elevation={3}
        sx={{ maxWidth: 600, mx: 'auto', p: 4, mt: 2 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {location.state ? 'Edit Doctor' : 'Add New Doctor'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Doctor Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email ID"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            fullWidth
            margin="normal"
          />
          {!location.state && (
            <>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
            </>
          )}
          <Box sx={{ mt: 2 }}>
  <Button
    variant="outlined"
    size="small"
    onClick={() => setUseNewDept(!useNewDept)}
    sx={{ mb: 1 }}
  >
    {useNewDept ? 'Choose Existing Department' : 'Add New Department'}
  </Button>

  {useNewDept ? (
    <TextField
      label="New Department"
      name="department"
      value={form.department}
      onChange={handleChange}
      required
      fullWidth
    />
  ) : (
    <TextField
      select
      label="Select Department"
      name="department"
      value={form.department}
      onChange={handleChange}
      required
      fullWidth
    >
      {departments.map((dept, index) => (
        <MenuItem key={index} value={dept}>
          {dept}
        </MenuItem>
      ))}
    </TextField>
  )}
</Box>


          <TextField
            label="Consultancy Fees"
            name="fees"
            value={form.fees}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <span>₹</span>,
              inputProps: { type: 'number', min: 0 },
            }}
          />

          <Box textAlign="center" mt={3}>
            <Button type="submit" variant="contained">
              {location.state ? 'UPDATE DOCTOR' : 'ADD DOCTOR'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </AdminLayout>
  );
};

export default AddDoctor;
