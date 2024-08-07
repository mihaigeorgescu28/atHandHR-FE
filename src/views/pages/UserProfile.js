import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import ReactDatetime from "react-datetime";

import moment from 'moment';
// reactstrap components
import {
  Button,
  Card,
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
import { errorAlert, userUpdatedSuccess, confirmationResetPasswordUserProfile, resetPasswordSuccess, errorInvalidData} from '../components/SweetAlert';

import PictureUpload from "components/CustomUpload/PictureUpload.js";

const apiUrl = process.env.REACT_APP_APIURL;
function UserProfile() {
  const [UserID, setUserID] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [daysUntilNextHoliday, setDaysUntilNextHoliday] = useState("");
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailaddressValidation, setemailaddressValidation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonenumberValidation, setphonenumberValidation] = useState("");
  const [dob, setDob] = useState("");
  const [holidayEntitlement, setHolidayEntitlement] = useState("");
  const [position, setPosition] = useState("");
  const [nino, setNino] = useState("");
  const [lineManager, setLineManager] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [buildingNameNumber, setBuildingNameNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [townCity, setTownCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const clientID = localStorage.getItem('ClientID');
  const clientName = localStorage.getItem('ClientName');
  const [showUserUpdatedSuccess, setShowUserUpdatedSuccess] = useState(false);
  const [showResetPasswordAlert, setShowResetPasswordAlert] = useState(false);
  const [showResetPasswordSuccess, setShowResetPasswordSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showErrorInvalidData, setShowErrorInvalidData] = useState(false);

  const handleImageChange = (file) => {
    setFileName(file);
  };
  
  
  const hideAlert = () => {
    setShowUserUpdatedSuccess(false);
    setShowErrorAlert(false);
    setShowResetPasswordAlert(false);
    setShowResetPasswordSuccess(false);
    setShowErrorInvalidData(false);
  };

  const handleResetPassword = async () => {
    // Show confirmation dialog for resetting password
    setShowResetPasswordAlert(true);
  };
  

  const confirmResetPassword = async () => {
    try {
      // Make an API call to reset user password with UserID in the body
      const response = await axios.post(`${apiUrl}/emails/resetUserPassword`, { UserID });
  
      if (response.status === 200) {
        // Show success message for resetting password
        setShowResetPasswordSuccess(true); // Update state to show the success SweetAlert
      } else {
        // Show SweetAlert for reset password error
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error resetting user password:', error);
  
      // Show SweetAlert for reset password error
      setShowErrorAlert(true);
    } finally {
      // Hide the confirmation dialog after execution
      setShowResetPasswordAlert(false);
    }
  };
  

  const getFormData = () => ({
    UserID,
    firstname,
    lastname,
    emailAddress,
    phoneNumber,
    nino,
    buildingNameNumber,
    streetName,
    townCity,
    country,
    postalCode,
    dob
  });

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

  const handleProfilePicSave = async (e) => {
  
    try {
      const formData = new FormData();
      const formType = 'edit'
      formData.append('formType', formType);
      formData.append('ClientID', clientID);
  
      // Append other form fields
      const currentFormData = getFormData();
      Object.entries(currentFormData).forEach(([field, value]) => {
        formData.append(field, value);
      });
  
      // Append the profile picture if available
      if (fileName) {
        // Ensure 'profilePic' is a File type
        formData.append('ProfilePicture', fileName);
      }
  
      const result = await axios.post(
        `${apiUrl}/user/submitUserForm`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (result.status === 200 && formType == 'new') {
        // Handle success
        console.log('Form data with image inserted successfully');
        setShowCreateNewUserSuccess(true);
        setTemporaryPassword(result.data.temporaryPassword)
      }
      else {
        // Handle success
        console.log('Form data with image saved successfully');
        setShowUserUpdatedSuccess(true);
      }
  
    } catch (error) {
      // Handle errors
      console.error('Error saving form data with image:', error);
      setShowErrorAlert(true);
    }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email
    const isValidEmail = verifyEmail(emailAddress);
    
    // Validate phone number
    const isValidPhoneNumber = verifyPhoneNumber(phoneNumber);




   
    // If any validation fails, prevent form submission
    if (!isValidEmail || !isValidPhoneNumber) {
      // Handle validation failure (you can show an error message, etc.)
      setemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
      setphonenumberValidation(isValidPhoneNumber ? "has-success" : "is-invalid");
      setShowErrorInvalidData(true);
      return;
    }
    
    try {
      const formData = new FormData();
      const formType = 'edit'
      formData.append('formType', formType);
      formData.append('ClientID', clientID);
  
      // Append other form fields
      const currentFormData = getFormData();
      Object.entries(currentFormData).forEach(([field, value]) => {
        formData.append(field, value);
      });
  
      // Append the profile picture if available
      if (fileName) {
        // Ensure 'profilePic' is a File type
        formData.append('ProfilePicture', fileName);
      }
  
      const result = await axios.post(
        `${apiUrl}/user/submitUserForm`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (result.status === 200 && formType == 'new') {
        // Handle success
        console.log('Form data with image inserted successfully');
        setShowCreateNewUserSuccess(true);
        setTemporaryPassword(result.data.temporaryPassword)
      }
      else {
        // Handle success
        console.log('Form data with image saved successfully');
        setShowUserUpdatedSuccess(true);
      }
  
    } catch (error) {
      // Handle errors
      console.error('Error saving form data with image:', error);
      setShowErrorAlert(true);
  
      // Check if the error status is 404 (Email Address already exists for another user)
      if (error.response.data.error == 'The user needs to have a valid email address in order to be added' && error.response.status === 400) {
        // Handle email address already exists error
        setShowErrorNoEmail(true);
      }
      else if (error.response && error.response.status === 400)
      {
        // Handle email address already exists error
        setShowErrorExistingEmail(true);
  
      }
    }
  };

  useEffect(() => {
    async function fetchUserFullName() {
      const UserID = localStorage.getItem("UserID");
      try {
        const result = await axios.post(
          `${apiUrl}/user/getUserDetails`,
          {
            UserID: UserID,
          }
        );
        if (result.status === 200) {
          setUserFullName(result.data.FullName);
          setFileName(result.data.ProfilePic);
          setProfilePic(`${apiUrl}/user_uploads/profile_pic/${result.data.ProfilePic}`);
          setDaysUntilNextHoliday(result.data.DaysUntilNextHoliday)
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserFullName();

  }, []);

  useEffect(() => {
    const UserID = localStorage.getItem("UserID");

    async function fetchUserData() {
      try {
        
        const response = await axios.get(`${apiUrl}/user/getUserData/${UserID}`);
        setUserData(response.data);

        // Extract user data and set form data
        if (response.data && response.data.length > 0) {
          const userData = response.data[0];
          setUserID(userData.UserID !== 'null' ? userData.UserID : '');
setFirstname(userData.FirstName !== 'null' ? userData.FirstName : '');
setLastname(userData.LastName !== 'null' ? userData.LastName : '');
setEmailAddress(userData.EmailAddress !== 'null' ? userData.EmailAddress : '');
setPhoneNumber(userData.PhoneNumber !== 'null' ? userData.PhoneNumber : '');
setDob(userData.DOB !== 'null' && userData.DOB !== ''  ? moment(userData.DOB).format("YYYY-MM-DD") : '');
setHolidayEntitlement(userData.HolidayEntitlement !== 'null' ? userData.HolidayEntitlement : '');
setPosition(userData.Position !== 'null' ? userData.Position : '');
setNino(userData.NINO !== 'null' ? userData.NINO : '');
setLineManager(userData.LineManager !== 'null' ? userData.LineManager : '');
setJoinedDate(userData.JoinedDate !== 'null' ? userData.JoinedDate : '');
setBuildingNameNumber(userData.BuildingNameNumber !== 'null' ? userData.BuildingNameNumber : '');
setStreetName(userData.StreetName !== 'null' ? userData.StreetName : '');
setTownCity(userData.TownCity !== 'null' ? userData.TownCity : '');
setCountry(userData.Country !== 'null' ? userData.Country : '');
setPostalCode(userData.PostalCode !== 'null' ? userData.PostalCode : '');

        }

      } catch (error) {
        console.error(error);
      }
    }

    if (UserID) {
      fetchUserData();
    }
  }, []);


  return (
    <>
      <div className="content">
        <Row>
        <Col md="4">
  <Card className="card-user" style={{ paddingBottom: '25px' }}>
    <div className="image">
      <img
        alt="..."
        src={require("assets/img/bg/luke-chesser.jpg")}
      />
    </div>
    <CardBody>
      <div className="author">
        
          <PictureUpload profilePic={fileName} onImageChange={handleImageChange} />
          <br />
          <h5 className="title">{userFullName}</h5>
          
        
      </div>
      <br />

      {fileName && 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        type="submit"
        className="btn-round"
        color="success"
        onClick={() => {
          handleProfilePicSave();
        }}
      >
        Save Profile Picture
      </Button>
    </div>
    }
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          type="submit"
          className="btn-round"
          color="warning"
          onClick={() => {
            handleResetPassword();
          }}
        >
          Reset Password
        </Button>
      </div>
    </CardBody>
  </Card>

  <Card className="card-stats">
    <CardBody>
      <Row>
        <Col md="4" xs="5">
          <div className="icon-big text-center icon-warning">
            <i className="nc-icon nc-sun-fog-29" />
          </div>
        </Col>
        <Col md="8" xs="7">
          <div className="numbers">
            <p className="card-category">Days until next holiday</p>
            <CardTitle tag="p">
              {daysUntilNextHoliday}
            </CardTitle>
            <p />
          </div>
        </Col>
      </Row>
    </CardBody>
  </Card>
</Col>


          <Col md="8">
            <Card>
              
              <CardBody>
                <Form onSubmit={handleFormSubmit} >
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Company</label>
                        <Input
                          disabled
                          defaultValue={clientName}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input className={`form-control ${emailaddressValidation}`} defaultValue={emailAddress} placeholder="Email" type="email" disabled />
                      </FormGroup>
                    </Col>

                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Phone Number
                        </label>
                        <Input
                        className={`form-control ${phonenumberValidation}`}
                        type="text"
                        defaultValue={phoneNumber}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setPhoneNumber(inputValue);
                      
                          // Validate phone number
                          const isValidNumber = verifyPhoneNumber(inputValue);
                      
                          // Update validation class
                          setphonenumberValidation(isValidNumber ? "has-success" : "is-invalid");
                        }}
                        onBlur={() => {
                          // Re-validate and set validation class on blur
                          const isValidNumber = verifyPhoneNumber(phoneNumber);
                          setphonenumberValidation(isValidNumber ? "has-success" : "is-invalid");
                        }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={firstname}
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue={lastname}
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Building Name/Number</label>
                        <Input
                          defaultValue={buildingNameNumber}
                          type="text"
                        onChange={(e) => setBuildingNameNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Street Name</label>
                        <Input
                          defaultValue={streetName}
                          type="text"
                          onChange={(e) => setStreetName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Town/City</label>
                        <Input
                          defaultValue={townCity}
                          type="text"
                          onChange={(e) => setTownCity(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue={country}
                          type="text"
                          onChange={(e) => setCountry(e.target.value)}
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input type="text" defaultValue={postalCode} 
                        onChange={(e) => setPostalCode(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Joined Date</label>
                        <ReactDatetime
  inputProps={{
    className: "form-control",
    placeholder: "N/A",
    readOnly: true
  }}
  value={joinedDate && moment(joinedDate).isValid() ? moment(joinedDate).format("DD/MM/YYYY") : ""}
  dateFormat="DD/MM/YYYY"
  timeFormat={false}
  open={false}
/>


                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Position</label>
                        <Input
                          defaultValue={position}
                          type="text"
                          placeholder="N/A"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Holiday Entitlement Left</label>
                        <Input defaultValue={holidayEntitlement} type="text" placeholder="N/A" disabled />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>National Insurance Number</label>
                        <Input
                          defaultValue={nino}
                          type="text"
                          onChange={(e) => setNino(e.target.value)}
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Date Of Birth</label>
                        <ReactDatetime
  inputProps={{
    className: "form-control",
    placeholder: "Select here",
  }}
  value={dob && moment(dob).isValid() ? moment(dob).format("DD/MM/YYYY") : null}
  dateFormat="DD/MM/YYYY"
  timeFormat={false}
  onChange={(momentObj) => {
    if (momentObj && momentObj.format && typeof momentObj.format === 'function') {
      setDob(momentObj.format("YYYY-MM-DD"));
    } else {
      // Handle the case where momentObj is not a valid moment.js object
      console.error("Invalid moment object:", momentObj);
      // Set a default value or handle the error gracefully
      setDob(null); // You can set a default value or handle the error in a different way
    }
  }}
/>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                    <FormGroup>
                        <label>Line Manager</label>
                        <Input
                          defaultValue={lineManager}
                          type="text"
                          placeholder="N/A"
                          disabled
                        />
                      </FormGroup>
                    </Col>
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
</div>

                  </Col>
                  </Row>
                </Form>

                {showErrorAlert && errorAlert(hideAlert)}
{showUserUpdatedSuccess && userUpdatedSuccess(hideAlert)}

{showResetPasswordAlert && confirmationResetPasswordUserProfile(hideAlert, confirmResetPassword)}
{showResetPasswordSuccess && resetPasswordSuccess(hideAlert, hideAlert)}

{showErrorInvalidData && errorInvalidData(hideAlert)}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
