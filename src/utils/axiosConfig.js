import axios from 'axios';

// Set base URL depending on the environment
const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:8800/"  // Update this port if different
  : "https://api.athandhr.com";     // Production URL

const app = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Interceptor to handle server error messages
app.interceptors.response.use(
  response => response, // Return the response as-is if successful
  error => Promise.reject(error.response?.data?.err || error) // Handle error messages
);

export default app;
