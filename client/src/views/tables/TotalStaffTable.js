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
import * as XLSX from "xlsx"; // Import xlsx library

const apiUrl = process.env.REACT_APP_APIURL;

function TotalStaffTable() {
  const [dataState, setDataState] = useState([]);
  const clientId = localStorage.getItem("ClientID");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `${apiUrl}/totalStaffOfClient`,
          {
            params: { ClientID: clientId }
          }
        );

        if (result.status === 200) {
          setDataState(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

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
          color="green"
          size="sm"
          className="btn-icon btn-link edit nc-icon nc-key-25"
          title="Reset Password"
        >
        </Button>
        <Button
          onClick={handleEditClick}
          color="warning"
          size="sm"
          className="btn-icon btn-link edit"
          title="Edit Employee"
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          onClick={() => {
            const updatedData = dataState.filter((o) => o.UserID !== actionsID);
            setDataState(updatedData);
          }}
          color="danger"
          size="sm"
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
    <Col lg="12" md="12" sm="12">
      <div className="content d-flex justify-content-center align-items-center">
        <Row>
          <Col md="12">
            <div className="fixed-width-table-chart-container">
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
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default TotalStaffTable;
