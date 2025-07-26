import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home,
  Mail,
  User,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const Menus = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { title: "Pesan", icon: <Mail size={20} />, path: "/pesan" },
    { title: "Akun", icon: <User size={20} />, gap: true, path: "/akun" },
    { title: "Kalender", icon: <Calendar size={20} />, path: "/kalender" },
    { title: "Keluar", icon: <Settings size={20} />, path: "#" },
  ];

  const handleMenuClick = (path, title) => {
    if (title === "Keluar") {
      setShowLogoutModal(true);
    } else {
      navigate(path);
    }
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log("User logged out");
    navigate("/login");
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="flex">
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Keluar</h3>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin keluar dari sistem?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${open ? "w-72" : "w-20"} bg-[#0F335C] h-screen p-5 pt-8 relative duration-300`}
      >
        {/* Toggle Button */}
        <div 
          onClick={() => setOpen(!open)}
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 flex items-center justify-center bg-[#0F335C] border-2 border-white rounded-full ${!open && "rotate-180"}`}
        >
          {open ? (
            <ChevronLeft className="w-4 h-4 text-white" />
          ) : (
            <ChevronRight className="w-4 h-4 text-white" />
          )}
        </div>
        
        {/* Logo Section */}
        <div 
          className="flex gap-x-4 items-center cursor-pointer mb-6"
          onClick={handleLogoClick}
        >
          <img
            src="./src/assets/Radip.png"
            className="w-10 h-10"
            alt="Logo Racana Diponegoro"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Sistem Informasi Pramuka UNDIP
          </h1>
        </div>
        
        {/* Navigation Menu */}
        <ul className="pt-2">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(Menu.path, Menu.title)}
              className={`flex rounded-md p-2 cursor-pointer text-sm items-center gap-x-4 transition-all
                ${Menu.gap ? "mt-4" : "mt-2"} 
                ${
                  location.pathname === Menu.path 
                    ? "bg-blue-700 text-white border-l-4 border-yellow-400"
                    : Menu.title === "Keluar" 
                      ? "text-gray-300 hover:bg-red-800 hover:text-white"
                      : "text-gray-300 hover:bg-blue-800 hover:text-white"
                }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {Menu.icon}
              </div>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;