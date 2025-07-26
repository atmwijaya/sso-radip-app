import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import { 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';

const PesanAdmin = () => {
  // State untuk data pesan
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State untuk form
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    recipient: '',
    subject: '',
    content: ''
  });
  
  // State untuk popup
  const [showPopup, setShowPopup] = useState({
    edit: false,
    delete: false,
    message: null
  });
  
  // State untuk pencarian dan pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  // Simulasi fetch data dari API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Simulasi API call
        // const response = await fetch('/api/admin/messages');
        // const data = await response.json();
        
        // Data dummy untuk simulasi
        const dummyData = [
          { id: 1, recipient: 'user1@undip.ac.id', subject: 'Informasi Kegiatan', content: 'Kegiatan akan dilaksanakan pada tanggal 15 Juni', date: '2023-05-20' },
          { id: 2, recipient: 'user2@undip.ac.id', subject: 'Pembayaran Iuran', content: 'Segera lakukan pembayaran iuran bulan ini', date: '2023-05-18' },
          { id: 3, recipient: 'user3@undip.ac.id', subject: 'Pelatihan Pramuka', content: 'Pendaftaran pelatihan dibuka hingga 30 Mei', date: '2023-05-15' },
          { id: 4, recipient: 'user4@undip.ac.id', subject: 'Rapat Rutin', content: 'Akan ada rapat rutin hari Jumat', date: '2023-05-10' },
          { id: 5, recipient: 'user5@undip.ac.id', subject: 'Update Sistem', content: 'Akan ada maintenance sistem besok', date: '2023-05-05' },
        ];
        
        setMessages(dummyData);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data pesan');
        setLoading(false);
        console.error('Error fetching messages:', err);
      }
    };
    
    fetchMessages();
  }, []);

  // Fungsi CRUD
  const handleCreateMessage = () => {
    setFormData({
      id: null,
      recipient: '',
      subject: '',
      content: ''
    });
    setShowForm(true);
  };

  const handleEditClick = (message) => {
    setFormData({
      id: message.id,
      recipient: message.recipient,
      subject: message.subject,
      content: message.content
    });
    setShowPopup({ ...showPopup, edit: true, message });
  };

  const handleDeleteClick = (message) => {
    setShowPopup({ ...showPopup, delete: true, message });
  };

  const confirmEdit = () => {
    setMessages(messages.map(msg => 
      msg.id === formData.id ? formData : msg
    ));
    setShowPopup({ ...showPopup, edit: false });
    setShowForm(false);
  };

  const confirmDelete = () => {
    setMessages(messages.filter(msg => msg.id !== showPopup.message.id));
    setShowPopup({ ...showPopup, delete: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.id) {
      // Update existing message
      setMessages(messages.map(msg => 
        msg.id === formData.id ? formData : msg
      ));
    } else {
      // Create new message
      const newMessage = {
        ...formData,
        id: messages.length + 1,
        date: new Date().toISOString().split('T')[0]
      };
      setMessages([newMessage, ...messages]);
    }
    
    // Reset form
    setFormData({
      id: null,
      recipient: '',
      subject: '',
      content: ''
    });
    setShowForm(false);
  };

  // Fungsi pencarian
  const filteredMessages = messages.filter(message =>
    message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Mail className="mr-2" /> Manajemen Pesan
          </h1>
          <button
            onClick={handleCreateMessage}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={18} className="mr-1" /> Buat Pesan Baru
          </button>
        </div>

        {/* Form Pesan Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-lg font-semibold">
                  {formData.id ? 'Edit Pesan' : 'Buat Pesan Baru'}
                </h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Penerima</label>
                    <input
                      type="email"
                      value={formData.recipient}
                      onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="user@undip.ac.id"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Subjek pesan"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Isi Pesan</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows="5"
                      placeholder="Tulis isi pesan di sini..."
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
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
                    {formData.id ? 'Update Pesan' : 'Kirim Pesan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Popup Edit Konfirmasi */}
        {showPopup.edit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-lg font-semibold">Konfirmasi Perubahan</h2>
                <button 
                  onClick={() => setShowPopup({ ...showPopup, edit: false })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <p className="mb-4">Anda yakin ingin menyimpan perubahan pada pesan ini?</p>
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="font-medium">Penerima: {formData.recipient}</p>
                  <p className="font-medium">Subjek: {formData.subject}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowPopup({ ...showPopup, edit: false })}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Check size={18} className="mr-1" /> Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popup Hapus Konfirmasi */}
        {showPopup.delete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-lg font-semibold">Konfirmasi Penghapusan</h2>
                <button 
                  onClick={() => setShowPopup({ ...showPopup, delete: false })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-start mb-4">
                  <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" />
                  <p>Anda yakin ingin menghapus pesan ini? Aksi ini tidak dapat dibatalkan.</p>
                </div>
                <div className="bg-red-50 p-3 rounded-md mb-4 border border-red-100">
                  <p className="font-medium text-red-800">Penerima: {showPopup.message?.recipient}</p>
                  <p className="text-red-700">Subjek: {showPopup.message?.subject}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowPopup({ ...showPopup, delete: false })}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  >
                    <Trash2 size={18} className="mr-1" /> Hapus Pesan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pencarian */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari pesan..."
            />
          </div>
        </div>

        {/* Daftar Pesan */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Memuat data...</div>
          ) : error ? (
            <div className="p-6 text-red-500">{error}</div>
          ) : currentMessages.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Tidak ada pesan ditemukan</div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penerima</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjek</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{message.recipient}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{message.subject}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{message.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{message.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(message)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(message)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Menampilkan <span className="font-medium">{indexOfFirstMessage + 1}</span> -{' '}
                        <span className="font-medium">
                          {Math.min(indexOfLastMessage, filteredMessages.length)}
                        </span>{' '}
                        dari <span className="font-medium">{filteredMessages.length}</span> pesan
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === number
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                        <button
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PesanAdmin;