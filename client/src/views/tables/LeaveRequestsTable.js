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

function LeaveRequestsTable({ leaveTypeGroupID, leaveStatusID, leaveTypeID }) {
  const clientID = localStorage.getItem('ClientID');
  const [dataState, setDataState] = useState([]); // Moved useState inside the component

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.UserID === actionsID); 

    return (
      <div className="actions-right">
        <Button
          color="success"
          size="sm"
          className="btn-icon"
        >
          <i className="nc-icon nc-check-2" />
        </Button>
        <Button
          color="danger"
          size="sm"
          className="btn-icon"
        >
          <i className="nc-icon nc-simple-remove" />
        </Button>{" "}
      </div>
    );
  };

  // Make the API call using Axios to fetch all three values in one request
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${apiUrl}/LeaveRequestStatusBreakDown?ClientID=${clientID}&LeaveTypeGroupID=${leaveTypeGroupID}&LeaveStatusID=${leaveStatusID}&LeaveTypeID=${leaveTypeID}`);

        if (result.status === 200) {
          setDataState(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [leaveStatusID, leaveTypeID, leaveTypeGroupID]);

  // Define the columns array conditionally based on ClosedStatus
  const columns = [
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
      accessor: "HolidayEntitlement",
    },
  ];

  // Conditionally add the "Actions" column
  if (dataState.length > 0 && dataState[0].ClosedStatus === 0) {
    columns.push({
      sortable: false,
      filterable: false,
      Header: "Actions",
      accessor: "UserID",
      Cell: ({ value }) => renderActions(value),
    });
  }

  return (
    <Col lg="12" md="12" sm="12">
      <div className="content d-flex justify-content-center align-items-center">
        <Row>
          <Col md="12">
            <div className="fixed-width-table-chart-container">
              <Card>
                <CardHeader tag="h5">
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

export default LeaveRequestsTable;
