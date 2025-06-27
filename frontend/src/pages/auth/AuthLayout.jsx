// src/pages/auth/AuthLayout.jsx

import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <>
      {/* Header */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
          <Typography variant="h6" fontWeight="bold">
            ClinicCare+
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Typography
              variant="body1"
              component="a"
              href="#home"
              sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
            >
              Home
            </Typography>
            <Typography
              variant="body1"
              component="a"
              href="#aboutus"
              sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              component="a"
              href="#contact"
              sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
            >
              Contact
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ mt: 4, px: { xs: 2, md: 6 } }}>
        {children}
      </Box>
    </>
  );
};

export default AuthLayout;
