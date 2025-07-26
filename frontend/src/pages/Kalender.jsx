import React from 'react';
import { useState } from 'react';
import { Calendar, Clock, CheckCircle, ChevronDown, ChevronRight, ChevronLeft, ChevronRight as RightIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Kalender = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample event data
  const events = [
    {
      id: 1,
      title: "Latihan Rutin Mingguan",
      date: new Date(2025, 5, 15), // June 15, 2025
      time: "15:00 - 17:00 WIB",
      location: "Lapangan Racana",
      description: "Latihan rutin untuk persiapan kegiatan besar berikutnya",
      status: "ongoing"
    },
    {
      id: 2,
      title: "Pembukaan Penerimaan Anggota Baru",
      date: new Date(2025, 5, 20), // June 20, 2025
      time: "08:00 - 12:00 WIB",
      location: "Aula Gedung Racana",
      description: "Pembukaan pendaftaran anggota baru periode 2025/2026",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Pelantikan Anggota",
      date: new Date(2025, 4, 10), // May 10, 2025
      time: "13:00 - 15:00 WIB",
      location: "Auditorium Kampus",
      description: "Pelantikan anggota baru periode 2024/2025",
      status: "past"
    },
    {
      id: 4,
      title: "Kemah Bakti",
      date: new Date(2025, 6, 25), // July 25, 2025
      time: "08:00 - 18:00 WIB",
      location: "Bumi Perkemahan Gunung Lawu",
      description: "Kegiatan kemah bakti tahunan Racana Diponegoro",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Rapat Evaluasi Bulanan",
      date: new Date(2025, 5, 5), // June 5, 2025
      time: "19:00 - 21:00 WIB",
      location: "Sekretariat Racana",
      description: "Evaluasi kegiatan bulan Mei dan rencana bulan Juni",
      status: "ongoing"
    }
  ];

  // Navigate between months
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const toggleEvent = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  // Generate calendar view
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                       "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    
    let days = [];
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(year, month, i);
      const hasEvent = events.some(event => 
        event.date.getDate() === currentDay.getDate() && 
        event.date.getMonth() === currentDay.getMonth() && 
        event.date.getFullYear() === currentDay.getFullYear()
      );
      
      const isToday = currentDay.toDateString() === new Date().toDateString();
      
      days.push(
        <div 
          key={`day-${i}`} 
          className={`h-8 w-8 flex items-center justify-center text-sm rounded-full cursor-pointer
                     ${hasEvent ? 'bg-blue-100 text-blue-600 font-medium' : ''}
                     ${isToday ? 'bg-blue-600 text-white font-bold' : ''}
                     hover:bg-gray-100`}
          onClick={() => console.log('Selected date:', currentDay)}
        >
          {i}
        </div>
      );
    }
    
    return (
      <div className="mb-6 bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[month]} {year}
          </h3>
          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
            <RightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
          {dayNames.map(day => (
            <div key={day} className="font-medium">{day.substring(0, 3)}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  // Categorize events by status
  const ongoingEvents = events.filter(event => event.status === "ongoing");
  const upcomingEvents = events.filter(event => event.status === "upcoming");
  const pastEvents = events.filter(event => event.status === "past");

  return (
    <div className="flex h-screen bg-gray-50 text-sm">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-5 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Kalender Kegiatan</h1>
              <p className="text-gray-600 text-sm">Jadwal kegiatan Racana Diponegoro</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1">
              <button onClick={prevMonth} className="text-gray-600 hover:text-blue-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-center">
                <div className="text-xs font-medium text-gray-900">
                  {new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(currentDate)}
                </div>
              </div>
              <button onClick={nextMonth} className="text-gray-600 hover:text-blue-600">
                <RightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {/* Big Calendar Component */}
          {renderCalendar()}
          
          {/* Ongoing Events */}
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Sedang Berlangsung
            </h2>
            <div className="bg-white rounded-lg shadow border border-gray-200 divide-y divide-gray-200">
              {ongoingEvents.length > 0 ? (
                ongoingEvents.map(event => (
                  <div key={event.id} className="p-4 hover:bg-gray-50">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleEvent(event.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <p className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} • {event.time}
                          </p>
                        </div>
                      </div>
                      {expandedEvent === event.id ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    {expandedEvent === event.id && (
                      <div className="mt-3 pl-11 pr-4">
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Lokasi:</span> {event.location}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {event.description}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Tidak ada kegiatan yang sedang berlangsung
                </div>
              )}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Akan Datang
            </h2>
            <div className="bg-white rounded-lg shadow border border-gray-200 divide-y divide-gray-200">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 hover:bg-gray-50">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleEvent(event.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <p className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} • {event.time}
                          </p>
                        </div>
                      </div>
                      {expandedEvent === event.id ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    {expandedEvent === event.id && (
                      <div className="mt-3 pl-11 pr-4">
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Lokasi:</span> {event.location}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {event.description}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Tidak ada kegiatan yang akan datang
                </div>
              )}
            </div>
          </section>

          {/* Past Events */}
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              Sudah Terlaksana
            </h2>
            <div className="bg-white rounded-lg shadow border border-gray-200 divide-y divide-gray-200">
              {pastEvents.length > 0 ? (
                pastEvents.map(event => (
                  <div key={event.id} className="p-4 hover:bg-gray-50">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleEvent(event.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <p className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} • {event.time}
                          </p>
                        </div>
                      </div>
                      {expandedEvent === event.id ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    {expandedEvent === event.id && (
                      <div className="mt-3 pl-11 pr-4">
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Lokasi:</span> {event.location}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {event.description}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Tidak ada kegiatan yang sudah terlaksana
                </div>
              )}
            </div>
          </section>

          <footer className="text-center text-gray-500 text-xs py-4">
            2025 Copyright SSO Racana Diponegoro
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Kalender;