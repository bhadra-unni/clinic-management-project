import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import HearingIcon from "@mui/icons-material/Hearing";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SpaIcon from "@mui/icons-material/Spa";
import BackgroundLayout from "./BackgroundLayout";

const services = [
  {
    title: "ENT",
    desc: "Specialized care for ear, nose, and throat conditions.",
    icon: <HearingIcon fontSize="large" />,
  },
  {
    title: "Orthopedics",
    desc: "Advanced treatment for bones, joints, and muscles.",
    icon: <AccessibilityIcon fontSize="large" />,
  },
  {
    title: "Dermatology",
    desc: "Skin, hair, and nail care by expert dermatologists.",
    icon: <SpaIcon fontSize="large" />,
  },
];

const AboutUs = () => {
  return (
    <BackgroundLayout>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: 3,
          py: 5,
          px: { xs: 2, md: 5 },
          mt: 4,
          mb: 6,
          color: "white",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          About ClinicCare+
        </Typography>

        {/* About description */}
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            mt: 2,
            fontSize: "1.1rem",
            textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
            textAlign: "center",
          }}
        >
          ClinicCare+ is a next-generation digital health platform designed to
          streamline communication, simplify patient management, and improve
          health outcomes.
        </Typography>

        {/* Platform purpose */}
        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 4,
            color: "#aeea00",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
          }}
        >
          This platform helps patients easily find and book appointments with doctors.
        </Typography>

        {/* Services */}
        <Divider sx={{ my: 4, backgroundColor: "white" }} />
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          Our Services
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
  {services.map((srv, idx) => (
    <Grid item xs={12} sm={6} md={4} key={idx}>
      <Paper
  elevation={4}
  sx={{
    p: { xs: 2, sm: 3 },
    textAlign: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: 3,
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: 6,
    },
  }}
>

        <Box
          sx={{
            mb: 1.5,
            bgcolor: "#1976d2",
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {srv.icon}
        </Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
          {srv.title}
        </Typography>
        <Typography variant="body2">{srv.desc}</Typography>
      </Paper>
    </Grid>
  ))}
</Grid>


        {/* Contact Info */}
        <Divider sx={{ my: 4, backgroundColor: "white" }} />
        <Typography
          variant="h4"
          align="center"
          sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
        >
          Email: support@cliniccare.com | Phone: +91 98765 43210 | Address:
          21st Avenue, Technopark, Kerala.
        </Typography>
      </Container>
    </BackgroundLayout>
  );
};

export default AboutUs;
