import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddDoctor from "./pages/admin/AddDoctor"
import DoctorList from "./pages/admin/DoctorList"
import AppointmentDetails from "./pages/admin/AppointmentDetails"
import Messages from "./pages/admin/Messages"
import AppointmentHistory from "./pages/Patient/AppointmentHistory"


function App() {

  return (
    <>
      <BrowserRouter>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="p-6 w-full">
          <Routes>
            <Route path="/patient/history" element={<AppointmentHistory/>}/>
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/add-doctor" element={<AddDoctor />} />
            <Route path="/admin/doctor-list" element={<DoctorList/>}/>
            <Route path="/admin/appointment-details" element={<AppointmentDetails/>}/>
          </Routes>
        </div>
      </div>   </BrowserRouter>
    </>
  )
}

export default App
