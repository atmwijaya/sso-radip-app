import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard';
import Pesan from './pages/Pesan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pesan" element={<Pesan />} />
      </Routes>
    </Router>
  )
}

export default App;
