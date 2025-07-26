import React, { useState } from 'react';
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  ChevronDown,
  ChevronUp,
  Check,
  X
} from 'lucide-react';
import SidebarAdmin from '../components/SidebarAdmin';

const ManajemenUser = () => {
  // State untuk data user
  const [users, setUsers] = useState([
    {
      id: 1,
      nama: 'Arrasyid Atma Wijaya',
      nim: '11331104500001',
      email: 'arrasyid@student.undip.ac.id',
      jurusan: 'Teknik Informatika',
      angkatan: '2023',
      jenjang: 'S1',
      role: 'user',
      status: 'active'
    },
    {
      id: 2,
      nama: 'Budi Santoso',
      nim: '11331104500002',
      email: 'budi@student.undip.ac.id',
      jurusan: 'Sistem Informasi',
      angkatan: '2022',
      jenjang: 'S1',
      role: 'user',
      status: 'active'
    },
    {
      id: 3,
      nama: 'Citra Dewi',
      nim: '11331104500003',
      email: 'citra@student.undip.ac.id',
      jurusan: 'Teknik Elektro',
      angkatan: '2023',
      jenjang: 'S1',
      role: 'admin',
      status: 'active'
    }
  ]);

  // State untuk form tambah/edit user
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nama: '',
    nim: '',
    email: '',
    jurusan: '',
    angkatan: '',
    jenjang: 'S1',
    role: 'user',
    status: 'active'
  });

  // State untuk pencarian dan sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // State untuk expanded row
  const [expandedRow, setExpandedRow] = useState(null);

  // Fungsi untuk handle sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Fungsi untuk sorted items
  const sortedItems = () => {
    const sortableItems = [...users];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  };

  // Fungsi untuk filtered items
  const filteredItems = sortedItems().filter(user =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi CRUD
  const handleAddUser = () => {
    setFormData({
      id: null,
      nama: '',
      nim: '',
      email: '',
      jurusan: '',
      angkatan: '',
      jenjang: 'S1',
      role: 'user',
      status: 'active'
    });
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setFormData({ ...user });
    setShowForm(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.id) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === formData.id ? formData : user
      ));
    } else {
      // Create new user
      const newUser = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      setUsers([...users, newUser]);
    }
    
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { 
        ...user, 
        status: user.status === 'active' ? 'inactive' : 'active' 
      } : user
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50 text-sm">
      <SidebarAdmin />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-5 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Manajemen User</h1>
              <p className="text-gray-600 text-sm">Kelola data user yang terdaftar</p>
            </div>
            
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {/* Form Tambah/Edit User */}
          {showForm && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {formData.id ? 'Edit User' : 'Tambah User Baru'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">NIM</label>
                    <input
                      type="text"
                      name="nim"
                      value={formData.nim}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Jurusan</label>
                    <input
                      type="text"
                      name="jurusan"
                      value={formData.jurusan}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Angkatan</label>
                    <input
                      type="text"
                      name="angkatan"
                      value={formData.angkatan}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Jenjang</label>
                    <select
                      name="jenjang"
                      value={formData.jenjang}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                      <option value="D3">D3</option>
                      <option value="D4">D4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {formData.id ? 'Update User' : 'Tambah User'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Pencarian dan Filter */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cari user..."
                />
              </div>
              <button
                onClick={handleAddUser}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
              >
                <Plus size={16} /> Tambah User
              </button>
            </div>
          </div>

          {/* Tabel User */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('nama')}
                    >
                      <div className="flex items-center">
                        Nama
                        {sortConfig.key === 'nama' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('nim')}
                    >
                      <div className="flex items-center">
                        NIM
                        {sortConfig.key === 'nim' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('role')}
                    >
                      <div className="flex items-center">
                        Role
                        {sortConfig.key === 'role' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortConfig.key === 'status' && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        Tidak ada user ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((user) => (
                      <React.Fragment key={user.id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.nama}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.nim}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleStatus(user.id)}
                              className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {user.status === 'active' ? (
                                <Check size={12} />
                              ) : (
                                <X size={12} />
                              )}
                              {user.status}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              onClick={() => setExpandedRow(expandedRow === user.id ? null : user.id)}
                              className="ml-3 text-gray-500 hover:text-gray-700"
                              title="Detail"
                            >
                              {expandedRow === user.id ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          </td>
                        </tr>
                        {expandedRow === user.id && (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500">Jurusan</p>
                                  <p className="text-sm">{user.jurusan}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Angkatan</p>
                                  <p className="text-sm">{user.angkatan}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Jenjang</p>
                                  <p className="text-sm">{user.jenjang}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="text-center text-gray-500 text-xs py-4">
            2025 Copyright SSO Racana Diponegoro - Admin Panel
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ManajemenUser;