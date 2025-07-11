import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import { Group, Person, EventNote } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import axios from '../axios';


const Dashboard = () => {
  const navigate = useNavigate();

  const [doctorList, setDoctorList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
        axios.get(`/doctors`),
        axios.get(`/patients`),
        axios.get(`/appointments`),
      ]);

      setDoctorList(doctorsRes.data);
      setPatientList(patientsRes.data);


      const relevantAppointments = appointmentsRes.data.filter(
        appt => appt.status === 'Confirmed' || appt.status === 'Completed'
      );
      setAppointmentList(relevantAppointments);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  fetchData();
}, []);



  const cardData = [
    {
      icon: <Group sx={{ fontSize: 50, color: '#5A5AFA' }} />,
      title: 'Total Doctors',
      value: doctorList.length,
      path: '/admin/doctor-list',
    },
    {
      icon: <Person sx={{ fontSize: 50, color: '#5A5AFA' }} />,
      title: 'Total Patients',
      value: patientList.length,
      path: '/admin/patient-list',
    },
    {
      icon: <EventNote sx={{ fontSize: 50, color: '#5A5AFA' }} />,
      title: 'Appointments',
      value: appointmentList.length,
      path: '/admin/appointment-details',
    }
  ];

  return (
    <AdminLayout>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  py: 4,
                  cursor: 'pointer',
                  borderRadius: 4,
                  transition: '0.3s ease-in-out',
                  boxShadow: '0 4px 12px rgba(90, 90, 250, 0.2)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(90, 90, 250, 0.3)',
                    transform: 'translateY(-4px)',
                  },
                  backgroundColor: '#fff',
                }}
                onClick={() => navigate(card.path)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" color="text.primary">
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;
