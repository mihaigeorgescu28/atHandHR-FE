import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "views/forms/User.js"; // Update the import path
import { useParams } from "react-router-dom";


function EditUserForm() {
  const { userId } = useParams();
  console.log("EditUserForm userId:", userId);
  const [userData, setUserData] = useState(null);
  const apiUrl = process.env.REACT_APP_APIURL;

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`${apiUrl}/getUserData/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {<UserForm userData={userData} />}
    </div>
  );
}

export default EditUserForm;