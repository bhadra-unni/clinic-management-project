import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import BackgroundLayout from "./BackgroundLayout";
import axios from '../axios';

const AboutUs = () => {
  const [departmentData, setDepartmentData] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("/doctors");
        const grouped = {};

        res.data.forEach((doc) => {
          if (!grouped[doc.department]) {
            grouped[doc.department] = [];
          }
          grouped[doc.department].push(doc.name);
        });

        setDepartmentData(grouped);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      }
    };

    fetchDepartments();
  }, []);

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
          At ClinicCare+, we are committed to delivering compassionate and comprehensive healthcare services. Our clinic brings together experienced doctors, modern medical facilities, and a patient-first approach to ensure the well-being of every individual who walks through our doors.
        </Typography>

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
          We provide trusted medical care across multiple departments and make it easy for patients to connect with the right doctor at the right time.
        </Typography>


        {/* Departments */}
        <Divider sx={{ my: 4, backgroundColor: "white" }} />
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          Our Departments
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          {Object.entries(departmentData).map(([dept, doctors], idx) => (
            <Grid item key={idx}>
              <Paper
                elevation={5}
                sx={{
                  width: 220,
                  height: 200,
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#37474f", // Dark grey-blue
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
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
                  <AccessibilityIcon fontSize="medium" />
                </Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "#ffffff", mb: 1 }}
                >
                  {dept}
                </Typography>
                <Box
                  sx={{
                    maxHeight: 80,
                    overflowY: "auto",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {doctors.map((name, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ color: "#cfd8dc" }}
                    >
                      Dr. {name}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
{/* Working Hours Section */}
<Divider sx={{ my: 4, backgroundColor: "white" }} />
<Typography
  variant="h4"
  align="center"
  sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
>
  Working Hours
</Typography>
<Box sx={{ mt: 2, textAlign: "center" }}>
  <Typography variant="body2" sx={{ color: "#e0e0e0", mb: 0.5 }}>
    Monday – Friday: 9:00 AM – 5:00 PM
  </Typography>
  <Typography variant="body2" sx={{ color: "#e0e0e0", mb: 0.5 }}>
    Saturday: 9:00 AM – 1:00 PM
  </Typography>
  <Typography variant="body2" sx={{ color: "#ffcc80", fontWeight: 'bold' }}>
    Sunday & Public Holidays: Closed
  </Typography>
</Box>
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
          Email: support@cliniccare.com | Phone: +012345678901 | Address:
          21st Avenue, Technopark, Kerala.
        </Typography>
      </Container>
    </BackgroundLayout>
  );
};

export default AboutUs;
