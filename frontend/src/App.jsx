import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import AppointmentDetails from "./pages/admin/AppointmentDetails";
import Messages from "./pages/admin/Messages";
import PatientList from "./pages/admin/PatientList";
import Dashboard2 from './pages/admin/Dashboard2';

import PatientLayout from './pages/Patient/PatientLayout';
import Dashboard from './pages/Patient/Dashboard';
import AppointmentHistory from './pages/Patient/AppointmentHistory';
import ViewPrescription from './pages/Patient/ViewPrescription';
import BookAppointment from "./pages/Patient/BookAppointment";

import PatientLogin from "./pages/auth/PatientLogin";
import PatientSignup from "./pages/auth/PatientSignUp";
import DoctorLogin from '/src/pages/auth/DoctorLogin.jsx';

import AdminLogin from "./pages/auth/AdminLogin";
import ContactUs from "./pages/auth/ContactUs";
import HomePage from "./pages/auth/HomePage";
import AboutUs from "./pages/auth/AboutUs";


import DoctorDashboard from "./pages/doctors/DoctorDashboard";
import DoctorHome from "./pages/doctors/DoctorHome";
import Appointments from "./pages/doctors/Appointments";
import Prescription from "./pages/doctors/Prescription";



function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>

          {/* ✅ Patient layout wrapper */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route path="/patient/dashboard" element={<Dashboard />} />
            <Route path="/patient/book" element={<BookAppointment />} />
            <Route path="/patient/history" element={<AppointmentHistory />} />
            <Route path="/patient/prescriptions" element={<ViewPrescription />} />
          </Route>

          {/* ✅ Admin routes (outside of PatientLayout) */}
           <Route path="/admin/dashboard" element={<Dashboard2 />} />
           <Route path="/admin/patient-list" element={<PatientList />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/add-doctor" element={<AddDoctor />} />
          <Route path="/admin/doctor-list" element={<DoctorList />} />
          <Route path="/admin/appointment-details" element={<AppointmentDetails />} />



          {/* ✅ Doctors route */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard><DoctorHome /></DoctorDashboard>} />
          <Route path="/doctor/appointments" element={<DoctorDashboard><Appointments /></DoctorDashboard>} />
          <Route path="/doctor/prescriptions" element={<DoctorDashboard><Prescription/></DoctorDashboard>} />


          {/*Login pages route(auth)*/}
              <Route path="/" element={<HomePage />} />
      <Route path="/patient/login" element={<PatientLogin />} />
      <Route path="/patient/signup" element={<PatientSignup/>} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/aboutus" element={<AboutUs />} />

        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
