import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard';
import Pesan from './pages/Pesan';
import Akun from './pages/Akun';
import LoginPage from './pages/Loginpage';
import Kalender from './pages/Kalender';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pesan" element={<Pesan />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kalender" element={<Kalender />} />
      </Routes>
    </Router>
  )
}

export default App;
