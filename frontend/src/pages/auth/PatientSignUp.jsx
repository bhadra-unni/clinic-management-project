import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import doctorBg from "/src/assets/doctor.jpeg";
import Navbar from "./Navbar";
import axios from '../axios';


const PatientSignup = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSignup = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const res = await axios.post('/patients/signup', form);

    alert("Signup successful. Please log in.");
    navigate("/patient/login");
  } catch (err) {
    alert("Signup failed: " + (err.response?.data?.message || err.message));
  }
};



  return (
    <><Navbar /><Box
      sx={{
        minHeight: "100vh",
        background: `url(${doctorBg}) center right / cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        px: { xs: 2, md: 10 },
        backgroundColor: "#f5faff",
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
              maxWidth: 550,
              bgcolor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              gutterBottom
              sx={{ color: "#1976d2" }}
            >
              Welcome to ClinicCare+
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "#555", mb: 3 }}
            >
              Please complete the form below to create your account.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSignup}
              display="flex"
              flexDirection="column"
              gap={2.5}
            >
              <TextField
                name="name"
                label="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth />
              <TextField
                name="age"
                label="Age"
                value={form.age}
                onChange={handleChange}
                required
                type="number"
                fullWidth />
              <TextField
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                fullWidth />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                fullWidth />

              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "#1976d2",
                  '&:hover': {
                    backgroundColor: "#125ca1",
                  },
                }}
              >
                Register
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "#333" }}
              >
                Already have an account?{" "}
                <Link
                  to="/patient/login"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: "500",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box></>
  );
};

export default PatientSignup;