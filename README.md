# 🏥 Doctor Appointment Booking System

A role-based full-stack web application developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** for seamless clinic appointment management. The system automates patient bookings, doctor consultations, and admin-level control through secure login and dashboards for each role.

---

## 📽️ Demo Video  
🎬 Watch here: *https://drive.google.com/file/d/1NxeqTFPM3D5QNHggbkDmu1GHwJf5CpXh/view?usp=sharing*

---

## 📌 Project Objective

To develop a scalable, secure, and efficient web-based doctor appointment booking platform that supports role-based access, prescription management, and appointment control for clinics.

---

## 👨‍⚕️ User Roles & Capabilities

### 🧑‍💼 Admin
- Login with admin credentials
- Add/delete doctors and assign credentials
- View all appointments, doctors, and patients
- View contact form messages
- Has all doctor privileges

### 🧑‍⚕️ Doctor
- Login via admin-created account
- View today’s appointments
- Add prescriptions only for confirmed appointments scheduled for today
- View prescription history of patients
- Cancel appointments

### 🧑 Patient
- Signup and login
- Book and cancel appointments
- View own prescription history

---

## 🚀 Key Features

- ✅ **Role-Based Login** (Patient / Doctor / Admin)
- 🗓️ **Appointment Booking** with department and doctor selection
- 📉 **Daily Appointment Limit** for each doctor
- ❌ **Smart Cancellation:** Patients can cancel only before 24 hours
- 💊 **Prescription Module**: Doctors can add prescriptions only for valid appointments
- 🧑‍⚕️ **Doctor Management**: Admin adds/removes doctors and sets departments
- 📨 **Enquiry Form**: Contact form on homepage
- 🔒 **Route Protection**: JWT-based token security per role
- 🧠 **Dynamic Dashboards**: Custom dashboard for each user role

---

## 🧠 Core Logic Rules

| Rule | Description |
|------|-------------|
| 🔢 Daily Limit | Each doctor can only take a set number of appointments per day |
| ❌ Cancellation | Only allowed more than 24 hours before appointment |
| 🗒️ Prescription | Doctors can add prescriptions only for today's valid appointments |
| 👀 Access | Only doctor and respective patient can view the prescription |

---

## 🧪 Tech Stack

| Layer      | Tech Used                    |
|------------|------------------------------|
| Frontend   | React.js, Material UI (MUI)  |
| Backend    | Node.js, Express.js          |
| Database   | MongoDB (MongoDB Atlas)      |
| Auth       | JWT, bcrypt                  |
| Tools      | Postman, GitHub              |

---

## 👥 Contributors

- [Ayana Joy](https://github.com/ayanajoy)
- [Bhadra M U](https://github.com/bhadra-unni)
- [Febina K A](https://github.com/febieeh)
- [Gayathri K](https://github.com/Gayathri011104)
- [Kavya T R](https://github.com/kavya544)
