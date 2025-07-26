import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { 
  Users, 
  FileText, 
  Database, 
  Shield,
  BarChart2,
  AlertCircle,
  Clock,
  Settings
} from 'lucide-react';

const DashboardAdmin = () => {
  // Data statistik dummy
  const stats = [
    { title: "Total Pengguna", value: "1,245", icon: <Users size={24} />, color: "bg-blue-100", textColor: "text-blue-600" },
    { title: "Laporan Baru", value: "24", icon: <FileText size={24} />, color: "bg-green-100", textColor: "text-green-600" },
    { title: "Backup Terakhir", value: "2 Jam", icon: <Database size={24} />, color: "bg-purple-100", textColor: "text-purple-600" },
    { title: "Aktivitas Mencurigakan", value: "3", icon: <Shield size={24} />, color: "bg-red-100", textColor: "text-red-600" }
  ];

  // Aktivitas terbaru
  const recentActivities = [
    { id: 1, user: "Admin", action: "Memperbarui pengaturan sistem", time: "5 menit lalu", icon: <Settings size={16} /> },
    { id: 2, user: "User123", action: "Mengupload dokumen baru", time: "12 menit lalu", icon: <FileText size={16} /> },
    { id: 3, user: "System", action: "Backup otomatis dilakukan", time: "2 jam lalu", icon: <Database size={16} /> },
    { id: 4, user: "Admin", action: "Menghapus user tidak aktif", time: "3 jam lalu", icon: <Users size={16} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
        
        {/* Statistik Cepat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className={`p-3 rounded-full ${stat.color} ${stat.textColor} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dua Kolom Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Grafik dan Notifikasi */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grafik Aktivitas */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Aktivitas Sistem</h2>
                <select className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>7 Hari Terakhir</option>
                  <option>30 Hari Terakhir</option>
                  <option>90 Hari Terakhir</option>
                </select>
              </div>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <BarChart2 size={48} className="text-gray-400" />
                <p className="ml-2 text-gray-500">Grafik aktivitas akan muncul di sini</p>
              </div>
            </div>
            
            {/* Notifikasi Sistem */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Notifikasi Sistem</h2>
              <div className="space-y-4">
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle size={20} className="text-yellow-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Pembaruan Sistem Tersedia</p>
                    <p className="text-sm text-gray-600">Versi 2.3.1 tersedia untuk diinstall</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <AlertCircle size={20} className="text-blue-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Backup Database</p>
                    <p className="text-sm text-gray-600">Backup otomatis akan dilakukan malam ini</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Kolom Kanan - Aktivitas Terbaru */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="p-2 bg-gray-100 rounded-full mr-3">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium">
              Lihat Semua Aktivitas
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center">
              <Users size={24} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium">Kelola User</span>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg flex flex-col items-center">
              <FileText size={24} className="text-green-600 mb-2" />
              <span className="text-sm font-medium">Buat Laporan</span>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex flex-col items-center">
              <Database size={24} className="text-purple-600 mb-2" />
              <span className="text-sm font-medium">Backup Data</span>
            </button>
            <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg flex flex-col items-center">
              <Shield size={24} className="text-red-600 mb-2" />
              <span className="text-sm font-medium">Pengaturan Keamanan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;