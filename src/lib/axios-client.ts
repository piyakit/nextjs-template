import axios from 'axios';

// สร้าง instance ของ axios
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 วินาที
});

// Request interceptor (เช่น แนบ token อัตโนมัติ)
axiosClient.interceptors.request.use(
  (config) => {
    // ตัวอย่างดึง token จาก localStorage หรือ cookie
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (จัดการ error ทั่วไป)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // network error
      alert('Network error, please try again.');
    } else {
      // ตัวอย่างเช็ค 401 Unauthorized
      if (error.response.status === 401) {
        // ทำ logout หรือ redirect ไปหน้า login
        alert('Session expired. Please login again.');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
