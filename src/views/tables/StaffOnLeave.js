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
import * as XLSX from "xlsx";

const apiUrl = process.env.REACT_APP_APIURL;

function StaffOnLeave({ TableDateRange }) {
  const [dataState, setDataState] = useState([]);
  const clientID = localStorage.getItem('ClientID');

  const exportToExcel = () => {
    // Map the displayed column names to the API names and define the order
    const columnMap = [
      { key: "FullName", displayName: "Full Name" },
      { key: "LeaveTypeName", displayName: "Leave Type" },
      { key: "StatusName", displayName: "Status" },
      { key: "StartDateTime", displayName: "Start Date" },
      { key: "EndDateTime", displayName: "End Date" },
      { key: "LeaveDuration", displayName: "Duration" },
      { key: "HolidayEntitlement", displayName: "Holiday Left" },
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
    const fileName = `staff_on_leave_${currentDate}.xlsx`;
  
    // Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(transformedData, {
      header: columnMap.map(({ displayName }) => displayName),
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TotalStaff");
    XLSX.writeFile(workbook, fileName);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `${apiUrl}/leave/staffOnLeave?ClientID=${clientID}&DateRange=${TableDateRange}`
        );

        if (result.status === 200) {
          setDataState(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [TableDateRange]); // Add TableDateRange to the dependency array to re-fetch data when it changes

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
      <CardTitle tag="h5">Staff On Leave ({TableDateRange == 0 ? "Today" : `Next ${TableDateRange} Days`})</CardTitle>
    </div>
                
                <div>
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
                        Header: "Full Name",
                        accessor: "FullName"
                      },
                      {
                        Header: "Leave Type",
                        accessor: "LeaveTypeName"
                      },
                      {
                        Header: "Status",
                        accessor: "StatusName",
                      },
                      {
                        Header: "Start Date",
                        accessor: "StartDateTime",
                      },
                      {
                        Header: "End Date",
                        accessor: "EndDateTime"
                      },
                      {
                        Header: "Duration",
                        accessor: "LeaveDuration",
                      },
                      {
                        Header: "Holiday Left",
                        accessor: "HolidayEntitlement"
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

export default StaffOnLeave;
