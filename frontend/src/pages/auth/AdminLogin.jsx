import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import doctorBg from '../../assets/doctor.jpeg'; // ✅ background image
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/admins/login', {
      email,
      password,
    });

    // Store token in localStorage
    localStorage.setItem('adminToken', res.data.token);

    alert("Login successful!");
    navigate('/admin/dashboard'); // redirect
  } catch (err) {
    alert("Login failed: " + (err.response?.data || err.message));
  }
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `url(${doctorBg}) center right / cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-start' },
        px: { xs: 2, md: 10 },
        backgroundColor: '#f5faff',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              maxWidth: 450,
              bgcolor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              gutterBottom
              sx={{ color: '#1976d2' }}
            >
              Admin Login - ClinicCare+
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ color: '#555', mb: 3 }}
            >
              Manage users, doctors, appointments, and more.
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <TextField
                fullWidth
                label="Password"
                type={showPass ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass(!showPass)}
                        edge="end"
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 'bold',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#125ca1',
                  },
                }}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminLogin;