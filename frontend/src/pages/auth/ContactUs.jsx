import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import AuthLayout from "./AuthLayout";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    
    <Paper elevation={6} sx={{ maxWidth: 600, mx: "auto", mt: 12, p: 5,borderRadius:2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="centre">Drop Us a Message</Typography>
      <Typography variant="body2" color="text.secondary" align="centre" mb={3}>Please fill out the form below,and our team will respond as soon as possible</Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField name="name" label="Name" value={form.name} onChange={handleChange}
         required
         fullWidth
         variant="outlined"
         />
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} 
        required
        fullWidth
         variant="outlined"
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
        />
        <Button variant="contained" color="primary" type="submit" sx={{py:1.5,fontWeight:"medium"}}>Send Message</Button>
      </Box>
    </Paper>
   
  );
};

export default ContactUs;
