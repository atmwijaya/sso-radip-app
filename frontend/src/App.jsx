import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard';
import Pesan from './pages/Pesan';
import Akun from './pages/Akun';
import LoginPage from './pages/Loginpage';
import Kalender from './pages/Kalender';
import DashboardAdmin from './admin/pages/DashboardAdmin';
import LoginAdmin from './admin/pages/LoginAdmin';
import PesanAdmin from './admin/pages/PesanAdmin';
import ManajemenUser from './admin/pages/ManajemenUser';
import KalenderAdmin from './admin/pages/KalenderAdmin';
import BackupData from './admin/pages/BackupData';
import LaporanAdmin from './admin/pages/LaporanAdmin';
import Tools from './admin/pages/Tools';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pesan" element={<Pesan />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kalender" element={<Kalender />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/sudo" element={<LoginAdmin />} />
        <Route path="/admin/pesan" element={<PesanAdmin />} />
        <Route path="/admin/manajemen-user" element={<ManajemenUser />} />
        <Route path="/admin/kalender" element={<KalenderAdmin />} />
        <Route path="/admin/backup" element={<BackupData />} />
        <Route path="/admin/laporan" element={<LaporanAdmin />} />
        <Route path="/admin/tools" element={<Tools />} />
      </Routes>
    </Router>
  )
}

export default App;
