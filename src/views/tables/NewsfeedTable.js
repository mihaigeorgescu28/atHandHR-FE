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
import { confirmationDeleteRecord, deleteRecordSuccess, updateRecordSuccess, insertRecordSuccess} from '../components/SweetAlert';



const apiUrl = process.env.REACT_APP_APIURL;

function NewsfeedTable() {
  const clientID = localStorage.getItem('ClientID');
  const userID = localStorage.getItem('UserID');
  const [showDeletePostAlert, setShowDeletePostAlert] = React.useState(false);
  const [deleteRecordSuccessAlert, setdeleteRecordSuccesstAlert] = React.useState(false);
  const [updateRecordSuccessAlert, setUpdateRecordSuccessAlert] = React.useState(false);
  const [insertRecordSuccessAlert, setInsertRecordSuccessAlert] = React.useState(false);
  const [objToDelete, setObjToDelete] = useState(null); 
  const [dataState, setDataState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [iconOptions, setIconOptions] = useState([]);
  const [formType, setFormType] = useState('new');
  const [formData, setFormData] = useState({
    LatestNewsID: "",
    Title: "",
    Content: "",
    Colour: "",
    IconName: "",
    ModifiedDate: "",
    ModifiedUserID: ""
  });

  useEffect(() => {
    async function fetchIcons() {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${apiUrl}/sitemap/Icons`);
        if (response.status === 200) {
          setIconOptions(response.data.result.map(icon => icon.IconName));
        }
      } catch (error) {
        console.error('Error fetching icons:', error);
      }
    }

    fetchIcons();
  }, []);

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
        axios.defaults.withCredentials = true;
        // Make a POST request to the endpoint with formData and ClientID in the request body
        await axios.post(`${apiUrl}/sitemap/InsertNewsfeedRecord`, dataToSend);
        
        // After successful addition, close the modal and fetch updated data
        setModalOpen(false);
        fetchData(); // Call fetchData to update the records in the table
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
        axios.defaults.withCredentials = true;
        // Make a POST request to the endpoint with formData and ClientID in the request body
        await axios.post(`${apiUrl}/sitemap/EditNewsfeedRecord`, dataToSend);
        
        // After successful addition, close the modal and fetch updated data
        setModalOpen(false);
        fetchData(); // Call fetchData to update the records in the table
        setUpdateRecordSuccessAlert(true);
      } catch (error) {
        console.error('Error adding record:', error);
      }
    };

    const handleEditClick = async (obj) => {
      try {
        axios.defaults.withCredentials = true;
        // Fetch the data for the record to be edited
        const response = await axios.post(`${apiUrl}/sitemap/NewsfeedData`, {
          LatestNewsID: obj.LatestNewsID,
          ClientID: clientID
        });
    
        if (response.status === 200) {
          // Set the fetched data to the state
          setFormData(prevState => ({
            ...prevState,
            LatestNewsID: response.data.result[0].LatestNewsID,
            Title: response.data.result[0].Title,
            Content: response.data.result[0].Content,
            Colour: response.data.result[0].ColourCode,
            IconName: response.data.result[0].IconName
          }));
          setFormType("edit");
          // Open the modal for editing
          setModalOpen(true);
        } else {
          console.error('Error fetching record for edit. Unexpected status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching record for edit:', error);
      }
    };

    

    const handleDeleteClick = (obj) => {
      setObjToDelete(obj); // Set the object to delete
      setShowDeletePostAlert(true);
    };
    

    const confirmDelete = async () => {
      try {
        // Make sure objToDelete contains the necessary data
        if (!objToDelete || !objToDelete.LatestNewsID) {
          console.error('Invalid object:', objToDelete);
          return;
        }
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${apiUrl}/sitemap/DeleteNewsfeedRecord`, { LatestNewsID: objToDelete.LatestNewsID, UserID: userID });
    
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
    };
    

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.LatestNewsID === actionsID); 

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
      axios.defaults.withCredentials = true;
      const result = await axios.post(`${apiUrl}/sitemap/NewsfeedData`, {
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
      Header: "Title",
      accessor: "Title",
      Cell: ({ value }) => renderContent(value)
    },
    {
      Header: "Content",
      accessor: "Content",
      Cell: ({ value }) => renderContent(value)
    },
    {
      Header: "Colour",
      accessor: "Colour"
    },
    {
      Header: "Icon",
      accessor: "IconName",
      Cell: renderIcon // Render icon instead of text for Icon Name column
    },
    {
      Header: "Last Modified By",
      accessor: "ModifiedUserID"
    },
    {
      sortable: false,
      filterable: false,
      Header: "Actions",
      accessor: "LatestNewsID",
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
    <div className="content">
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
      <ModalHeader>{formType == 'edit' ? 'Edit Post' : 'Add Post'}</ModalHeader>
  <ModalBody>
  <form onSubmit={formType === 'new' ? handleAddRecord : handleEditRecord}>
    <div>
      <FormGroup>
        <Label for="title">Title *</Label>
        <Input type="text" id="title" name="Title" value={formData.Title} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>
    </div>
    <div >
      <FormGroup >
        <Label for="content">Content *</Label>
        <Input type ='textarea' id="content" name="Content" value={formData.Content} onChange={handleInputChange} required maxLength={500}  />
      </FormGroup>
    </div>
    <div>
      <FormGroup>
        <Label for="colour">Colour *</Label>
        <Input type="select" id="colour" name="Colour" value={formData.Colour} onChange={handleInputChange} required>
  <option value="">Select From Dropdown</option>
  {colorOptions.map((option, index) => (
    <option key={index} value={option.value}>{option.label}</option>
  ))}
</Input>

      </FormGroup>
    </div>
    <div>
      <FormGroup>
        <Label for="icon">Icon *</Label>
        <Input type="select" id="icon" name="IconName" value={formData.IconName} onChange={handleInputChange} required>
  <option value="">Select From Dropdown</option>
  {iconOptions.map((icon, index) => (
    <option key={index} value={icon}>
      {/* Display the icon using an <i> element with the class name */}
      <i className={icon} style={{ fontSize: '25px', marginRight: '5px' }}></i>
      {/* Display the icon name */}
      {icon}
    </option>
  ))}
</Input>


<br></br>
<div className={`d-flex justify-content-center ${formData.IconName}`} style={{ fontSize: '30px' }}></div>

<br></br>




      </FormGroup>
    </div>

    <div className="d-flex justify-content-center">
    <Button size="sm" type="submit" color="success">Save</Button>{' '}
    <Button size="sm" type="reset" color="danger" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
  </div>
  </form>
  </ModalBody>
 
</Modal>


    <Col lg="12" md="12" sm="12">
      <div className="content justify-content-center align-items-center">
        <Row>
          <Col md="12">
            
            <div className="fixed-width-table-chart-container">
              <Card>
              <CardHeader>
  <div className="d-flex justify-content-between">
    <div>
      <CardTitle tag="h5">Newsfeed</CardTitle>
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

      

      {showDeletePostAlert && confirmationDeleteRecord(hideAlert, confirmDelete)}
      {deleteRecordSuccessAlert && deleteRecordSuccess(hideAlert, confirmDelete)}
      {updateRecordSuccessAlert && updateRecordSuccess(hideAlert, hideAlert)}
      {insertRecordSuccessAlert && insertRecordSuccess(hideAlert, hideAlert)}

    </Col>
    </div>

    
  );
}

export default NewsfeedTable;
