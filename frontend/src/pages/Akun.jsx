import React from 'react';
import { useState } from 'react';
import { User, Edit, Save, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Akun = () => {
  // Sample user data
  const [userData, setUserData] = useState({
    nama: 'Arrasyid Atma Wijaya',
    nim: '11331104500001',
    jurusan: 'Teknik Informatika',
    angkatan: '2023',
    jenjang: 'S1'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({...userData});

  const handleEdit = () => {
    setEditData({...userData});
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({...editData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50 text-sm">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-5 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Akun Saya</h1>
              <p className="text-gray-600 text-sm">Kelola informasi akun Anda</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1">
              <User className="w-4 h-4 text-blue-600" />
              <div className="text-right">
                <div className="text-xs font-medium text-gray-900">{userData.nama}</div>
                <div className="text-[10px] text-gray-500">{userData.nim}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h2>
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  <Edit size={16} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    <Save size={16} />
                    Simpan
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-1 text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    <X size={16} />
                    Batal
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Nama Lengkap</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nama"
                      value={editData.nama}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900 p-2">{userData.nama}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">NIM</label>
                  <p className="text-sm font-medium text-gray-900 p-2">{userData.nim}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Jurusan</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="jurusan"
                      value={editData.jurusan}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900 p-2">{userData.jurusan}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Angkatan</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="angkatan"
                      value={editData.angkatan}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900 p-2">{userData.angkatan}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Jenjang</label>
                {isEditing ? (
                  <select
                    name="jenjang"
                    value={editData.jenjang}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                    <option value="D3">D3</option>
                    <option value="D4">D4</option>
                  </select>
                ) : (
                  <p className="text-sm font-medium text-gray-900 p-2">{userData.jenjang}</p>
                )}
              </div>
            </div>
          </div>

          <footer className="text-center text-gray-500 text-xs py-4">
            2025 Copyright SSO Racana Diponegoro
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Akun;