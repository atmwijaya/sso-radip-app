import React from 'react';

import { Construction } from 'lucide-react';

const ComingSoon = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Konten utama dengan padding kiri untuk mengkompensasi sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden pl-[16rem]"> {/* Sesuaikan pl-[16rem] dengan lebar sidebar Anda */}
        
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-5 py-3">
            <h1 className="text-lg font-bold text-gray-900">Under Construction</h1>
            <p className="text-gray-600 text-sm">Halaman ini sedang dalam pengembangan</p>
          </div>
        </header>

        {/* Main content - flex container untuk centering */}
        <main className="flex-1 flex items-center justify-center p-4">
          
          {/* Kotak Under Construction - sekarang benar-benar di tengah */}
          <div className="text-center w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
              <Construction className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Under Construction</h2>
            <p className="text-gray-600 mb-6">
              Halaman yang Anda coba akses sedang dalam pengembangan. Tim kami sedang bekerja keras untuk menyelesaikannya.
            </p>
            <div className="flex justify-center">
              <a 
                href="/admin/dashboard" 
                className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Kembali ke Dashboard
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-xs py-4">
          2025 Copyright SSO Racana Diponegoro - Admin Panel
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;