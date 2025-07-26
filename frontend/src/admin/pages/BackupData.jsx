import React from 'react';
import ComingSoon from '../components/ComingSoon';
import SidebarAdmin from "../components/SidebarAdmin";

const BackupData = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-base">
      {/* Sidebar */}
      <SidebarAdmin />
      
      {/* Main Content */}
      <ComingSoon/>
    </div>
  );
}

export default BackupData;