import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import KycSubmission from './components/KycSubmission';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';
import KycListPage from './components/KycList';
import Dashboard from './components/AdminLayout';
import UpdateKyc from './components/UpdateKyc';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Dashboard />} />
        <Route path="/kyc-listed" element={<KycListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submit-kyc" element={<KycSubmission />} />
        <Route path="/update-kyc/:id" element={<UpdateKyc />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
