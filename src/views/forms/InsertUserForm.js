import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "views/forms/User.js";
import { useLocation } from "react-router-dom";

function InsertUserForm() {
  const [userData, setUserData] = useState([]); // Set initial state as an empty array
  const apiUrl = process.env.REACT_APP_APIURL;
  const location = useLocation();

  useEffect(() => {
    async function fetchClientName() {
      const UserID = localStorage.getItem("UserID");
      try {
        axios.defaults.withCredentials = true;
        const result = await axios.post(
          `${apiUrl}/user/currentClient`,
          {
            UserID: UserID,
          }
        );
        if (result.status === 200) {
          // Set userData state with fetched data as an array
          setUserData([{
            HolidayEntitelementLeftDays: result.data.HolidayEntitlementDefaultDays,
            HolidayEntitelementLeftHours: result.data.HolidayEntitlementDefaultHours
          }]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchClientName();
  }, []);

  return (
    <div className="content">
    <div>
      {/* Pass userData as props to UserForm */}
      <UserForm userData={userData} />
    </div>
    </div>
  );
}

export default InsertUserForm;
