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
import { confirmationDeleteRecord, deleteRecordSuccess, updateRecordSuccess, insertRecordSuccess, errorFileUploadMaximumLimit} from '../components/SweetAlert';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router


const apiUrl = process.env.REACT_APP_APIURL;

function CompanyDocumentsTable() {
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
    CompanyDocumentID: "",
    CompanyDocumentDescription: "",
    CompanyDocumentName: "",
    AssignOn: "users",
    UsersID: [],
    PositionsID: [],
    DocumentGroupID: "",
    ModifiedDate: "",
    ModifiedUserID: "",
    documentFileName: "", // New File (Uploaded)
    currentFileName: "", // Static file name from backend
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
    if (!formData.CompanyDocumentName) {
      newErrors.CompanyDocumentName = "Name is required.";
    }
    if (!formData.CompanyDocumentDescription) {
      newErrors.CompanyDocumentDescription = "Description is required.";
    }
    if (!formData.DocumentGroupID) {
      newErrors.DocumentGroupID = "Please select a document group.";
    }
  
    // Validation for file upload
    if (formType === 'new' && !formData.documentFile) {
      newErrors.documentFileName = "Please upload a file.";
    }
  
    if (formType === 'edit' && !formData.currentFileName && !formData.documentFile) {
      newErrors.documentFileName = "Please upload a file or ensure an existing one exists.";
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
  
  
  
  const handleViewClick = (fileName) => {
    if (!fileName) {
      console.error("Invalid file name.");
      setShowErrorAlert(true); // Optional: Show an error alert
      return;
    }
  
    const fileUrl = `${apiUrl}/user_uploads/${clientID}/company_documents/${fileName}`;
    window.open(fileUrl, "_blank");
  };
  
  
  

  const handleAssignBasedOnChange = (event) => {
    setAssignBasedOn(event.target.value);
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));

  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
  
    if (file) {
      const maxFileSize = 25 * 1024 * 1024; // 25MB in bytes
  
      // Validate file size
      if (file.size > maxFileSize) {
        setErrorFileUploadMaximumLimitAlert(true);
        setFormData((prevData) => ({
          ...prevData,
          documentFileName: "", // Reset the new file selection
          documentFile: null,
        }));
        return; // Do not proceed if file exceeds the size
      }
  
      // Valid file
      setFormData((prevData) => ({
        ...prevData,
        documentFileName: file.name,
        documentFile: file, // Store the file object for upload
      }));
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

    // Add "Select All" option to the list of users
  const allUserOptions = [{ value: 'all', label: 'Select All' }, ...users];

  const allPositionOptions = [{ value: 'all', label: 'Select All' }, ...positions];

  const handleInputChangeMulti = (selectedOptions, dropdownName) => {
    console.log(`🛠️ [Dropdown Change] ${dropdownName} Dropdown Changed:`, selectedOptions);
  
    const safeSelectedOptions = selectedOptions || [];
  
    if (dropdownName === "users" || dropdownName === "positions") {
      const isSelectAll = safeSelectedOptions.some(option => option.value === 'all');
  
      let finalSelections = safeSelectedOptions;
  
      if (isSelectAll) {
        // Select all items (combine with already selected ones)
        const allAvailableItems = (dropdownName === "users" ? users : positions).filter(item => item.value !== 'all');
        finalSelections = Array.from(
          new Map(
            [...(dropdownName === "users" ? selectedUsers : selectedPositions), ...allAvailableItems]
              .map(item => [String(item.value), item])
          ).values()
        );
      }
  
      // Handle clearing all selections
      if (safeSelectedOptions.length === 0) {
        console.log(`🔄 [Dropdown Change] All ${dropdownName} selections cleared. Resetting dropdown...`);
  
        if (dropdownName === "users") {
          setSelectedUsers([]);
          setUsers([
            { value: 'all', label: 'Select All' },
            ...initialUsers.filter(user => user.value !== 'all')
          ]);
          setFormData(prevState => ({ ...prevState, UsersID: [] }));
        } else if (dropdownName === "positions") {
          setSelectedPositions([]);
          setPositions([
            { value: 'all', label: 'Select All' },
            ...positions.filter(position => position.value !== 'all')
          ]);
          setFormData(prevState => ({ ...prevState, PositionsID: [] }));
        }
  
        console.log(`✅ [Dropdown Change] ${dropdownName} dropdown reset.`);
        return;
      }
  
      // Update state and formData
      if (dropdownName === "users") {
        setSelectedUsers(finalSelections);
        setFormData(prevState => ({ ...prevState, UsersID: finalSelections.map(option => option.value) }));
      } else if (dropdownName === "positions") {
        setSelectedPositions(finalSelections);
        setFormData(prevState => ({ ...prevState, PositionsID: finalSelections.map(option => option.value) }));
      }
  
      console.log(`✅ [Dropdown Change] Final ${dropdownName} selections:`, finalSelections);
    }
  };
  
  

  const handleAddRecord = async (event) => {
    event.preventDefault();
  
    try {
      // Create a FormData object
      const dataToSend = new FormData();
  
      // Append the file if it exists
      if (formData.documentFile) {
        dataToSend.append("file", formData.documentFile);
      }
  
      // Append the other form fields
      dataToSend.append("CompanyDocumentName", formData.CompanyDocumentName);
      dataToSend.append("CompanyDocumentDescription", formData.CompanyDocumentDescription);
      dataToSend.append("AssignOn", assignBasedOn);
      dataToSend.append("UsersID", JSON.stringify(formData.UsersID)); // Convert array to JSON string
      dataToSend.append("PositionsID", JSON.stringify(formData.PositionsID)); // Convert array to JSON string
      dataToSend.append("DocumentGroupID", formData.DocumentGroupID);
      dataToSend.append("ClientID", clientID);
      dataToSend.append("UserID", userID);

       // Log the FormData contents
    for (let [key, value] of dataToSend.entries()) {
      console.log(key, value);
    }
  
      axios.defaults.withCredentials = true;
  
      // Send the FormData object with Axios
      await axios.post(
        `${apiUrl}/sitemap/InsertDocumentRecord`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            clientid: clientID, // Pass ClientID in headers
          },
        }
      );

      
  
      setModalOpen(false);
      fetchData();
      setInsertRecordSuccessAlert(true);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };
  

  const handleEditRecord = async (event) => {
    event.preventDefault();
  
    try {
      const dataToSend = new FormData();
  
      // Append file only if a new one was uploaded
      if (formData.documentFile) {
        dataToSend.append("file", formData.documentFile);
      }
  
      dataToSend.append("CompanyDocumentID", formData.CompanyDocumentID);
      dataToSend.append("CompanyDocumentName", formData.CompanyDocumentName);
      dataToSend.append("CompanyDocumentDescription", formData.CompanyDocumentDescription);
      dataToSend.append("AssignOn", assignBasedOn);
      dataToSend.append("UsersID", JSON.stringify(formData.UsersID));
      dataToSend.append("PositionsID", JSON.stringify(formData.PositionsID));
      dataToSend.append("DocumentGroupID", formData.DocumentGroupID);
      dataToSend.append("ClientID", clientID);
      dataToSend.append("UserID", userID);
  
      await axios.post(`${apiUrl}/sitemap/EditDocumentRecord`, dataToSend);
      setModalOpen(false);
      fetchData();
      setUpdateRecordSuccessAlert(true);
    } catch (error) {
      console.error('❌ Error editing record:', error);
    }
  };
  

  const handleEditClick = async (obj) => {
    try {
      console.log("🛠️ [Edit] Fetching document data for editing...");
  
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${apiUrl}/sitemap/CompanyDocumentsDataAdmin`, {
        CompanyDocumentID: obj.CompanyDocumentID,
        ClientID: clientID,
      });
  
      if (response.status === 200) {
        const documentData = response.data.result[0];
        console.log("✅ [Edit] Document Data Fetched:", documentData);
  
        // Map selected users
        const selectedUsers = documentData.UsersID.map((userId, index) => ({
          value: String(userId), // Ensure consistent string comparison
          label: documentData.UsersName[index],
        }));
        console.log("✅ [Edit] Selected Users from API:", selectedUsers);
  
        // Filter users, removing selected ones (enforce string comparison)
        const filteredUsers = users.filter(
          (user) => !documentData.UsersID.includes(String(user.value))
        );
        console.log("✅ [Edit] Filtered Users for Dropdown (excluding selected):", filteredUsers);
  
        setUsers(filteredUsers); // Only filtered users in dropdown
        setSelectedUsers(selectedUsers); // Pre-select the users
  
        setFormData({
          ...formData,
          CompanyDocumentID: documentData.CompanyDocumentID,
          CompanyDocumentName: documentData.CompanyDocumentName,
          CompanyDocumentDescription: documentData.CompanyDocumentDescription,
          DocumentGroupID: documentData.DocumentGroupID,
          AssignOn: documentData.AssignOn,
          documentFileName: documentData.FileName || "", // Show existing file nam
          currentFileName: documentData.FileName, // Set original filename from backend
          documentFileName: "", // Reset uploaded file name
        });
  
        console.log("✅ [Edit] Final Dropdown Users (Filtered):", filteredUsers);
        console.log("✅ [Edit] Final Selected Users:", selectedUsers);
  
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
      console.log("Object to delete:", obj); // Debugging line
      setShowDeletePostAlert(true);
    };
    

    const confirmDelete = async () => {
      try {
        // Make sure objToDelete contains the necessary data
        console.log("loog: ", objToDelete)
        if (!objToDelete || !objToDelete.CompanyDocumentID) {
          console.error('Invalid object:', objToDelete);
          return;
        }
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${apiUrl}/sitemap/DeleteDocumentRecord`, { CompanyDocumentID: objToDelete.CompanyDocumentID, ClientID: clientID, UserID: userID });
    
        // Check if the response status is 200
        if (response.status === 200) {
          fetchData(); // update records in table
    
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
        setShowDeletePostAlert(false);
      }
    };
    
    const hideAlert = () => {
      setShowDeletePostAlert(false);
      setdeleteRecordSuccesstAlert(false);
      setInsertRecordSuccessAlert(false);
      setUpdateRecordSuccessAlert(false);
      setErrorFileUploadMaximumLimitAlert(false);
    };
    

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.CompanyDocumentID === actionsID); 

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
      const result = await axios.post(`${apiUrl}/sitemap/CompanyDocumentsDataAdmin`, {
        ClientID: clientID,
        UserID: userID
      });
  
      if (result.status === 200) {
        setDataState(result.data.result);
      }
  
      // Fetch line managers after fetching company documents
      const lineManagersResponse = await axios.post(
        `${apiUrl}/user/getLineManagers`,
        { clientId: clientID },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (lineManagersResponse.data && lineManagersResponse.data.LineManagers) {
        const lineManagersArray = lineManagersResponse.data.LineManagers.map(manager => ({
          value: manager.value,
          label: manager.label,
        }));
        setUsers([
          { value: 'all', label: 'Select All' },
          ...lineManagersArray,
        ]);
        setInitialUsers([
          { value: 'all', label: 'Select All' },
          ...lineManagersArray,
        ]); // Keep an unmodified copy
      }
      

      // Fetch line managers after fetching company documents
      const clientPositionsResponse = await axios.post(
        `${apiUrl}/user/getClientPositions`,
        { clientId: clientID },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (clientPositionsResponse.data && clientPositionsResponse.data.Positions) {
        const positionsArray = clientPositionsResponse.data.Positions.map(position => ({
          value: position.value,
          label: position.label,
        }));
        setPositions(positionsArray);
      } else {
        console.error('Invalid response format for client positions:', clientPositionsResponse.data);
      }
      

    // Fetch document groups
    const documentGroupsResponse = await axios.post(
      `${apiUrl}/sitemap/GetDocumentGroups`,
      { ClientID: clientID },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (documentGroupsResponse.data && documentGroupsResponse.data.DocumentGroups) {
      const documentGroupsArray = documentGroupsResponse.data.DocumentGroups.map(group => ({
        value: group.value,
        label: group.label,
      }));
      setDocumentGroups(documentGroupsArray); // Assuming setDocumentGroups is the state setter for document groups
    } else {
      console.error('Invalid response format for document groups:', documentGroupsResponse.data);
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
      Header: "Document Name",
      accessor: "CompanyDocumentName"
    },
    {
      Header: "Document Group",
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
      accessor: "CompanyDocumentID",
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
<ModalHeader>{formType === 'edit' ? 'Edit Document' : 'Add Document'}</ModalHeader>
<ModalBody>
  <form onSubmit={handleFormSubmit}>
    <div>
    <FormGroup>
  <Label for="title">Name *</Label>
  <Input 
    type="text" 
    id="CompanyDocumentName" 
    name="CompanyDocumentName" 
    value={formData.CompanyDocumentName} 
    onChange={handleInputChange} 
    required 
    maxLength={100}
  />
  {errors.CompanyDocumentName && <span className="text-danger">{errors.CompanyDocumentName}</span>}
</FormGroup>
    </div>
    <div >
    <FormGroup>
  <Label for="content">Description *</Label>
  <Input 
    type="textarea" 
    id="CompanyDocumentDescription" 
    name="CompanyDocumentDescription" 
    value={formData.CompanyDocumentDescription} 
    onChange={handleInputChange} 
    required 
    maxLength={500} 
  />
  {errors.CompanyDocumentDescription && <span className="text-danger">{errors.CompanyDocumentDescription}</span>}
</FormGroup>
    </div>
    <div>
    <FormGroup tag="fieldset" style={{ marginLeft: 0 }} required>
  <Label>Assign Based On:</Label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: -35 }}>
    <FormGroup check>
      <Label check style={{ marginLeft: 0 }}>
        <Input
          type="radio"
          name="AssignOn"
          value="users"
          checked={assignBasedOn === 'users'}
          onChange={handleAssignBasedOnChange}
        />
        Users
      </Label>
    </FormGroup>
    <FormGroup check>
      <Label check style={{ marginLeft: 0 }}>
        <Input
          type="radio"
          name="AssignOn"
          value="positions"
          checked={assignBasedOn === 'positions'}
          onChange={handleAssignBasedOnChange}
        />
        Positions
      </Label>
    </FormGroup>
  </div>
</FormGroup>

{assignBasedOn === 'users' && (
  <FormGroup>
  <Label for="users">Users *</Label>
  <Select
    key={selectedUsers.map(user => user.value).join(',')} // Re-render when selectedUsers change
    id="UsersID"
    name="UsersID"
    isMulti
    options={users}
    value={selectedUsers}
    onChange={(selectedOptions) => handleInputChangeMulti(selectedOptions, "users")}
    placeholder="Select From Dropdown"
    className="basic-multi-select"
    classNamePrefix="select"
    closeMenuOnSelect={false}
    isClearable
  />
  {errors.users && <span className="text-danger">{errors.users}</span>}
</FormGroup>




)}

{assignBasedOn === 'positions' && (
  <FormGroup>
    <Label for="positions">Positions *</Label>
    <Select
      id="PositionsID"
      name="PositionsID"
      isMulti
      options={positions}
      value={selectedPositions}
      onChange={(selectedOptions) => handleInputChangeMulti(selectedOptions, "positions")}
      placeholder="Select From Dropdown"
      className="basic-multi-select"
      classNamePrefix="select"
      closeMenuOnSelect={false} // Keep dropdown open for multiple selections
      isClearable
    />
    {errors.positions && <span className="text-danger">{errors.positions}</span>}
  </FormGroup>
)}


    </div>
    <div>
    <FormGroup>
  <Label for="documentGroup">Document Group *</Label>
  <Select
    id="DocumentGroupID"
    name="DocumentGroupID"
    options={documentGroups}
    value={documentGroups.find(option => option.value === formData.DocumentGroupID)}
    onChange={(selectedOption) => handleInputChange({ target: { name: 'DocumentGroupID', value: selectedOption.value } })}
    placeholder="Select From Dropdown"
    className="basic-single"
    classNamePrefix="select"
  />
  {errors.DocumentGroupID && <span className="text-danger">{errors.DocumentGroupID}</span>}
</FormGroup>
</div>

    <div>

{formType === 'edit' && (
  <FormGroup>
    <Label>Current File</Label>
    <Input
      type="text"
      value={formData.currentFileName || "No file uploaded"}
      readOnly
      onClick={() => handleViewClick(formData.currentFileName)}
      style={{ cursor: formData.currentFileName ? "pointer" : "default" }}
    />
  </FormGroup>
)}


{formType === 'edit' && (
  <FormGroup>
    <Label>Change Existing File</Label>
    <Input
      type="file"
      id="changeFile"
      name="documentFileName"
      onChange={handleFileUpload}
      accept=".pdf,.doc,.docx,.txt,.png,.jpg"
    />
    
  </FormGroup>
)}


{formType === 'new' && (
  <FormGroup>
    <Label>Upload File</Label>
    <Input
      type="file"
      id="uploadFile"
      name="documentFileName"
      onChange={handleFileUpload}
      required
      accept=".pdf,.doc,.docx,.txt,.png,.jpg"
    />
    {errors.documentFileName && <span className="text-danger">{errors.documentFileName}</span>}
  </FormGroup>
)}


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
      <CardTitle tag="h5">Documents</CardTitle>
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
      {errorFileUploadMaximumLimitAlert && errorFileUploadMaximumLimit(hideAlert, hideAlert)}

    </Col>
    </div>

    
  );
}

export default CompanyDocumentsTable;
