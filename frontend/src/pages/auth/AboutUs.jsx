import React from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Grid,
  Divider,
  Container,
} from "@mui/material";// adjust if needed
import BackgroundLayout from "./BackgroundLayout"; // adjust if needed

const team = [
  {
    name: "Dr. Ravi Sharma",
    specialization: "Cardiologist",
    bio: "Dr. Sharma brings 15+ years of experience in heart care and patient-centered treatment.",
    
  },
  {
    name: "Dr. Neha Singh",
    specialization: "Neurologist",
    bio: "Specializing in neurological disorders, Dr. Singh is committed to accurate diagnosis and rehabilitation.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Dr. Arjun Mehta",
    specialization: "Orthopedic Surgeon",
    bio: "Dr. Mehta is known for advanced surgical precision and compassion in orthopedic treatments.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

const AboutUs = () => {
  return (
    <>
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
              mb: 4,
              mt: 2,
              fontSize: "1.1rem",
              textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              textAlign: "center",
            }}
          >
            ClinicCare+ is a next-generation digital health platform designed to
            streamline communication, simplify patient management, and improve
            health outcomes. Our mission is to empower doctors and patients with
            a transparent, secure, and user-friendly clinical experience.
          </Typography>

          <Divider sx={{ my: 4, backgroundColor: "white" }} />

          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
          >
            Meet Our Doctors
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {team.map((doc, index) => (
              <Grid
                item
                xs={12}
                key={index}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "center",
                    backgroundColor: "#e3f2fd",
                    color: "black",
                    borderRadius: 3,
                    p: 3,
                    boxShadow: 4,
                  }}
                >
                  
                  <Typography variant="h6" fontWeight="bold">
                    {doc.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {doc.specialization}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {doc.bio}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

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
    </>
  );
};

export default AboutUs;
