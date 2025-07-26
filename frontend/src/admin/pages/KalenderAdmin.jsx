import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  AlertTriangle
} from 'lucide-react';
import SidebarAdmin from "../components/SidebarAdmin";

const KalenderAdmin = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    date: new Date(),
    startTime: '08:00',
    endTime: '09:00',
    location: '',
    description: '',
    status: 'upcoming'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Sample event data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Latihan Rutin Mingguan",
      date: new Date(2025, 5, 15),
      startTime: "15:00",
      endTime: "17:00",
      location: "Lapangan Racana",
      description: "Latihan rutin untuk persiapan kegiatan besar berikutnya",
      status: "ongoing"
    },
    {
      id: 2,
      title: "Pembukaan Penerimaan Anggota Baru",
      date: new Date(2025, 5, 20),
      startTime: "08:00",
      endTime: "12:00",
      location: "Aula Gedung Racana",
      description: "Pembukaan pendaftaran anggota baru periode 2025/2026",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Pelantikan Anggota",
      date: new Date(2025, 4, 10),
      startTime: "13:00",
      endTime: "15:00",
      location: "Auditorium Kampus",
      description: "Pelantikan anggota baru periode 2024/2025",
      status: "past"
    }
  ]);

  // Update event statuses based on current date
  useEffect(() => {
    const now = new Date();
    setEvents(prevEvents => 
      prevEvents.map(event => {
        const eventDate = new Date(event.date);
        const eventEnd = new Date(event.date);
        const [hours, minutes] = event.endTime.split(':');
        eventEnd.setHours(parseInt(hours)), eventEnd.setMinutes(parseInt(minutes));
        
        if (eventDate <= now && eventEnd >= now) {
          return { ...event, status: 'ongoing' };
        } else if (eventDate > now) {
          return { ...event, status: 'upcoming' };
        } else {
          return { ...event, status: 'past' };
        }
      })
    );
  }, []);

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

  // Handle calendar day click
  const handleCalendarDayClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    
    // Don't allow selecting past dates
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (selectedDate < now) return;
    
    setFormData({
      id: null,
      title: '',
      date: selectedDate,
      startTime: '08:00',
      endTime: '09:00',
      location: '',
      description: '',
      status: 'upcoming'
    });
    
    setShowFormModal(true);
  };

  // CRUD Functions
  const handleAddEvent = () => {
    setFormData({
      id: null,
      title: '',
      date: new Date(),
      startTime: '08:00',
      endTime: '09:00',
      location: '',
      description: '',
      status: 'upcoming'
    });
    setShowFormModal(true);
  };

  const handleEditEvent = (event) => {
    setFormData({ ...event });
    setShowFormModal(true);
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(event => event.id !== eventToDelete.id));
    setShowDeleteModal(false);
    setEventToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Determine status based on date and time
    const now = new Date();
    const eventDate = new Date(formData.date);
    const eventEnd = new Date(formData.date);
    const [hours, minutes] = formData.endTime.split(':');
    eventEnd.setHours(parseInt(hours), eventEnd.setMinutes(parseInt(minutes)));
    
    let status = 'upcoming';
    if (eventDate <= now && eventEnd >= now) {
      status = 'ongoing';
    } else if (eventDate > now) {
      status = 'upcoming';
    } else {
      status = 'past';
    }
    
    const updatedFormData = { ...formData, status };

    if (formData.id) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === formData.id ? updatedFormData : event
      ));
    } else {
      // Create new event
      const newEvent = {
        ...updatedFormData,
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
      };
      setEvents([...events, newEvent]);
    }
    
    setShowFormModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    // Don't allow selecting past dates
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (date < now) return;
    
    setFormData(prev => ({
      ...prev,
      date: date
    }));
  };

  // Generate time options for select
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(
          <option key={time} value={time}>{time}</option>
        );
      }
    }
    return options;
  };

  // Filter events by search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Categorize events by status
  const ongoingEvents = filteredEvents.filter(event => event.status === "ongoing");
  const upcomingEvents = filteredEvents.filter(event => event.status === "upcoming");
  const pastEvents = filteredEvents.filter(event => event.status === "past");

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      const isPast = currentDay < new Date() && !isToday;
      
      days.push(
        <div 
          key={`day-${i}`} 
          className={`h-8 w-8 flex items-center justify-center text-sm rounded-full cursor-pointer
                     ${hasEvent ? 'bg-blue-100 text-blue-600 font-medium' : ''}
                     ${isToday ? 'bg-blue-600 text-white font-bold' : ''}
                     ${isPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          onClick={() => !isPast && handleCalendarDayClick(i)}
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
            <ChevronRight className="w-5 h-5 text-gray-600" />
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

  return (
    <div className="flex h-screen bg-gray-50 text-sm">
      <SidebarAdmin />
      
      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">
                {formData.id ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
              </h2>
              <button 
                onClick={() => setShowFormModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Judul Kegiatan</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={formData.date.toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange(new Date(e.target.value))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Dipilih: {formData.date.toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })} ({formatDate(formData.date)})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Waktu Mulai</label>
                    <select
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    >
                      {generateTimeOptions()}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Waktu Selesai</label>
                    <select
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    >
                      {generateTimeOptions()}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Lokasi</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Deskripsi</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {formData.id ? 'Update Kegiatan' : 'Tambah Kegiatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">Konfirmasi Hapus</h2>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start mb-4">
                <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" />
                <p className="text-sm">Anda yakin ingin menghapus kegiatan ini? Aksi ini tidak dapat dibatalkan.</p>
              </div>
              <div className="bg-red-50 p-3 rounded-md mb-4 border border-red-100">
                <p className="font-medium text-red-800">{eventToDelete?.title}</p>
                <p className="text-sm text-red-700">
                  {eventToDelete?.date.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })} • {eventToDelete?.startTime} - {eventToDelete?.endTime}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-5 py-3 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Manajemen Kalender</h1>
              <p className="text-gray-600 text-sm">Kelola jadwal kegiatan Racana Diponegoro</p>
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
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {/* Search and Add Event */}
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
                  placeholder="Cari kegiatan..."
                />
              </div>
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
              >
                <Plus size={16} className="mr-1" /> Tambah Kegiatan
              </button>
            </div>
          </div>

          {/* Calendar View */}
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <p className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} • {event.startTime} - {event.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => toggleEvent(event.id)}
                          className="text-gray-500 hover:text-gray-700"
                          title="Detail"
                        >
                          {expandedEvent === event.id ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedEvent === event.id && (
                      <div className="mt-3 pl-11 pr-4">
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Lokasi:</span> {event.location}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line mb-3">
                          {event.description}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Edit Kegiatan
                          </button>
                          <button
                            onClick={() => handleDeleteClick(event)}
                            className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Hapus Kegiatan
                          </button>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <p className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} • {event.startTime} - {event.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => toggleEvent(event.id)}
                          className="text-gray-500 hover:text-gray-700"
                          title="Detail"
                        >
                          {expandedEvent === event.id ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedEvent === event.id && (
                      <div className="mt-3 pl-11 pr-4">
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Lokasi:</span> {event.location}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line mb-3">
                          {event.description}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Edit Kegiatan
                          </button>
                          <button
                            onClick={() => handleDeleteClick(event)}
                            className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Hapus Kegiatan
                          </button>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <p className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} • {event.startTime} - {event.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => toggleEvent(event.id)}
                          className="text-gray-500 hover:text-gray-700"
                          title="Detail"
                        >
                          {expandedEvent === event.id ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    {expandedEvent === event.id && (
                      <div className="mt-3 pl-11 pr-4">
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Lokasi:</span> {event.location}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line mb-3">
                          {event.description}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Edit Kegiatan
                          </button>
                          <button
                            onClick={() => handleDeleteClick(event)}
                            className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Hapus Kegiatan
                          </button>
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
            2025 Copyright SSO Racana Diponegoro - Admin Panel
          </footer>
        </main>
      </div>
    </div>
  );
};

export default KalenderAdmin;