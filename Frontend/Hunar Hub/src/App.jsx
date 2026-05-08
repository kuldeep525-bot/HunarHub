import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import WorkerDetail from './pages/Workerdetail'
import Booking from './pages/Booking'
import Footer from './components/Footer'
import UserDashboard from './pages/UserDashoboard'
import WorkerDashboard from './pages/Worker.dashboard'
import { useAuth } from "./context/AuthContext"
import { Navigate } from "react-router-dom"

// Worker protected route
function WorkerRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.role !== "worker") return <Navigate to="/" />
  return children
}



function App() {
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/worker/:workerId" element={<WorkerDetail/>}/>
    <Route path="/booking/:workerId" element={<Booking />} />
    <Route path="/dashboard" element={<UserDashboard/>}/>
    <Route path="/worker-dashboard" element={<WorkerRoute>
    <WorkerDashboard />
  </WorkerRoute>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App