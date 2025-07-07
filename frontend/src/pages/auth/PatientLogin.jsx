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
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import doctorBg from '../../assets/doctor.jpeg'; // ✅ background image
import Navbar from './Navbar';
import axios from '../axios';

const PatientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('/patients/login', {
      email,
      password,
    });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.patient));
    navigate('/patient/dashboard');
  } catch (err) {
    alert("Login failed: " + (err.response?.data?.message || err.message));
  }
};



  return (
    <><Navbar /><Box
      sx={{
        minHeight: '100vh',
        background: `url(${doctorBg}) center right / cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-start' }, // center on mobile, left on desktop
        px: { xs: 2, md: 10 }, // padding from left
        backgroundColor: '#f5faff', // fallback
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
              Welcome to ClinicCare+
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ color: '#555', mb: 3 }}
            >
              Log in to access your appointments, history and care.
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
                required />

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
                required />

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

            <Typography
              variant="body2"
              mt={3}
              align="center"
              sx={{ color: '#333' }}
            >
              Don’t have an account?{' '}
              <Link
                to="/patient/signup"
                style={{
                  color: '#1976d2',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box></>
  );
};

export default PatientLogin;