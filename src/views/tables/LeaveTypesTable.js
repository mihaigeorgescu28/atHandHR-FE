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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import { confirmationDeleteRecord, deleteRecordSuccess, updateRecordSuccess, insertRecordSuccess } from '../components/SweetAlert';



const apiUrl = process.env.REACT_APP_APIURL;

function LeaveTypesTable() {
  const clientID = localStorage.getItem('ClientID');
  const userID = localStorage.getItem('UserID');
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
  const [showDeleteRecordAlert, setShowDeleteRecordAlert] = React.useState(false);
  const [deleteRecordSuccessAlert, setdeleteRecordSuccesstAlert] = React.useState(false);
  const [updateRecordSuccessAlert, setUpdateRecordSuccessAlert] = React.useState(false);
  const [insertRecordSuccessAlert, setInsertRecordSuccessAlert] = React.useState(false);
  const [objToDelete, setObjToDelete] = useState(null); 
  const [dataState, setDataState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState('new');
  const [formData, setFormData] = useState({
    ClientLeaveTypeID: "",
    LeaveTypeID: "",
    LeaveTypeName: "",
    RequiresApproval: ""
  });

  const fetchLeaveTypes = async () => {
    try {
      let result;
      if (formType === 'new') {
        result = await axios.post(`${apiUrl}/leave/globalLeaveTypes`, { UserID: userID });
      } else if (formType === 'edit') {
        result = await axios.post(`${apiUrl}/leave/leaveType`, { UserID: userID });
      }
  
      if (result && result.status === 200) {
        const formattedLeaveTypes = result.data.map(item => ({
          LeaveTypeID: item.value,
          LeaveTypeName: item.name
        }));
        setLeaveTypeOptions(formattedLeaveTypes);
      }
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };
  


    // Function to handle changes in the new record form fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;

      
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));

    };


    const handleAddRecord = async () => {
      event.preventDefault();
      try {
        // Append ClientID to formData
        const dataToSend = {
          ...formData,
          ClientID: clientID,
          UserID: userID
        };
    
        // Make a POST request to the endpoint with formData and ClientID in the request body
        await axios.post(`${apiUrl}/sitemap/InsertClientLeaveTypeRecord`, dataToSend);
        
          // After successful addition, close the modal and fetch updated data
          setModalOpen(false);
          fetchData(); // Call fetchData to update the records in the table
          fetchLeaveTypes();
          setInsertRecordSuccessAlert(true);

        
      } catch (error) {
        console.error('Error adding record:', error);
      }
    };

    const handleEditRecord = async () => {
      event.preventDefault();
      try {
        // Append ClientID to formData
        const dataToSend = {
          ...formData,
          ClientID: clientID,
          UserID: userID
        };
    
        // Make a POST request to the endpoint with formData and ClientID in the request body
        await axios.post(`${apiUrl}/sitemap/EditClientLeaveTypeRecord`, dataToSend);
        
        // After successful addition, close the modal and fetch updated data
        setModalOpen(false);
        fetchData(); // Call fetchData to update the records in the table
        fetchLeaveTypes();
        setUpdateRecordSuccessAlert(true);

        
      } catch (error) {
        console.error('Error adding record:', error);
      }
    };

    const handleEditClick = async (obj) => {
      try {
        setFormType("edit");
        setModalOpen(true);
    
        // Fetch the data for the record to be edited
        const response = await axios.post(`${apiUrl}/sitemap/ClientLeaveTypeData`, {
          ClientLeaveTypeID: obj.ClientLeaveTypeID,
          ClientID: clientID
        });
    
        if (response.status === 200) {
          const editedData = response.data.result[0]; // Extract data from the response
    
          // Update the formData state with the fetched data
          setFormData({
            ClientLeaveTypeID: editedData.ClientLeaveTypeID,
            LeaveTypeID: editedData.LeaveTypeID,
            LeaveTypeName: editedData.LeaveTypeName,
            RequiresApproval: editedData.RequiresApproval.toString() // Convert to string if necessary
          });
        } else {
          console.error('Error fetching record for edit. Unexpected status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching record for edit:', error);
      }
    };
    
    
    

    const handleDeleteClick = (obj) => {
      setObjToDelete(obj); // Set the object to delete
      setShowDeleteRecordAlert(true);
    };
    

    const confirmDelete = async () => {
      try {
        // Make sure objToDelete contains the necessary data
        if (!objToDelete || !objToDelete.ClientLeaveTypeID) {
          console.error('Invalid object:', objToDelete);
          return;
        }
    
        const response = await axios.post(`${apiUrl}/sitemap/DeleteClientLeaveTypeRecord`, { ClientLeaveTypeID: objToDelete.ClientLeaveTypeID, UserID: userID });
    
        // Check if the response status is 200
        if (response.status === 200) {
          fetchData(); // update records in table
          fetchLeaveTypes();
    
          // Set deleteRecordSuccessAlert to true since the deletion was successful
          setdeleteRecordSuccesstAlert(true);
        } else {
          // If the response status is not 200, log an error
          console.error('Error deleting post. Unexpected status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        // Close the delete post confirmation dialog regardless of success or failure
        setShowDeleteRecordAlert(false);
      }
    };
    
    const hideAlert = () => {
      setShowDeleteRecordAlert(false);
      setdeleteRecordSuccesstAlert(false);
      setInsertRecordSuccessAlert(false);
      setUpdateRecordSuccessAlert(false);
    };
    

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.ClientLeaveTypeID === actionsID); 

    return (
      
      <div className="actions-right">
        <Button
          onClick={() => handleEditClick(obj)}
          color="warning"
          size="sm"
          className="btn-icon btn-link edit"
          title="Edit Record"
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          onClick={() => handleDeleteClick(obj)} // Pass obj to handleDeleteClick
          color="danger"
          size="sm"
          className="btn-icon btn-link remove"
          title="Delete Record"
        >
          <i className="fa fa-times" />
        </Button>
      </div>
    );
  };

  useEffect(() => {  
    fetchData();
    fetchLeaveTypes();

  }, [formType]);

  useEffect(() => {
    if (formData.RequiresApproval === '') {
      // If it's null, set it to "0" (No)
      setFormData(prevState => ({
        ...prevState,
        RequiresApproval: "0"
      }));
    }
  }, []);
  

  const fetchData = async () => {
    try {
      const result = await axios.post(`${apiUrl}/sitemap/ClientLeaveTypeData`, {
        ClientID: clientID,
        UserID: userID
      });
      
      if (result.status === 200) {
        setDataState(result.data.result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderContent = (content) => {


    if (content.length > 100) {
      return content.slice(0, 50) + '...';
    } else {
      return content;
    }
  };

  let columns = [
    {
      Header: "Name",
      accessor: "LeaveTypeName",
      Cell: ({ value }) => renderContent(value)
    },
    {
      Header: "Last Modified By",
      accessor: "LastModifiedUser"
    },
    {
      sortable: false,
      filterable: false,
      Header: "Actions",
      accessor: "ClientLeaveTypeID",
      Cell: ({ value }) => renderActions(value)
    }
  ];
  
  return (
    <div className="content">
      
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
      <ModalHeader>{formType == 'edit' ? 'Edit Leave Type' : 'Add Leave Type'}</ModalHeader>
  <ModalBody>
  <form onSubmit={formType === 'new' ? handleAddRecord : handleEditRecord}>
  <FormGroup>
  <Label for="leaveType">Leave Type Name *</Label>
  <Input 
  type="select" 
  id="leaveType" 
  name="LeaveTypeID" 
  value={formData.LeaveTypeID}
  onChange={handleInputChange} 
  required 
  disabled={formType === 'edit'}
>
  <option value="">Select Leave Type</option>
  {leaveTypeOptions.map(leaveType => (
   <option key={leaveType.LeaveTypeID} value={leaveType.LeaveTypeID}>{leaveType.LeaveTypeName}</option>
  ))}
</Input>


</FormGroup>  


<FormGroup>
  <Label for="requiresApproval">Requires Approval *</Label>
  <div className="form-check-radio">
    <Label className="form-check-label">
      <Input 
        type="radio" 
        name="RequiresApproval" 
        id="approvalYes" 
        value="1" 
        checked={formData.RequiresApproval === "1"} 
        onChange={handleInputChange}
      />
      Yes
      <span className="form-check-sign"></span>
    </Label>
  </div>

  <div className="form-check-radio">
    <Label className="form-check-label">
      <Input 
        type="radio" 
        name="RequiresApproval" 
        id="approvalNo" 
        value="0" 
        checked={formData.RequiresApproval === "0"} 
        onChange={handleInputChange} 
      />
      No
      <span className="form-check-sign"></span>
    </Label>
  </div>
</FormGroup>





    <div className="d-flex justify-content-center">
    <Button type="submit" color="primary">Save</Button>{' '}
    <Button type="reset" color="danger" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
  </div>


  </form>
  </ModalBody>
 
</Modal>
    <Col lg="12" md="12" sm="12">
      <div className="content d-flex justify-content-center align-items-center">
        <Row>
          <Col md="12">
            
            <div className="fixed-width-table-chart-container">
              <Card>
              <CardHeader>
  <div className="d-flex justify-content-between">
    <div>
      <CardTitle tag="h5">Leave Types</CardTitle>
    </div>
    <div>
    <Button
  style={{ backgroundColor: "#007bff", color: "#fff" }}
  size="sm"
  onClick={() => {
    setModalOpen(true);
    setFormType("new");
  }}
>
  Add Record
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

      {showDeleteRecordAlert && confirmationDeleteRecord(hideAlert, confirmDelete)}
      {deleteRecordSuccessAlert && deleteRecordSuccess(hideAlert, hideAlert)}
      {updateRecordSuccessAlert && updateRecordSuccess(hideAlert, hideAlert)}
      {insertRecordSuccessAlert && insertRecordSuccess(hideAlert, hideAlert)}

    </Col>
    </div>
  );
}

export default LeaveTypesTable;
