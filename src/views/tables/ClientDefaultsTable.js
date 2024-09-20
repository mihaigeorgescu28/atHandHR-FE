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
import { updateRecordSuccess } from '../components/SweetAlert';

const apiUrl = process.env.REACT_APP_APIURL;

function ClientDefaultsTable() {
  const clientID = localStorage.getItem('ClientID');
  const userID = localStorage.getItem('UserID');
  const [updateRecordSuccessAlert, setUpdateRecordSuccessAlert] = React.useState(false);
  const [dataState, setDataState] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ClientName: "",
    ContactEmail: "",
    ContactPhone: "",
    ContactName: "",
    ContactPosition: "",
    ClientAddress: "",
    ClientPostCode: "",
    WorkingWeekends: "",
    HolidayEntitlementResetDate: "",
    HolidayEntitlementDefaultDays: "",
    HolidayEntitlementDefaultHours: "",
    InstallmentDueDate: "",
    JoinedDate: ""
  });

    // Function to handle changes in the new record form fields
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));

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
        await axios.post(`${apiUrl}/sitemap/EditClientDefaultsRecord`, dataToSend);
        
        // After successful addition, close the modal and fetch updated data
        setModalOpen(false);
        setUpdateRecordSuccessAlert(true);

        
      } catch (error) {
        console.error('Error adding record:', error);
      }
    };

    const handleEditClick = async (obj) => {
      try {
        setModalOpen(true);
        axios.defaults.withCredentials = true;
        // Fetch the data for the record to be edited
        const response = await axios.post(`${apiUrl}/sitemap/ClientDefaultsData`, {
          ClientID: clientID
        });
    
        if (response.status === 200) {
          const editedData = response.data.result[0]; // Extract data from the response
    
          // Update the formData state with the fetched data
          setFormData({
            ClientName: editedData.ClientName,
            ContactEmail: editedData.ContactEmail,
            ContactPhone: editedData.ContactPhone,
            ContactName: editedData.ContactName,
            ContactPosition: editedData.ContactPosition,
            ClientAddress: editedData.ClientAddress,
            ClientPostCode: editedData.ClientPostCode,
            WorkingWeekends: editedData.WorkingWeekends,
            HolidayEntitlementResetDate: editedData.HolidayEntitlementResetDate,
            HolidayEntitlementDefaultDays: editedData.HolidayEntitlementDefaultDays,
            HolidayEntitlementDefaultHours: editedData.HolidayEntitlementDefaultHours,
            InstallmentDueDate: editedData.InstallmentDueDate,
            JoinedDate: editedData.JoinedDate,
          });
        } else {
          console.error('Error fetching record for edit. Unexpected status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching record for edit:', error);
      }
    };
    
    
    
    const hideAlert = () => {
      setUpdateRecordSuccessAlert(false);
    };
    

  const renderActions = (actionsID) => {
    const obj = dataState.find((o) => o.ClientID === actionsID); 

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
      </div>
    );
  };

  useEffect(() => {  
    fetchData();

  }, []);

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
      axios.defaults.withCredentials = true;
      const result = await axios.post(`${apiUrl}/sitemap/ClientDefaultsData`, {
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


    if (content && content.length > 100) {
      return content.slice(0, 50) + '...';
    } else {
      return content;
    }
  };

  let columns = [
    {
      Header: "Name",
      accessor: "ClientName",
      Cell: ({ value }) => renderContent(value)
    },
    {
      Header: "Contact Email",
      accessor: "ContactEmail"
    },
    {
      Header: "Contact Phone",
      accessor: "ContactPhone"
    },
    {
      Header: "Address",
      accessor: "ClientAddress"
    },
    {
      Header: "Post Code",
      accessor: "ClientPostCode"
    },
    {
      sortable: false,
      filterable: false,
      Header: "Actions",
      accessor: "ClientID",
      Cell: ({ value }) => renderActions(value)
    }
  ];

  return (
    <div className="content">
      
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
      <ModalHeader> Edit Client Defaults</ModalHeader>
  <ModalBody>
  <form onSubmit={handleEditRecord}>

  <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
      </FormGroup>

      <FormGroup>
        <Label for="title">Name *</Label>
        <Input type="text" id="clientName" name="ClientName" value={formData.ClientName} onChange={handleInputChange} required maxLength={100}/>
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
      <CardTitle tag="h5">Client Defaults</CardTitle>
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

      {updateRecordSuccessAlert && updateRecordSuccess(hideAlert, hideAlert)}

    </Col>
    </div>
  );
}

export default ClientDefaultsTable;
