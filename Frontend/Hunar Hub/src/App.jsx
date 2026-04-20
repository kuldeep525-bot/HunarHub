import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import WorkerDetail from './pages/Workerdetail'
import Booking from './pages/Booking'
import Footer from './components/Footer'


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
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App