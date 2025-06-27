import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BackgroundLayout from "./BackgroundLayout";

import AuthLayout from "./AuthLayout";
 import axios from "axios";


const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/messages/send", form);
    if (res.data.success) {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message.");
    }
  } catch (err) {
    console.error("Error sending message:", err);
    alert("An error occurred while sending the message.");
  }
};



  return (
    <BackgroundLayout>
      <Paper
        elevation={8}
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 5,
          borderRadius: 2,
          bgcolor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            pb: 1,
            borderBottom: "2px solid #1976d2",
          }}
        >
          <LocalHospitalIcon color="primary" />
          Drop Us a Message
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          align="center"
          mb={3}
        >
          Please fill out the form below, and our team will respond as soon as possible.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              sx: { backgroundColor: "white", borderRadius: 1 },
            }}
          />
          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              sx: { backgroundColor: "white", borderRadius: 1 },
            }}
          />
          <TextField
            name="message"
            label="Message"
            multiline
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              sx: { backgroundColor: "white", borderRadius: 1 },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              py: 1.2,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              borderRadius: 1,
            }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </BackgroundLayout>
  );
};

export default ContactUs;
