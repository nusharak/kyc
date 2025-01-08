import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import KycApplications from './KycApplications';

function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kyc-applications" element={<KycApplications />} />
        
        {/* Redirect to /dashboard if no specific path is provided */}
        <Route path="/" element={<Navigate to="/admin-dashboard/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminDashboard;
