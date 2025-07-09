import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import AppointmentDetails from "./pages/admin/AppointmentDetails";
import Messages from "./pages/admin/Messages";
import PatientList from "./pages/admin/PatientList";
import Dashboard2 from './pages/admin/Dashboard2';
import SendEmail from "./pages/admin/SendEmail";

import PatientLayout from './pages/Patient/PatientLayout';
import Dashboard from './pages/Patient/Dashboard';
import AppointmentHistory from './pages/Patient/AppointmentHistory';
import ViewPrescription from './pages/Patient/ViewPrescription';
import BookAppointment from "./pages/Patient/BookAppointment";

import PatientLogin from "./pages/auth/PatientLogin";
import PatientSignup from "./pages/auth/PatientSignUp";
import DoctorLogin from "./pages/auth/DoctorLogin";

import AdminLogin from "./pages/auth/AdminLogin";
import ContactUs from "./pages/auth/ContactUs";
import HomePage from "./pages/auth/HomePage";
import AboutUs from "./pages/auth/AboutUs";

import DoctorDashboard from "./pages/doctors/DoctorDashboard";
import DoctorHome from "./pages/doctors/DoctorHome";
import Appointments from "./pages/doctors/Appointments";
import Prescription from "./pages/doctors/Prescription";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>

          {/* ✅ Patient Routes (Nested inside PatientLayout) */}
          <Route path="/patient" element={<ProtectedRoute role="patient"><PatientLayout /></ProtectedRoute>}>
  <Route index element={<Dashboard />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="book" element={<BookAppointment />} />
  <Route path="history" element={<AppointmentHistory />} />
  <Route path="prescriptions" element={<ViewPrescription />} />
</Route>


          {/* ✅ Admin Routes (Protected + Nested) */}
          <Route path="/admin" element={<ProtectedRoute role="admin" />}>
            <Route path="dashboard" element={<Dashboard2 />} />
            <Route path="patient-list" element={<PatientList />} />
            <Route path="messages" element={<Messages />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="doctor-list" element={<DoctorList />} />
            <Route path="appointment-details" element={<AppointmentDetails />} />
            <Route path="send-email/:email" element={<SendEmail />} />
          </Route>

          {/* ✅ Doctor Routes */}
          <Route path="/doctor" element={<ProtectedRoute role="doctor" />}>
            <Route path="dashboard" element={<DoctorDashboard><DoctorHome /></DoctorDashboard>} />
            <Route path="appointments" element={<DoctorDashboard><Appointments /></DoctorDashboard>} />
            <Route path="prescriptions" element={<DoctorDashboard><Prescription /></DoctorDashboard>} />
          </Route>

          {/* ✅ Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/signup/patient" element={<PatientSignup />} />
          <Route path="/login/doctor" element={<DoctorLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
