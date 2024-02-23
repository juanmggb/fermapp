import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1/api/",
  // timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Function to retrieve token
const getAuthToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token;
};

// Add an interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    // Add the Authorization header to each request if the token is available.
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
