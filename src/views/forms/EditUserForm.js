import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "views/forms/User.js";
import { useLocation } from "react-router-dom";
import app from 'utils/axiosConfig.js';  // Import the configured axios instance


function EditUserForm() {
  const [userData, setUserData] = useState(null);
  const apiUrl = process.env.REACT_APP_APIURL;
  const clientID = localStorage.getItem('ClientID');
  const [userId, setUserId] = useState(null);

  const extractIdFromPathname = (pathname) => {
    const match = pathname.match(/\/totalStaff\/(\d+)/);
    return match ? match[1] : null;
  };

  const location = useLocation();

  useEffect(() => {
    const extractedUserId = extractIdFromPathname(location.pathname);
    setUserId(extractedUserId);

    async function fetchUserData() {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${apiUrl}/user/getUserData/${extractedUserId}?clientID=${clientID}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    if (extractedUserId) {
      fetchUserData();
    }
  }, [location.pathname]);

return (
  <div className="content">
        <div>
    {userId ? (
      <UserForm userData={userData} />
    ) : (
      <p>No user ID provided</p>
    )}
  </div>
        
      </div>
);
}

export default EditUserForm;
