import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
});

// Function to set the authorization token in the request headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["authorization"];
  }
};

// Add interceptor to handle invalid tokens
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("admin");
      localStorage.removeItem("email");
      window.location.href = "/signin";

      // Show alert to the user
      alert("Your session has expired. Please log in again.");
    }

    //When user manipulates address without token
    if (error.response && error.response.data === "Access token not found.") {
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
export default api;
