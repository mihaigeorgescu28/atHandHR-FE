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

function StaffOnLeave({ TableDateRange }) {
  const [dataState, setDataState] = useState([]);
  const clientID = localStorage.getItem('ClientID');

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `${apiUrl}/staffOnLeave?ClientID=${clientID}&DateRange=${TableDateRange}`
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
                  <CardTitle tag="h4">Staff On Leave (Today)</CardTitle>
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
