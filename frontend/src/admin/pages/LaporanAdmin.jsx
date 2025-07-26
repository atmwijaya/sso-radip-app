import React from 'react';
import ComingSoon from '../components/ComingSoon';
import SidebarAdmin from "../components/SidebarAdmin";

const LaporanAdmin = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-base">
      {/* Sidebar */}
      <SidebarAdmin />
      
      {/* Main Content */}
      <ComingSoon />
    </div>
  );
}

export default LaporanAdmin;