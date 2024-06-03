import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "views/forms/User.js";
import { useLocation } from "react-router-dom";


function EditUserForm() {
  const [userData, setUserData] = useState(null);
  const apiUrl = process.env.REACT_APP_APIURL;
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
        const response = await axios.get(`${apiUrl}/user/getUserData/${extractedUserId}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (extractedUserId) {
      fetchUserData();
    }
  }, [location.pathname]);

return (
  <div>
    {userId ? (
      <UserForm userData={userData} />
    ) : (
      <p>No user ID provided</p>
    )}
  </div>
);
}

export default EditUserForm;
