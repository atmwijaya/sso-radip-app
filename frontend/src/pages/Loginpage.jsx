import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Mail, BookOpen, Calendar, LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ nim: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    nama: '', 
    nim: '', 
    jurusan: '', 
    angkatan: '', 
    password: '' 
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.nim) newErrors.nim = 'NIM harus diisi';
    if (!loginData.password) newErrors.password = 'Password harus diisi';
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.nama) newErrors.nama = 'Nama lengkap harus diisi';
    if (!signupData.nim) newErrors.nim = 'NIM harus diisi';
    if (!signupData.jurusan) newErrors.jurusan = 'Jurusan harus diisi';
    if (!signupData.angkatan) newErrors.angkatan = 'Angkatan harus diisi';
    if (!signupData.password || signupData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    return newErrors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Handle login logic here
    console.log('Login data:', loginData);
    navigate('/dashboard');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Handle signup logic here
    console.log('Signup data:', signupData);
    setIsLogin(true); // Switch to login after successful signup
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img 
      src="./src/assets/Radip.png" 
      className="w-16 h-16" 
      alt="Logo Racana Diponegoro"
    />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? (
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="nim" className="block text-sm font-medium text-gray-700">
                  NIM
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    value={loginData.nim}
                    onChange={handleLoginChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.nim ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.nim && <p className="mt-2 text-sm text-red-600">{errors.nim}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleSignupSubmit}>
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={signupData.nama}
                    onChange={handleSignupChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.nama ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.nama && <p className="mt-2 text-sm text-red-600">{errors.nama}</p>}
              </div>

              <div>
                <label htmlFor="nim" className="block text-sm font-medium text-gray-700">
                  NIM
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    value={signupData.nim}
                    onChange={handleSignupChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.nim ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.nim && <p className="mt-2 text-sm text-red-600">{errors.nim}</p>}
              </div>

              <div>
                <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700">
                  Jurusan
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="jurusan"
                    name="jurusan"
                    value={signupData.jurusan}
                    onChange={handleSignupChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.jurusan ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Pilih Jurusan</option>
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Teknik Elektro">Teknik Elektro</option>
                    <option value="Teknik Mesin">Teknik Mesin</option>
                    <option value="Teknik Sipil">Teknik Sipil</option>
                  </select>
                </div>
                {errors.jurusan && <p className="mt-2 text-sm text-red-600">{errors.jurusan}</p>}
              </div>

              <div>
                <label htmlFor="angkatan" className="block text-sm font-medium text-gray-700">
                  Angkatan
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="angkatan"
                    name="angkatan"
                    type="text"
                    value={signupData.angkatan}
                    onChange={handleSignupChange}
                    placeholder="Contoh: 2023"
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.angkatan ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.angkatan && <p className="mt-2 text-sm text-red-600">{errors.angkatan}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <UserPlus className="w-4 h-4" />
                  Daftar
                </button>
              </div>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Buat Akun Baru' : 'Masuk ke Akun Anda'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;