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
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // ✅ Don't forget this import
import doctorBg from '../../assets/doctor.jpeg';
import Navbar from './Navbar';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/doctors/login', {
        email,
        password,
      });

      console.log(response.data);
      setSuccess('Login successful!');
      setError('');

      // Store token in localStorage
      localStorage.setItem('doctorId', response.data.doctor.id);
       localStorage.setItem('token', response.data.token);
      // Redirect to doctor dashboard (you can update the path)
      navigate('/doctor/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
      setSuccess('');
    }
  };

  return (
    <>
      <Navbar />
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
                Doctor Login - ClinicCare+
              </Typography>

              <Typography
                variant="body2"
                align="center"
                sx={{ color: '#555', mb: 3 }}
              >
                Log in to manage appointments, patients, and reports.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {success}
                </Alert>
              )}

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
    </>
  );
};

export default DoctorLogin;
