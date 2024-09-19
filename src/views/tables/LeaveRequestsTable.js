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
import { confirmationDeclineLeave, confirmationApproveLeave, updateRecordSuccess, errorAlert } from '../components/SweetAlert';


const apiUrl = process.env.REACT_APP_APIURL;

function LeaveRequestsTable({ leaveTypeGroupID, leaveStatusID, leaveTypeID, panelName, datasetName, fetchLeaveUpdatedData }) {
  const clientID = localStorage.getItem('ClientID');
  const currentUserId = localStorage.getItem('UserID');
  const [dataState, setDataState] = useState([]); // Moved useState inside the component
  const [showConfirmationDeclineLeaveAlert, setShowConfirmationDeclineLeaveAlert] = useState(false);
  const [showConfirmationApproveLeaveAlert, setShowConfirmationApproveLeaveAlert] = useState(false);
  const [showConfirmationUpdateRecordSuccess, setShowConfirmationUpdateRecordSuccess] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [obj, setObj] = useState('');

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
      { key: "ActionedByUser", displayName: "Actioned By" },
      { key: "ActionedDate", displayName: "Actioned On" },
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
    const fileName = `leave_management${currentDate}.xlsx`;
  
    // Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(transformedData, {
      header: columnMap.map(({ displayName }) => displayName),
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TotalStaff");
    XLSX.writeFile(workbook, fileName);
  };

  const handleAproveLeave = (obj) => {
    setObj(obj);
    setShowConfirmationApproveLeaveAlert(true);
};

const handleDeclineLeave = (obj) => {
    setObj(obj);
    setShowConfirmationDeclineLeaveAlert(true);
};

const confirmAproveLeave = async () => {
  try {
    // Make sure obj contains the necessary data
    if (!obj || !obj.UserID) {
      console.error('Invalid object:', obj);
      return;
    }
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${apiUrl}/leave/actionLeaveRequest`, {
      StatusID: 2,
      LeaveRequestID: obj.LeaveRequestID,
      UserID: currentUserId,
    });

     await fetchLeaveUpdatedData(); // update dashboard charts
     fetchTableData(); // update drilldown table

    if (response.status === 200 && response.data.Success == 'true') {
      setShowConfirmationUpdateRecordSuccess(true);
    }
    else
      {
        setShowErrorAlert(true);
      }
      
  } catch (error) {
    console.error("Error approving leave:", error);
  }
};

const confirmDeclineLeave = async () => {
  try {
    // Make sure obj contains the necessary data
    if (!obj || !obj.UserID) {
      console.error('Invalid object:', obj);
      return;
    }
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${apiUrl}/leave/actionLeaveRequest`, {
      StatusID: 3,
      LeaveRequestID: obj.LeaveRequestID,
      UserID: currentUserId,
  });
  
  await fetchLeaveUpdatedData(); // update dashboard charts
  fetchTableData(); // update drilldown table

    if (response.status === 200 && response.data.Success == 'true') {
      setShowConfirmationUpdateRecordSuccess(true);
    }
    else
      {
        setShowErrorAlert(true);
      }
      
    
  } catch (error) {
    console.error("Error declining leave:", error);
  }
};



  const hideAlert = () => {
    setShowConfirmationApproveLeaveAlert(false);
    setShowConfirmationDeclineLeaveAlert(false);
    setShowConfirmationUpdateRecordSuccess(false);
    setShowErrorAlert(false);
  };

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.UserID === actionsID); 

    return (
      <div className="actions-right">
        <Button
          onClick={() => handleAproveLeave(obj)}
          color="success"
          size="sm"
          className="btn-icon"
          title="Approve Leave"
          type="reset"
        >
          <i className="nc-icon nc-check-2" />
        </Button>
        <Button
          onClick={() => handleDeclineLeave(obj)}
          color="danger"
          size="sm"
          className="btn-icon"
          title="Decline Leave"
          type="reset"
        >
          <i className="nc-icon nc-simple-remove" />
        </Button>{" "}
      </div>
    );
  };

  async function fetchTableData() {
    try {
      axios.defaults.withCredentials = true;
      const result = await axios.get(`${apiUrl}/leave/LeaveRequestStatusBreakDown?ClientID=${clientID}&LeaveTypeGroupID=${leaveTypeGroupID}&LeaveStatusID=${leaveStatusID}&LeaveTypeID=${leaveTypeID}`);

      if (result.status === 200) {
        setDataState(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }


  // Make the API call using Axios to fetch all three values in one request
  useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.withCredentials = true;
        const result = await axios.get(`${apiUrl}/leave/LeaveRequestStatusBreakDown?ClientID=${clientID}&LeaveTypeGroupID=${leaveTypeGroupID}&LeaveStatusID=${leaveStatusID}&LeaveTypeID=${leaveTypeID}`);

        if (result.status === 200) {
          setDataState(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [leaveStatusID, leaveTypeID, leaveTypeGroupID, fetchLeaveUpdatedData]);

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
      Header: "Initial Holiday",
      accessor: "HolidayEntitlementBeforeApproval",
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

  if (dataState.length > 0 && dataState[0].StatusName == 'Approved') {
    columns.push(
      {
      Header: "Approved By",
      accessor: "ActionedByUser",
      },
      {
        Header: "Approved On",
        accessor: "ActionedDate",
      },
      );
    }
  else if(dataState.length > 0 && dataState[0].StatusName == 'Declined')
    {
      columns.push(
        {
        Header: "Declined By",
        accessor: "ActionedByUser",
        },
        {
          Header: "Declined On",
          accessor: "ActionedDate",
        },
        );
      }

  // Conditionally add the "Actions" column
  if (dataState.length > 0 && dataState[0].ClosedStatus === 0) {
    columns.push(
      {
      sortable: false,
      filterable: false,
      Header: "Actions",
      accessor: "UserID",
      Cell: ({ value }) => renderActions(value),
    });

  }

  return (
    <div>
        

              <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
                
      <CardTitle tag="h5">{panelName} - {datasetName}</CardTitle>
    
                
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
                <CardBody >
                  <ReactTable 
                    data={dataState}
                    columns={columns}
                    className="-striped -highlight primary-pagination"
                  />
                </CardBody>
              </Card>


      {showConfirmationDeclineLeaveAlert && confirmationDeclineLeave(hideAlert, confirmDeclineLeave)}
      {showConfirmationApproveLeaveAlert && confirmationApproveLeave(hideAlert, confirmAproveLeave)}
      {showConfirmationUpdateRecordSuccess && updateRecordSuccess(hideAlert, hideAlert)}
      {showErrorAlert && errorAlert(hideAlert)}
      </div>
  );
}

export default LeaveRequestsTable;
