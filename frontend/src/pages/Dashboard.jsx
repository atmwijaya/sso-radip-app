import React from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Inbox, 
  Users,
  User
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Dashboard card component
  const DashboardCard = ({ title, subtitle, icon, empty = false, Link }) => {
    if (empty) {
      return (
        <div className="bg-white rounded-lg shadow p-4 h-full flex items-center justify-center border border-gray-200 min-h-[120px]">
          <div className="text-gray-400 text-sm">Coming Soon</div>
        </div>
      );
    }
    
    return (
      <a 
      href={Link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white rounded-lg shadow p-4 h-full border border-gray-200 min-h-[120px] hover:shadow-md transition-shadow"
    >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-full mt-1">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-base">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
      </a>
    );
  };

  const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      return 'Selamat pagi';
    } else if (hour >= 11 && hour < 15) {
      return 'Selamat siang';
    } else if (hour >= 15 && hour < 19) {
      return 'Selamat sore';
    } else {
      return 'Selamat malam';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-base">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-5 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-base">{getTimeBasedGreeting()} Kak Arrasyid!</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1">
              <User className="w-7 h-7 text-blue-600" />
              <div className="text-right">
                <div className="text-m font-medium text-gray-900">Arrasyid Atma Wijaya</div>
                <div className="text-[14px] text-gray-500">11331104500001</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Kegiatan Section */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Kegiatan</h2>
            <div className="bg-white rounded-lg shadow p-4 h-40 border border-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-base">Activity content will appear here</div>
            </div>
          </section>

          {/* Berita dan Sosial Media Section */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Berita dan Sosial Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DashboardCard
                title="Laman Informasi"
                subtitle="Information Website"
                icon={<Globe className="w-5 h-5" />}
                Link="https://racana.ukm.undip.ac.id"
              />
              <DashboardCard empty />
            </div>
          </section>

          {/* Aplikasi & Layanan Section */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Aplikasi & Layanan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DashboardCard
                title="Jenjang Kepandegaan"
                subtitle="Rent"
                icon={<ShoppingBag className="w-5 h-5" />}
              />
              <DashboardCard
                title="Persewaan Barang"
                subtitle="Rent"
                icon={<Users className="w-5 h-5" />}
              />
              <DashboardCard
                title="Database Anggota"
                subtitle="Members Database"
                icon={<Users className="w-5 h-5" />}
              />
              <DashboardCard
                title="Kotak Saran"
                subtitle="Suggestion box"
                icon={<Inbox className="w-5 h-5" />}
              />
              <DashboardCard empty />
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-500 text-xs py-4">
            2025 Copyright SSO Racana Diponegoro
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;