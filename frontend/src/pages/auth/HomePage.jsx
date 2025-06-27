import React, { useState } from "react";
import {
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "/src/assets/photo.jpg";

const HomePage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
      navigate(`/${newRole}/login`);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Background image + overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage}) center/cover no-repeat`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Navbar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
            px: 3,
            py: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              color: "#1976d2",
            }}
          >
            ClinicCare+
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              component={Link}
              to="/"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                fontSize: "1.25rem",
                letterSpacing: "0.01rem",
                px: 1,
              }}
            >
              Home
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                fontSize: "1.25rem",
                letterSpacing: "0.01rem",
                px: 1,
              }}
            >
              About Us
            </Typography>
            <Typography
              component={Link}
              to="/contact"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                fontSize: "1.25rem",
                letterSpacing: "0.01rem",
                px: 1,
              }}
            >
              Contact
            </Typography>
          </Box>
        </Box>

        {/* Center Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
            >
              Welcome to ClinicCare+
            </Typography>

            <Typography
              variant="h5"
              sx={{ mt: 2, textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
            >
              Your health, our priority.
            </Typography>
            <br />
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
                <PersonIcon sx={{ mr: 1 }} />
                Patient
              </ToggleButton>
              <ToggleButton value="doctor">
                <LocalHospitalIcon sx={{ mr: 1 }} />
                Doctor
              </ToggleButton>
              <ToggleButton value="admin">
                <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                Admin
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
