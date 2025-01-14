import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 403) {
          // If token is expired or missing, redirect to login page
          navigate('/auth/login');
          localStorage.clear()
        }
        return Promise.reject(error);
      }
    );

    // Eject the interceptor when the component unmounts
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
