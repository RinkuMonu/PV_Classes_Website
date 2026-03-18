import axios from 'axios';
import Swal from "sweetalert2";


const axiosInstance = axios.create({
  // baseURL: 'https://api.7uniqueverfiy.com/api',


  // baseURL: 'http://192.168.1.39:5000/api',
  // baseURL: 'http://localhost:5000/api'
  baseURL: 'https://api.pvclasses.in/api',
  // baseURL: 'http://localhost:5006/api',

  // headers: {
  //     'Content-Type': 'application/json',
  // },
});

// ✅ Request Interceptor — safely set token only in browser
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isSessionAlertShown = false;

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {

    if (error.response) {

      const message = error.response.data?.message;

      if (
        error.response.status === 401 &&
        message === "Your account is logged in on another device"
      ) {

        // ✅ Prevent multiple alerts
        if (!isSessionAlertShown) {

          isSessionAlertShown = true;

          await Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Your account is logged in on another device",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false
          });

          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/";
          }

        }

      }


      // 🔴 CASE 2: JWT expired
      if (
        error.response.status === 401 &&
        (
          message?.toLowerCase().includes("expired") ||
          message?.toLowerCase().includes("invalid") ||
          message?.toLowerCase().includes("unauthorized")
        )
      ) {

        if (!isSessionAlertShown) {

          isSessionAlertShown = true;

          await Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Your login session has expired. Please login again.",
            confirmButtonText: "Login Again",
            allowOutsideClick: false,
            allowEscapeKey: false
          });

          localStorage.removeItem("token");

          window.location.href = "/";
        }
      }

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
