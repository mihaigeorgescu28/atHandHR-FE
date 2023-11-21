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

const apiUrl = process.env.REACT_APP_APIURL;

function TimeManagementTable({ actionTypeID, timeManagementStatus, tableDateRange }) {
  const clientID = localStorage.getItem('ClientID');
  const [dataState, setDataState] = useState([]);

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
        let apiUrlWithParams = `${apiUrl}/TimeManagementBreakDown?ClientID=${clientID}&ActionTypeID=${actionTypeID}&TimeManagementStatus=${timeManagementStatus}`;
      
        if (tableDateRange) {
          // Convert tableDateRange using mapMonthToNumber function
          const { dateRangeStart, dateRangeEnd } = mapMonthToNumber(tableDateRange);
          apiUrlWithParams += `&DateRangeStart=${dateRangeStart}&DateRangeEnd=${dateRangeEnd}`;
        }
      
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
    console.log('no talbe range', tableDateRange)
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
    console.log('action type id', tableDateRange)
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
    <Col lg="12" md="12" sm="12">
      <div className="content d-flex justify-content-center align-items-center">
        <Row>
          <Col md="12">
            <div className="fixed-width-table-chart-container">
              <Card>
                <CardHeader tag="h5">
                  {/* Add header content here if needed */}
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
    </Col>
  );
}

export default TimeManagementTable;
