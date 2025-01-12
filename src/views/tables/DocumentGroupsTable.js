import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'; // Import the react-select component
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
import { confirmationDeleteRecord, deleteRecordSuccess, updateRecordSuccess, insertRecordSuccess} from '../components/SweetAlert';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router


const apiUrl = process.env.REACT_APP_APIURL;

function DocumentGroupsTable() {
  const navigate = useNavigate(); 
  const clientID = localStorage.getItem('ClientID');
  const [initialUsers, setInitialUsers] = useState([]);
  const userID = localStorage.getItem('UserID');
  const [users, setUsers] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [positions, setPositions] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [selectedPositions, setSelectedPositions] = React.useState([]);
  const [showDeletePostAlert, setShowDeletePostAlert] = React.useState(false);
  const [deleteRecordSuccessAlert, setdeleteRecordSuccesstAlert] = React.useState(false);
  const [updateRecordSuccessAlert, setUpdateRecordSuccessAlert] = React.useState(false);
  const [insertRecordSuccessAlert, setInsertRecordSuccessAlert] = React.useState(false);
  const [errorFileUploadMaximumLimitAlert, setErrorFileUploadMaximumLimitAlert] = React.useState(false);
  const [objToDelete, setObjToDelete] = useState(null); 
  const [dataState, setDataState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [documentGroups, setDocumentGroups] = useState([]);
  const [formType, setFormType] = useState('new');
  const [formData, setFormData] = useState({
    DocumentGroupID: "",
    DocumentGroupName: "",
    DocumentGroupDescription: "",
    CreatedBy: "",
    LastModifiedBy: "",
  });
  const [assignBasedOn, setAssignBasedOn] = useState('users'); // Default to 'users'
  const location = useLocation();
  // Define URLs
  const documentGroupsUrl = '/admin/sitemap/document-groups';
  const companyDocumentsUrl = '/admin/sitemap/company-documents';

  const resetModalState = () => {
    setSelectedUsers([]);
    setSelectedPositions([]);
    setUsers([]);
    setPositions([]);
    setErrors({});
    setFormData({
      CompanyDocumentID: "",
      CompanyDocumentName: "",
      CompanyDocumentDescription: "",
      DocumentGroupID: "",
      AssignOn: "users",
      UsersID: [],
      PositionsID: [],
      documentFileName: "",
      documentFile: null,
    });
    console.log('✅ Modal state reset successfully');
  };
  
  
  const handleModalClose = () => {
    resetModalState(); // Reset state
    setErrors({}); // Clear all errors
    setSelectedUsers([]); // Clear selected users
    setSelectedPositions([]); // Clear selected positions
    setFormData({
      CompanyDocumentID: "",
      CompanyDocumentName: "",
      CompanyDocumentDescription: "",
      DocumentGroupID: "",
      AssignOn: "users",
      UsersID: [],
      PositionsID: [],
      documentFileName: "",
      documentFile: null,
    });
    setModalOpen(false); // Close the modal
    console.log('✅ Modal state and errors reset successfully');
  };
  
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    let newErrors = {};
  
    // Validate required fields
    if (!formData.DocumentGroupName) {
      newErrors.DocumentGroupName = "Group Name is required.";
    }
    if (!formData.DocumentGroupDescription) {
      newErrors.DocumentGroupDescription = "Group Description is required.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.warn("❌ Validation failed. Errors:", newErrors);
      return;
    }
  
    console.log("✅ Validation passed. Proceeding with form submission...");
  
    setErrors({});
    if (formType === 'new') {
      handleAddRecord(event);
    } else {
      handleEditRecord(event);
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

  
    const handleAddRecord = async (event) => {
      event.preventDefault();
    
      try {
        // Create a FormData object
        const dataToSend = new FormData();
        dataToSend.append("DocumentGroupName", formData.DocumentGroupName);
        dataToSend.append("DocumentGroupDescription", formData.DocumentGroupDescription);
        dataToSend.append("ClientID", clientID);
        dataToSend.append("UserID", userID);
    
        // Debugging
        for (let [key, value] of dataToSend.entries()) {
          console.log(key, value);
        }
    
        axios.defaults.withCredentials = true;
    
        await axios.post(`${apiUrl}/sitemap/InsertDocumentGroupRecord`, dataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        setModalOpen(false);
        fetchData();
        setInsertRecordSuccessAlert(true);
      } catch (error) {
        console.error('❌ Error adding record:', error.response?.data || error.message);
      }
    };
    
  

    const handleEditRecord = async (event) => {
      event.preventDefault();
    
      try {
        const payload = {
          UserID: userID,
          DocumentGroupID: formData.DocumentGroupID,
          DocumentGroupName: formData.DocumentGroupName,
          DocumentGroupDescription: formData.DocumentGroupDescription,
        };
    
        const response = await axios.post(`${apiUrl}/sitemap/EditDocumentGroupRecord`, payload);
    
        if (response.status === 200) {
          fetchData(); // Refresh table data
          setUpdateRecordSuccessAlert(true);
          setModalOpen(false);
        }
      } catch (error) {
        console.error('❌ Error editing record:', error.response?.data || error.message);
      }
    };
    
  

  const handleEditClick = async (obj) => {
    try {
  
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${apiUrl}/sitemap/DocumentGroupsDataAdmin`, {
        DocumentGroupID: obj.DocumentGroupID,
        ClientID: clientID,
      });
  
      if (response.status === 200) {
        const groupDocumentData = response.data.result[0];
  
        setFormData({
          ...formData,
          DocumentGroupID: groupDocumentData.DocumentGroupID,
          DocumentGroupName: groupDocumentData.DocumentGroupName,
          DocumentGroupDescription: groupDocumentData.DocumentGroupDescription
        });
  
        setFormType("edit");
        setModalOpen(true);
      } else {
        console.error("❌ [Edit] Error: Unexpected status from API.");
      }
    } catch (error) {
      console.error("❌ [Edit] Error fetching record for edit:", error);
    }
  };
  
    const handleDeleteClick = (obj) => {
      setObjToDelete(obj); // Set the object to delete
      setShowDeletePostAlert(true);
    };
    

    const confirmDelete = async () => {
      try {
        // Make sure objToDelete contains the necessary data
        if (!objToDelete || !objToDelete.DocumentGroupID) {
          console.error('Invalid object:', objToDelete);
          return;
        }
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${apiUrl}/sitemap/DeleteDocumentGroup`, { DocumentGroupID: objToDelete.DocumentGroupID, ClientID: clientID, UserID: userID });

        // Check if the response status is 200
        if (response.status === 200) {
           // Fetch updated data
          await fetchData();
    
          // Set deleteRecordSuccessAlert to true since the deletion was successful
          setdeleteRecordSuccesstAlert(true);
        }
        else {
          // If the response status is not 200, log an error
          console.error('Error deleting post. Unexpected status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        // Close the delete post confirmation dialog regardless of success or failure
        setShowDeletePostAlert(false);
      }
    };
    
    const hideAlert = () => {
      setShowDeletePostAlert(false);
      setdeleteRecordSuccesstAlert(false);
      setInsertRecordSuccessAlert(false);
      setUpdateRecordSuccessAlert(false);
    };
    

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.DocumentGroupID === actionsID); 

    return (
      
      <div className="actions-right">
        <Button
          onClick={() => handleEditClick(obj)}
          color="warning"
          size="md"
          className="btn-icon btn-link edit"
          title="Edit Record"
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          onClick={() => handleDeleteClick(obj)} // Pass obj to handleDeleteClick
          color="danger"
          size="md"
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

  }, []);

  const fetchData = async () => {
    try {
      // Ensure axios sends credentials
      axios.defaults.withCredentials = true;
  
      // Fetch company documents
      const result = await axios.post(`${apiUrl}/sitemap/DocumentGroupsDataAdmin`, {
        ClientID: clientID
      });
  
      if (result.status === 200) {
        setDataState(result.data.result);
      }
      else if (result.status == 204) {
        setDataState([]);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  



  const renderIcon = (row) => {
    const iconName = row.cell.value;
    if (iconName) {
      return <i className={iconName} style={{ fontSize: '25px' }} />;
    } else {
      return null; // Return null if IconName is undefined or null
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
      Header: "Group Name",
      accessor: "DocumentGroupName"
    },
    {
      Header: "Created By",
      accessor: "CreatedBy"
    },
    {
      Header: "Last Modified By",
      accessor: "LastModifiedBy"
    },
    {
      sortable: false,
      filterable: false,
      Header: "Actions",
      accessor: "DocumentGroupID",
      Cell: ({ value }) => renderActions(value)
    }
  ];

  const colorOptions = [
    { value: 'danger', label: 'Red' },
    { value: 'success', label: 'Green' },
    { value: 'info', label: 'Blue' },
    { value: 'warning', label: 'Yellow' },
  ];
  
  // Inside your component JSX:
  <Input type="select" name="Colour" value={formData.Colour} onChange={handleInputChange}>
    {colorOptions.map((option, index) => (
      <option key={index} value={option.value}>{option.label}</option>
    ))}
  </Input>
  

  return (
    <div className="content" >
      <Modal 
  isOpen={modalOpen} 
  toggle={() => setModalOpen(!modalOpen)} 
  onClosed={handleModalClose} 
  backdrop="static" 
  keyboard={false} 
  style={{ paddingTop: '0px' }}
>
<ModalHeader>{formType === 'edit' ? 'Edit Document Group' : 'Add Document Group'}</ModalHeader>
<ModalBody>
  <form onSubmit={handleFormSubmit}>
    <div>
    <FormGroup>
  <Label for="title">Name *</Label>
  <Input 
    type="text" 
    id="DocumentGroupName" 
    name="DocumentGroupName" 
    value={formData.DocumentGroupName} 
    onChange={handleInputChange} 
    required 
    maxLength={100}
  />
  {errors.DocumentGroupName && <span className="text-danger">{errors.DocumentGroupName}</span>}
</FormGroup>
    </div>
    <div >
    <FormGroup>
  <Label for="content">Description *</Label>
  <Input 
    type="textarea" 
    id="DocumentGroupDescription" 
    name="DocumentGroupDescription" 
    value={formData.DocumentGroupDescription} 
    onChange={handleInputChange} 
    required 
    maxLength={500} 
  />
  {errors.DocumentGroupDescription && <span className="text-danger">{errors.DocumentGroupDescription}</span>}
</FormGroup>
    </div>

    <div className="d-flex justify-content-center">
    <Button size="sm" type="submit" color="success">Save</Button>{' '}
    <Button 
  size="sm" 
  type="reset" 
  color="danger" 
  onClick={() => {
    resetModalState();
    setModalOpen(false);
  }}
>
  Cancel
</Button>

  </div>
  </form>
  </ModalBody>
 
</Modal>


    <Col lg="12" md="12" sm="12">
      <div className="content justify-content-center align-items-center">
        <Row>
          <Col md="12">

      {/* Company Documents Button */}
      <Button
        color="default"
        type="submit"
        size="sm"
        style={{backgroundColor: '#50BCDA', color: 'white'}}
        onClick={() => {
          if (location.pathname !== companyDocumentsUrl) {
            navigate('/admin/sitemap/company-documents'); 
          }
        }}
      >
        Company Documents
      </Button>

      {/* Document Groups Button */}
      <Button
                      type = "submit"
                      color="default"
                      style={{backgroundColor: '#50BCDA', color: 'white'}}
                      size="sm"
                      onClick={() => {
                        if (location.pathname !== documentGroupsUrl) {
                          navigate('/admin/sitemap/document-groups'); 
                        }
                      }}
                    >
                      Document Groups
      </Button>
   
            
            <div className="fixed-width-table-chart-container">
              <Card>
              <CardHeader>
  <div className="d-flex justify-content-between">
    <div>
      <CardTitle tag="h5">Document Groups</CardTitle>
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
  Add Document
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

      

      {showDeletePostAlert && confirmationDeleteRecord(hideAlert, confirmDelete)}
      {deleteRecordSuccessAlert && deleteRecordSuccess(hideAlert, confirmDelete)}
      {updateRecordSuccessAlert && updateRecordSuccess(hideAlert, hideAlert)}
      {insertRecordSuccessAlert && insertRecordSuccess(hideAlert, hideAlert)}

    </Col>
    </div>

    
  );
}

export default DocumentGroupsTable;
