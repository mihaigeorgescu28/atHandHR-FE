import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  Label,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import {errorInvalidData, errorAlert, updateRecordSuccess} from '../components/SweetAlert';

const apiUrl = process.env.REACT_APP_APIURL;

function ClientDefaultsForm() {
  const navigate = useNavigate();
  const clientID = localStorage.getItem('ClientID');
  const userID = localStorage.getItem('UserID');
  const [formData, setFormData] = useState({
    ClientName: "",
    ContactEmail: "",
    ContactPhone: "",
    ContactName: "",
    ContactPosition: "",
    ClientAddress: "",
    ClientPostCode: "",
    WorkingWeekends: "",
    HolidayEntitlementResetMonth: "",
    HolidayEntitlementResetDay: "",
    HolidayEntitlementDefaultDays: "",
    HolidayEntitlementDefaultHours: "",
    InstallmentDueDate: "",
    JoinedDate: ""
  });

  const [phonenumberValidation, setphonenumberValidation] = useState("");
  const [emailaddressValidation, setemailaddressValidation] = useState("");
  const [holidayEntitlementResetMonthValidation, setHolidayEntitlementResetMonthValidation] = useState("");
  const [holidayEntitlementResetDayValidation, setHolidayEntitlementResetDayValidation] = useState("");
  const [holidayEntitlementDefaulDaysValidation, setHolidayEntitlementDefaulDaysValidation] = useState("");
  const [holidayEntitlementDefaulHoursValidation, setHolidayEntitlementDefaulHoursValidation] = useState("");
  const [showErrorInvalidData, setShowErrorInvalidData] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [updateRecordSuccessAlert, setUpdateRecordSuccessAlert] = useState(false);

    // Function to handle changes in the new record form fields
      const handleInputChange = (e) => {
      
        const { name, value } = e.target;
        
        
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
  
      };

  
  const hideAlert = () => {
    setShowErrorInvalidData(false);
    setShowErrorAlert(false);
    setUpdateRecordSuccessAlert(false);
  };


  const verifyEmail = (value) => {
    // Regular expression for email validation
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    // Treat an empty string as valid
    if (value === '') {
      return true;
    }
  
    // Check if the value matches the email regular expression
    if (emailRex.test(value)) {
      return true;
    }
  
    return false;
  };

  const verifyPhoneNumber = (value) => {
    // Treat an empty string as valid for phone number
    if (value === '') {
      return true;
    }
  
    // Check if all characters in the string are numbers
    if (/^\d+$/.test(value)) {
      return true;
    }
  
    // If the string is not empty and contains non-numeric characters, treat as invalid
    return false;
  };

  const verifyNumber = (number, maxNumber) => {
    // Treat an empty string as valid for phone number
    if (number === '') {
      return true;
    }
    // Cast the parameters to integers
    const num = parseInt(number, 10);
    const maxNum = parseInt(maxNumber, 10);
  
    // Check if the casted values are valid numbers
    if (isNaN(num) || isNaN(maxNum)) {
      return false;
    }
  
    // Check if the number exceeds the maximum value
    if (num > maxNum) {
      return false;
    }
  
    // If all checks pass, return true
    return true;
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

   const isValidEmail = verifyEmail(formData.ContactEmail);
   const isValidPhoneNumber = verifyPhoneNumber(formData.ContactPhone);
   const isHolidayEntitlementResetMonthValidation = verifyNumber(formData.HolidayEntitlementResetMonth, 12);
   const isHolidayEntitlementResetDay = verifyNumber(formData.HolidayEntitlementResetDay, 31);
   const isHolidayEntitlementDefaultDays = verifyNumber(formData.HolidayEntitlementDefaultDays, 100);
   const isHolidayEntitlementDefaultHours = verifyNumber(formData.HolidayEntitlementDefaultHours, 12);

    if (!isValidEmail || !isValidPhoneNumber || !isHolidayEntitlementResetMonthValidation || !isHolidayEntitlementResetDay || !isHolidayEntitlementDefaultDays || !isHolidayEntitlementDefaultHours) 
      {
        setShowErrorInvalidData(true);

        return;
      }

    // Handle form submission
      try {
        // Append ClientID to formData
        const dataToSend = {
          ...formData,
          ClientID: clientID,
          UserID: userID
        };
    
        const response = await axios.post(`${apiUrl}/sitemap/SubmitClientDefaultsRecord`, dataToSend);
  
  // Check if the response status is 200
  if (response.status === 200) {
    setUpdateRecordSuccessAlert(true);
  } else {
    setShowErrorAlert(true);

  }
        // After successful addition, close the modal and fetch updated data
        setModalOpen(false);
        setUpdateRecordSuccessAlert(true);

        
      } catch (error) {
        console.error('Error adding record:', error);
      }

  };

  useEffect(() => {
    async function fetchClientDefaultsData() {
      try {
        // Fetch ClientDefaultsData
        const response = await axios.post(`${apiUrl}/sitemap/ClientDefaultsData`, {
          ClientID: localStorage.getItem('ClientID')
        });

        if (response.status === 200) {
          const data = response.data.result[0];
          setFormData({
            ClientName: data.ClientName,
            ContactEmail: data.ContactEmail,
            ContactPhone: data.ContactPhone,
            ContactName: data.ContactName,
            ContactPosition: data.ContactPosition,
            ClientAddress: data.ClientAddress,
            ClientPostCode: data.ClientPostCode,
            WorkingWeekends: data.WorkingWeekends,
            HolidayEntitlementResetMonth: data.HolidayEntitlementResetMonth,
            HolidayEntitlementResetDay: data.HolidayEntitlementResetDay,
            HolidayEntitlementDefaultDays: data.HolidayEntitlementDefaultDays,
            HolidayEntitlementDefaultHours: data.HolidayEntitlementDefaultHours,
            InstallmentDueDate: data.InstallmentDueDate,
            JoinedDate: data.JoinedDate
          });
        } else {
          console.error('Error fetching ClientDefaultsData. Unexpected status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching ClientDefaultsData:', error);
      }
    }

    // Call the function to fetch data when the component mounts
    fetchClientDefaultsData();
  }, []); 

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Form onSubmit={handleFormSubmit} >
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Company Name</label>
                        <Input
                          name="ClientName"
                          defaultValue={formData.ClientName}
                          type="text"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Joined Date</label>
                        <Input
                          disabled
                          defaultValue={formData.JoinedDate}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Contact Person Name</label>
                        <Input
                          name="ContactName"
                          defaultValue={formData.ContactName}
                          type="text"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Contact Person Position</label>
                        <Input
                          name="ContactPosition"
                          defaultValue={formData.ContactPosition}
                          type="text"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    
                    
                  </Row>

                  <Row>

                  <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Contact Email Address</label>
                        <Input
                          name="ContactEmail"
                          defaultValue={formData.ContactEmail}
                          type="text"
                          className={`form-control ${emailaddressValidation}`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            handleInputChange(e);
                            // Validate email
                            const isValidEmail = verifyEmail(inputValue);
                      
                            // Update validation class
                            setemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
                          }}
                        />
                      </FormGroup>
                    </Col>

                  <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Contact Phone Number</label>
                        <Input
                          name="ContactPhone"
                          defaultValue={formData.ContactPhone}
                          className={`form-control ${phonenumberValidation}`}
                          type="text"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                        
                            // Validate phone number
                            const isValidNumber = verifyPhoneNumber(inputValue);
                            handleInputChange(e);
                            // Update validation class
                            setphonenumberValidation(isValidNumber ? "has-success" : "is-invalid");
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Installment Due Day</label>
                        <Input
                          disabled
                          defaultValue={formData.InstallmentDueDate}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                   
                    <Col className="pr-1" md="8">
                      <FormGroup>
                        <label>Company Address</label>
                        <Input
                          name="ClientAddress"
                          defaultValue={formData.ClientAddress}
                          type="text"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pr-1" md="2">
                      <FormGroup>
                        <label>Company Postcode</label>
                        <Input
                          name="ClientPostCode"
                          defaultValue={formData.ClientPostCode}
                          type="text"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="pr-1" md="2">
                    <FormGroup>
      <Label for="workingWeekends">Working Weekends</Label>
      <Input type="select" name="WorkingWeekends" id="WorkingWeekends" value={formData.WorkingWeekends} onChange={handleInputChange}> 
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </Input>
    </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Holiday Entitlement Reset Month (1-12)</label>
                        <Input
                          name="HolidayEntitlementResetMonth"
                          defaultValue={formData.HolidayEntitlementResetMonth}
                          type="text"
                          className={`form-control ${holidayEntitlementResetMonthValidation}`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const isValidNumber = verifyNumber(inputValue, 12);
                            handleInputChange(e);
                            setHolidayEntitlementResetMonthValidation(isValidNumber ? "has-success" : "is-invalid");
                          }}
                        />
                      </FormGroup>
                    </Col>
                  <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Holiday Entitlement Reset Day (1-31)</label>
                        <Input
                          name="HolidayEntitlementResetDay"
                          defaultValue={formData.HolidayEntitlementResetDay}
                          type="text"className={`form-control ${holidayEntitlementResetDayValidation}`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const isValidNumber = verifyNumber(inputValue, 31);
                            handleInputChange(e);
                            setHolidayEntitlementResetDayValidation(isValidNumber ? "has-success" : "is-invalid");
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Holiday Entitlement Default Days</label>
                        <Input
                          name="HolidayEntitlementDefaultDays"
                          defaultValue={formData.HolidayEntitlementDefaultDays}
                          type="text"
                          className={`form-control ${holidayEntitlementDefaulDaysValidation}`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const isValidNumber = verifyNumber(inputValue, 100);
                            handleInputChange(e);
                            setHolidayEntitlementDefaulDaysValidation(isValidNumber ? "has-success" : "is-invalid");
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Holiday Entitlement Default Hours</label>
                        <Input
                          name="HolidayEntitlementDefaultHours"
                          defaultValue={formData.HolidayEntitlementDefaultHours}
                          type="text"
                          className={`form-control ${holidayEntitlementDefaulHoursValidation}`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const isValidNumber = verifyNumber(inputValue, 12);
                            handleInputChange(e);
                            setHolidayEntitlementDefaulHoursValidation(isValidNumber ? "has-success" : "is-invalid");
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  
                  </Row>
                  <Row className="justify-content-center">
                  <Col  md="2">
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Button
    type="submit"
    className="btn-round"
    color="success"
  >
    Save
  </Button>
  <Button
  type="reset"
  className="btn-round"
  color="danger"
  onClick={() => navigate('/admin/sitemap')}
>
  Cancel
</Button>

</div>
                  </Col>
                  </Row>
                </Form>
            
            
{showErrorInvalidData && errorInvalidData(hideAlert)}
{showErrorAlert && errorAlert(hideAlert)}
{updateRecordSuccessAlert && updateRecordSuccess(hideAlert)}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClientDefaultsForm;
