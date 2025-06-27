
import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const team = [
  {
    name: 'Dr. Ravi Sharma',
    specialization: 'Cardiologist',
    bio: 'Dr. Sharma brings 15+ years of experience in heart care and patient-centered treatment.',
    avatar: 'https://i.pravatar.cc/150?img=10'
  },
  {
    name: 'Dr. Neha Singh',
    specialization: 'Neurologist',
    bio: 'Specializing in neurological disorders, Dr. Singh is committed to accurate diagnosis and rehabilitation.',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    name: 'Dr. Arjun Mehta',
    specialization: 'Orthopedic Surgeon',
    bio: 'Dr. Mehta is known for advanced surgical precision and compassion in orthopedic treatments.',
    avatar: 'https://i.pravatar.cc/150?img=32'
  },
];

const AboutUs = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: '#f6f9fc', minHeight: '100vh' }}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          About ClinicCare+
        </Typography>
        <br/><br/>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ClinicCare+ is a next-generation digital health platform designed to streamline communication, simplify patient management, and improve health outcomes. Our mission is to empower doctors and patients with a transparent, secure, and user-friendly clinical experience.
        </Typography>
        <br/><br/>
        <Divider sx={{ mb: 3 }} />
        <br/><br/>
        <Typography variant="h5" color="primary" gutterBottom>
          Our Vision
        </Typography>
        <br/><br/>
        <Typography variant="body2" sx={{ mb: 2 }}>
          To revolutionize outpatient care by offering personalized digital health solutions that prioritize accessibility, efficiency, and empathy.
        </Typography>
        <br/><br/>
        <Typography variant="h5" color="primary" gutterBottom>
          Meet Our Doctors
        </Typography>
        <br/><br/>
        <Grid container spacing={10} sx={{ mt: 1 }}>
          {team.map((doc, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: 3,
                  textAlign: 'center',
                  p: 2,
                  height: '100%'
                }}
              ><br/><br/>
                <Avatar
                  alt={doc.name}
                  src={doc.avatar}
                  sx={{ width: 80, height: 80, margin: 'auto', mb: 1 }}
                />
                <Typography variant="h6" gutterBottom>
                  {doc.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {doc.specialization}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {doc.bio}
                </Typography>
              </Card>
                <br/><br/>
            </Grid>
          ))}
        </Grid>
          <br/><br/>
        <Divider sx={{ mt: 4, mb: 2 }} /><br/><br/>

        <Typography variant="h5" color="primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body2">
          Email: support@cliniccare.com | Phone: +91 98765 43210 | Address: 21st Avenue, Technopark, Kerala.
        </Typography>
      </Card>
    </Box>
  );
};

export default AboutUs;
