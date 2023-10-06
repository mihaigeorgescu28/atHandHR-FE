import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import UserForm from "views/forms/User.js";
import { useNavigate, Link } from "react-router-dom";


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
          setIsLoadingUserData(true); // Set loading to true
          const response = await axios.get(`${apiUrl}/getUserData/${userId}`);
          console.log("API Response:", response.data);
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingUserData(false); // Set loading back to false
        }
      }
      fetchUserData(selectedUserId); // Call the function here
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
          color="warning"
          size="sm"
          className="btn-icon btn-link edit"
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          onClick={() => {
            const updatedData = dataState.filter((o) => o.UserID !== actionsID); // Use "UserID" for filtering
            setDataState(updatedData);
          }}
          color="danger"
          size="sm"
          className="btn-icon btn-link remove"
          
        >
          <i className="fa fa-times" />
        </Button>{" "}
      </div>
    );
  };
  
  
  return (
    <Col lg="12" md="12" sm="12">
<div className="content d-flex justify-content-center align-items-center">
      <Row>
        <Col md="12">
        <div className="fixed-width-table-chart-container">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Total Staff</CardTitle>
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



