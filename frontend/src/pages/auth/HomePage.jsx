import React, { useState } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "./BackgroundLayout";

const HomePage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    if (newRole) {
      setRole(newRole);
      navigate(`/login/${newRole}`);
    }
  };

  return (
    <BackgroundLayout>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          p: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
          Welcome to ClinicCare+
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}>
          Your health, our priority.
        </Typography>
        <br />
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="user role"
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            ".MuiToggleButton-root": {
              color: "#1976d2",
              fontWeight: "bold",
              px: 4,
              py: 1,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#e3f2fd",
                color: "#004ba0",
              },
            },
            ".Mui-selected": {
              bgcolor: "#004ba0 ",
              color: "white ",
              "&:hover": {
                bgcolor: "#003c8f ",
              },
            },
          }}
        >
          <ToggleButton value="patient">
            <PersonIcon sx={{ mr: 1 }} /> Patient
          </ToggleButton>
          <ToggleButton value="doctor">
            <LocalHospitalIcon sx={{ mr: 1 }} /> Doctor
          </ToggleButton>
          <ToggleButton value="admin">
            <AdminPanelSettingsIcon sx={{ mr: 1 }} /> Admin
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </BackgroundLayout>
  );
};

export default HomePage;
