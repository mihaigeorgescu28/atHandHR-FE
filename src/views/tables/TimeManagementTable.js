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

function TimeManagementTable({ actionTypeID, timeManagementStatus, tableDateRange, panelName, datasetName }) {
  const clientID = localStorage.getItem('ClientID');
  const [dataState, setDataState] = useState([]);

  const exportToExcel = () => {
    // Initialize columnMap with an empty array
    let columnMap = [];

    // Map the displayed column names to the API names and define the order
    if (tableDateRange) {
        if (actionTypeID === 1) {
            columnMap = [
                { key: "FullName", displayName: "Full Name" },
                { key: "SignedInOut", displayName: "Signed In" },
            ];
        } else if (actionTypeID === 2) {
            columnMap = [
                { key: "FullName", displayName: "Full Name" },
                { key: "SignedInOut", displayName: "Signed Out" },
            ];
        }
    } else if (actionTypeID === 2 && timeManagementStatus === 'OnTime') {
        columnMap = [
            { key: "FullName", displayName: "Full Name" },
            { key: "SignedInOut", displayName: "Signed Out" },
            { key: "ExpectedShiftDurationHours", displayName: "Expected Shift Duration Hours" },
            { key: "ActualShiftDuration", displayName: "Actual Shift Duration" }
        ];
    } else if (actionTypeID === 2 && timeManagementStatus === 'Pending') {
        columnMap = [
            { key: "FullName", displayName: "Full Name" },
            { key: "SignedInOut", displayName: "Signed Out" },
            { key: "ExpectedShiftDurationHours", displayName: "Expected Shift Duration Hours" },
        ];
    } else if (actionTypeID === 1) {
        columnMap = [
            { key: "FullName", displayName: "Full Name" },
            { key: "SignedInOut", displayName: "Signed In" },
            { key: "ExpectedShiftDurationHours", displayName: "Expected Shift Duration Hours" },
        ];
    }

    // Ensure columnMap is not empty
    if (columnMap.length === 0) {
        console.error("No columns defined for the Excel export.");
        return;
    }

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
    const fileName = `time_management_${currentDate}.xlsx`;

    // Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(transformedData, {
        header: columnMap.map(({ displayName }) => displayName),
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TotalStaff");
    XLSX.writeFile(workbook, fileName);
};


  const mapMonthToNumber = (month) => {
    const monthToNumber = {
      'Jan': '01',
      'Feb': '02',
      'Mar': '03',
      'Apr': '04',
      'May': '05',
      'Jun': '06',
      'Jul': '07',
      'Aug': '08',
      'Sep': '09',
      'Oct': '10',
      'Nov': '11',
      'Dec': '12'
    };
  
    const currentYear = new Date().getFullYear();
    const monthNumber = monthToNumber[month];
  
    // Use a consistent date format (YYYY-MM-DD)
    const dateRangeStart = `${currentYear}-${monthNumber}-01`;
    const lastDayOfMonth = new Date(currentYear, monthNumber, 0).getDate();
    const dateRangeEnd = `${currentYear}-${monthNumber}-${lastDayOfMonth < 10 ? '0' : ''}${lastDayOfMonth}`;
  
    return { dateRangeStart, dateRangeEnd };
  };
  
  

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.UserID === actionsID);

    return (
      <div className="actions-right">
        <Button color="success" size="sm" className="btn-icon">
          <i className="nc-icon nc-check-2" />
        </Button>
        <Button color="danger" size="sm" className="btn-icon">
          <i className="nc-icon nc-simple-remove" />
        </Button>{" "}
      </div>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.withCredentials = true;
        let apiUrlWithParams = `${apiUrl}/timeManagement/TimeManagementBreakDown?ClientID=${clientID}&ActionTypeID=${actionTypeID}&TimeManagementStatus=${timeManagementStatus}`;
      
        if (tableDateRange) {
          // Convert tableDateRange using mapMonthToNumber function
          const { dateRangeStart, dateRangeEnd } = mapMonthToNumber(tableDateRange);
          apiUrlWithParams += `&DateRangeStart=${dateRangeStart}&DateRangeEnd=${dateRangeEnd}`;
        }
        axios.defaults.withCredentials = true;
        const result = await axios.get(apiUrlWithParams);
      
        if (result.status === 200) {
          setDataState(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [actionTypeID, timeManagementStatus, tableDateRange]);

  let columns = [
    {
      Header: "Full Name",
      accessor: "FullName"
    }
  ];

  // Add additional columns if actionTypeID is equal to 2
  if (tableDateRange) {
    if (actionTypeID === 1)
    {
      columns.push(
        {
          Header: "Signed In",
          accessor: "SignedInOut"
        }
      );
    }
    else if (actionTypeID === 2)
    {
      columns.push(
        {
          Header: "Signed Out",
          accessor: "SignedInOut"
        }
      );
    }
  }
  else if (actionTypeID === 2 && timeManagementStatus === 'OnTime') {
    columns.push(
      {
        Header: "Signed Out",
        accessor: "SignedInOut"
      },
      {
        Header: "Expected Shift Duration",
        accessor: "ExpectedShiftDurationHours"
      },
      {
        Header: "Actual Shift Duration",
        accessor: "ActualShiftDuration"
      }
    );
  } else if (actionTypeID === 2 && timeManagementStatus === 'Pending') {
    columns.push(
      {
        Header: "Signed Out",
        accessor: "SignedInOut"
      },
      {
        Header: "Expected Shift Duration",
        accessor: "ExpectedShiftDurationHours"
      },
    );
  } else if (actionTypeID === 1) {
    columns.push(
      {
        Header: "Signed In",
        accessor: "SignedInOut"
      },
      {
        Header: "Expected Shift Duration",
        accessor: "ExpectedShiftDurationHours"
      }
    );
  }

  return (
      <div className="content justify-content-center align-items-center">
        <Row>
          <Col md="12">
            <div className="fixed-width-table-chart-container">
              <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
                <div>
      <CardTitle tag="h5">{panelName} - {datasetName}</CardTitle>
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
                    columns={columns}
                    className="-striped -highlight primary-pagination"
                  />
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
  );
}

export default TimeManagementTable;
