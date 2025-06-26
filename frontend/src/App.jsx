<<<<<<< Updated upstream
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddDoctor from "./pages/admin/AddDoctor"
import DoctorList from "./pages/admin/DoctorList"
import AppointmentDetails from "./pages/admin/AppointmentDetails"
import Messages from "./pages/admin/Messages"
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
>>>>>>> Stashed changes

import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import AppointmentDetails from "./pages/admin/AppointmentDetails";
import Messages from "./pages/admin/Messages";

import PatientLayout from './pages/Patient/PatientLayout';
import Dashboard from './pages/Patient/Dashboard';
import AppointmentHistory from './pages/Patient/AppointmentHistory';
import ViewPrescription from './pages/Patient/ViewPrescription';
import BookAppointment from "./pages/Patient/BookAppointment";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
<<<<<<< Updated upstream
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="p-6 w-full">
          <Routes>
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/add-doctor" element={<AddDoctor />} />
            <Route path="/admin/doctor-list" element={<DoctorList/>}/>
            <Route path="/admin/appointment-details" element={<AppointmentDetails/>}/>
          </Routes>
        </div>
      </div>   </BrowserRouter>
    </>
  )
=======
        <Routes>

          {/* ✅ Patient layout wrapper */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route path="/patient/dashboard" element={<Dashboard />} />
            <Route path="/patient/book" element={<BookAppointment />} />
            <Route path="/patient/history" element={<AppointmentHistory />} />
            <Route path="/patient/prescriptions" element={<ViewPrescription />} />
          </Route>

          {/* ✅ Admin routes (outside of PatientLayout) */}
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/add-doctor" element={<AddDoctor />} />
          <Route path="/admin/doctor-list" element={<DoctorList />} />
          <Route path="/admin/appointment-details" element={<AppointmentDetails />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
>>>>>>> Stashed changes
}

export default App;
