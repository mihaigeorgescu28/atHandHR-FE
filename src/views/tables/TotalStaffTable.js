import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Tooltip
} from "reactstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import { useNavigate} from "react-router-dom";
import * as XLSX from "xlsx";
import { disableEmployeeSuccess, confirmationDisableEmployee, resetPasswordSuccess, confirmationResetPassword } from '../components/SweetAlert';


const apiUrl = process.env.REACT_APP_APIURL;

function TotalStaffTable({ fetchUpdatedData }) {
  const [showAlert, setShowAlert] = useState(false);
  const [objToDelete, setObjToDelete] = useState(null); 
  const [dataState, setDataState] = useState([]);
  const clientId = localStorage.getItem("ClientID");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [obj, setObj] = useState('');
  const [showResetPasswordAlert, setShowResetPasswordAlert] = React.useState(false);
  const [showResetPasswordSuccess, setShowResetPasswordSuccess] = React.useState(false);
  const [showDisableEmployeeAlert, setShowDisableEmployeeAlert] = React.useState(false);
  const [showDisableEmployeeSuccess, setShowDisableEmployeeSuccess] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${apiUrl}/user/totalStaffOfClient`, {
        params: { ClientID: clientId },
      });

      if (result.status === 200) {
        setDataState(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (obj) => {
    setObjToDelete(obj); // Set the object to delete
    setShowDisableEmployeeAlert(true); // Show the disable employee confirmation dialog
  };
  

  const handleResetPasswordClick = (obj) => {
    setObj(obj); // Set the selected user object
    setShowResetPasswordAlert(true); // Show the reset password confirmation dialog
  };

  const confirmResetPassword = async () => {
    try {
      // Make sure obj contains the necessary data
      if (!obj || !obj.UserID) {
        console.error('Invalid object:', obj);
        return;
      }
  
      // Make an API call to reset user password with UserID
      const response = await axios.post(`${apiUrl}/emails/resetUserPassword`, { UserID: obj.UserID });
      
      if (response.status === 200) {
        // Show success message for resetting password
        setShowResetPasswordSuccess(true);
      } else {
        // Show error alert if the reset password request fails
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error resetting user password:', error);
      // Show error alert if an error occurs during the reset password process
      setShowErrorAlert(true);
    } finally {
      // Close the reset password confirmation dialog regardless of the outcome
      setShowResetPasswordAlert(false);
    }
  };

  const confirmDelete = async () => {
    try {
      // Make sure objToDelete contains the necessary data
      if (!objToDelete || !objToDelete.UserID) {
        console.error('Invalid object:', objToDelete);
        return;
      }
  
      // Call the API to disable the employee using objToDelete.UserID
      await axios.post(`${apiUrl}/user/disableEmployee`, { UserID: objToDelete.UserID });
  
      // Call the fetchUpdatedData function to update the data
      await fetchUpdatedData(); // update dashboard chart
      fetchData(); // update records in table
    } catch (error) {
      console.error('Error disabling employee:', error);
    } finally {
      // Close the disable employee confirmation dialog regardless of success or failure
      setShowDisableEmployeeAlert(false);
    }
  };

  const hideAlert = () => {
    setShowAlert(false); 
    setShowResetPasswordAlert(false);
    setShowResetPasswordSuccess(false);
    setShowDisableEmployeeSuccess(false);
    setShowDisableEmployeeAlert(false);
  };

  useEffect(() => {
    if (selectedUserId !== null) {
      async function fetchUserData(userId) {
        try {
          setIsLoadingUserData(true);
          const response = await axios.get(`${apiUrl}/getUserData/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingUserData(false);
        }
      }
      fetchUserData(selectedUserId);
    }
  }, [selectedUserId]);

  const handleAddEmployee = () => {
    navigate(`/admin/dashboard/totalStaff/new`);
  };

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.UserID === actionsID); 

    const handleEditClick = () => {
      const userId = encodeURIComponent(obj.UserID);
      navigate(`/admin/dashboard/totalStaff/${userId}`);
    };
  
    return (
      <div className="actions-right">
        <Button
          onClick={handleEditClick}
          color="warning"
          size="md"
          className="btn-icon btn-link edit"
          title="Edit Employee"
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          onClick={() => handleResetPasswordClick(obj)}
          color="green"
          size="md"
          className="btn-icon btn-link edit nc-icon nc-key-25"
          title="Reset Password"
        >
          <i className="nc-icon nc-key-25"/>
        </Button>
        
        <Button
          onClick={() => handleDeleteClick(obj)} // Pass obj to handleDeleteClick
          color="danger"
          size="md"
          className="btn-icon btn-link remove"
          title="Delete Employee"
        >
          <i className="fa fa-times" />
        </Button>
      </div>
    );
  };

  const exportToExcel = () => {
    // Map the displayed column names to the API names and define the order
    const columnMap = [
      { key: "EmployeeNumber", displayName: "Employee No." },
      { key: "FullName", displayName: "Full Name" },
      { key: "EmailAddress", displayName: "Email Address" },
      { key: "DOB", displayName: "DOB" },
      { key: "WorkingShiftHours", displayName: "Shift Hours" },
      { key: "HolidayEntitlement", displayName: "Holiday Left" },
      // Add more mappings as needed
    ];
  
    // Transform the dataState to use displayed column names and order
    const transformedData = dataState.map((row) => {
      const transformedRow = {};
      columnMap.forEach(({ key, displayName }) => {
        transformedRow[displayName] = row[key];
      });
      return transformedRow;
    });
  
    // Generate the file name with the current date
    const currentDate = new Date().toLocaleDateString("en-GB").replace(/\//g, "");
    const fileName = `total_staff_${currentDate}.xlsx`;
  
    // Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(transformedData, {
      header: columnMap.map(({ displayName }) => displayName),
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TotalStaff");
    XLSX.writeFile(workbook, fileName);
  };
  
  return (
<div>

              <Card>
              <CardHeader>
  <div className="d-flex justify-content-between">
    <div>
      <CardTitle tag="h5">Total Staff</CardTitle>
    </div>
    <div>
    <Button
        style={{ backgroundColor: "#007bff", color: "#fff" }}
        size="sm"
        onClick={handleAddEmployee}
      >
        Add Employee
      </Button>
      <Button
        className="mr-2" // Add margin to separate the buttons
        style={{ backgroundColor: "#28a745", color: "#fff" }}
        size="sm"
        onClick={exportToExcel}
      >
        Export as Excel
      </Button>
    </div>
  </div>
</CardHeader>
                <CardBody>
                  
                  <ReactTable 
                    data={dataState}
                    columns={[
                      {
                        Header: "Employee No.",
                        accessor: "EmployeeNumber"
                      },
                      {
                        Header: "Full Name",
                        accessor: "FullName"
                      },
                      {
                        Header: "Email Address",
                        accessor: "EmailAddress",
                        width: 5000
                      },
                      {
                        Header: "DOB",
                        accessor: "DOB"
                      },
                      {
                        Header: "Shift Hours",
                        accessor: "WorkingShiftHours"
                      },
                      {
                        Header: "Holiday Left",
                        accessor: "HolidayEntitlement"
                      },
                      {
                        sortable: false,
                        filterable: false,
                        Header: "Actions",
                        accessor: "UserID",
                        Cell: ({ value }) => renderActions(value)
                      }
                    ]}
                    className="-striped -highlight primary-pagination"
                  />
                </CardBody>
              </Card>
            
          
     

      {showDisableEmployeeAlert && confirmationDisableEmployee(hideAlert, confirmDelete)}
      {showDisableEmployeeSuccess && disableEmployeeSuccess(hideAlert, hideAlert)}


    {showResetPasswordAlert && confirmationResetPassword(hideAlert, confirmResetPassword)}

    {showResetPasswordSuccess && resetPasswordSuccess(hideAlert, hideAlert)}
      
    </div>
  );
}

export default TotalStaffTable;
