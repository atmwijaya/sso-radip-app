import React from 'react';
import { useState } from 'react';
import { Inbox, ChevronDown, ChevronRight, Mail, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Pesan = () => {
  const [expandedMessage, setExpandedMessage] = useState(null);

  // Sample message data
  const messages = [
    {
      id: 1,
      from: 'Administrator',
      subject: 'Informasi Kegiatan Mendatang',
      date: '12 Juni 2025',
      content: 'Ada kegiatan rutin bulanan yang akan dilaksanakan pada tanggal 20 Juni 2025. Mohon konfirmasi kehadiran.',
      read: false
    },
    {
      id: 2,
      from: 'Admin Sistem',
      subject: 'Pembaruan Aplikasi',
      date: '5 Juni 2025',
      content: 'Aplikasi akan mengalami maintenance pada tanggal 15 Juni 2025 pukul 00:00-04:00 WIB.',
      read: true
    },
    {
      id: 3,
      from: 'Ketua Racana',
      subject: 'Rapat Evaluasi',
      date: '1 Juni 2025',
      content: 'Diinformasikan akan ada rapat evaluasi kegiatan pada hari Sabtu, 10 Juni 2025 pukul 13:00 WIB di sekretariat.',
      read: true
    }
  ];

  const toggleMessage = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
    
    // Mark as read when expanded
    if (expandedMessage !== id) {
      const updatedMessages = messages.map(msg => 
        msg.id === id ? {...msg, read: true} : msg
      );
      // In a real app, you would update state here
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-sm">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-5 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Inbox</h1>
              <p className="text-gray-600 text-sm">Pesan dari Administrator</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1">
              <User className="w-4 h-4 text-blue-600" />
              <div className="text-right">
                <div className="text-xs font-medium text-gray-900">Arrasyid Atma Wijaya</div>
                <div className="text-[10px] text-gray-500">11331104500001</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleMessage(message.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${!message.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.from}
                        </h3>
                        <p className="text-xs text-gray-500">{message.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${!message.read ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                        {message.subject}
                      </span>
                      {expandedMessage === message.id ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                  
                  {expandedMessage === message.id && (
                    <div className="mt-3 pl-11 pr-4">
                      <div className="text-sm text-gray-700 whitespace-pre-line">
                        {message.content}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                          Balas
                        </button>
                        <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
                          Tandai Belum Dibaca
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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

export default Pesan;