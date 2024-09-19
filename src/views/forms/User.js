import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Col, Button, Row } from "reactstrap";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_APIURL;

// wizard steps
import Step1 from "./WizardSteps/Step1.js";
import Step2 from "./WizardSteps/Step2.js";
import Step3 from "./WizardSteps/Step3.js";

import { errorExistingEmail, errorAlert, errorNoEmail, createNewUserSuccess, userUpdatedSuccess, errorInvalidData, showErrorNoEmail, showErrorExistingEmail} from '../components/SweetAlert';




function UserForm({ userData }) {

   // Ensure userData is defined before accessing its properties
   if (!userData) {
    return <p>Loading...</p>;
  }

const [showUserUpdatedSuccess, setShowUserUpdatedSuccess] = useState(false);
const [showErrorAlert, setShowErrorAlert] = useState(false);
const [showErrorExistingEmail, setShowErrorExistingEmail] = useState(false);
const [showErrorNoEmail, setShowErrorNoEmail] = useState(false);
const [showCreateNewUserSuccess, setShowCreateNewUserSuccess] = useState(false);
const [temporaryPassword, setTemporaryPassword] = useState('');
const [showErrorInvalidData, setShowErrorInvalidData] = useState(false);
const navigate = useNavigate();

/*
const [emailaddressValidation, setemailaddressValidation] = useState("");
const [phonenumberValidation, setphonenumberValidation] = useState("");
const [companyemailaddressValidation, setcompanyemailaddressValidation] = useState("");
*/

// Get the ClientID from local storage
const clientID = localStorage.getItem('ClientID');
const extractIdOrStringFromPathname = (pathname) => {
  const match = pathname.match(/\/totalStaff\/(\d+|[^\/]+)/);
  return match ? match[1] : null;
};
const location = useLocation(); // Get the current location
let formType = extractIdOrStringFromPathname(location.pathname);

  const updateFormDataFromStep1 = (updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData
    }));
  };
  
  const updateFormDataFromStep2 = (updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData
    }));
  };

  const hideAlert = () => {
    setShowUserUpdatedSuccess(false);
    setShowErrorAlert(false);
    setShowErrorExistingEmail(false);
    setShowErrorNoEmail(false);
    setShowCreateNewUserSuccess(false);
    setShowErrorInvalidData(false);
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
  
  const verifyNumber = (value) => {
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
  


  

  const handleSubmit = async () => {

     // Validate email
   const isValidEmail = verifyEmail(formData.EmailAddress);
  
   // Validate phone number
  const isValidPhoneNumber = verifyNumber(formData.PhoneNumber);

  // Validate email
  const isValidCompanyEmail = verifyEmail(formData.CompanyEmailAddress);
  
  // Validate phone number
  const isValidCompanyPhoneNumber = verifyNumber(formData.CompanyPhoneNumber);

  // Validate working shift in hours
  const isValidWorkingShift = verifyNumber(formData.WorkingShiftHours);

  // Validate employee number
  const isValidEmployeeNumber = verifyNumber(formData.EmployeeNumber);

  // Validate holiday entitlement in days
  const isValidNumberOfDays = verifyNumber(formData.HolidayEntitelementLeftDays);

  // Validate holiday entitlement in hours
  const isValidNumberOfHours = verifyNumber(formData.HolidayEntitelementLeftHours);

  // Validate salary
  const isValidSalary = verifyNumber(formData.Salary);

// If any validation fails, prevent form submission
if (!isValidEmail || !isValidPhoneNumber || !isValidCompanyEmail || !isValidCompanyPhoneNumber || !isValidWorkingShift || !isValidEmployeeNumber || !isValidSalary || !isValidNumberOfDays || !isValidNumberOfHours) {
  setShowErrorInvalidData(true);

  return;
}

    try {
      delete formData.position;
      delete formData.lineManager;
      delete formData.label;
      delete formData.role
    // Append other form fields
    formData['formType'] = formType;
    formData['ClientID'] = clientID;

      Object.entries(formData).forEach(([field, value]) => {
          formData[field] = value;
      });
      
      axios.defaults.withCredentials = true;
      const result = await axios.post(
          `${apiUrl}/user/submitUserForm`,
          formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }
      );

      if (result.status === 200 && formType === 'new') {
          // Handle success
          console.log('Form data with image inserted successfully');
          setTemporaryPassword(result.data.temporaryPassword);
          setShowCreateNewUserSuccess(true);
      } else {
          // Handle success
          console.log('Form data with image saved successfully');
          setShowUserUpdatedSuccess(true);
      }
  } catch (error) {
      // Handle errors
      console.error('Error saving form data with image:', error);
      setShowErrorAlert(true);
  
      // Check if the error status is 404 (Email Address already exists for another user)
      if (error.response.data.error === 'The user needs to have a valid email address in order to be added' && error.response.status === 400) {
        // Handle email address already exists error
        setShowErrorNoEmail(true);
      } else if (error.response && error.response.status === 400) {
        // Handle email address already exists error
        setShowErrorExistingEmail(true);
      }
    }
  };

  
  const [formData, setFormData] = useState({
    UserID: userData[0]?.UserID || "",
    FirstName: userData[0]?.FirstName || "", 
    LastName: userData[0]?.LastName || "", 
    EmailAddress: userData[0]?.EmailAddress || "", 
    CompanyEmailAddress: userData[0]?.CompanyEmailAddress || "", 
    PhoneNumber: userData[0]?.PhoneNumber || "", 
    CompanyPhoneNumber: userData[0]?.CompanyPhoneNumber || "", 
    DOB: moment(userData[0]?.DOB).isValid() ? moment(userData[0]?.DOB).format("YYYY-MM-DD") : "",
    WorkingShiftHours: userData[0]?.WorkingShiftHours || "", 
    HolidayEntitelementLeftDays: userData[0]?.HolidayEntitelementLeftDays || "0",
    HolidayEntitelementLeftHours: userData[0]?.HolidayEntitelementLeftHours || "0",
    position: userData[0]?.Position,
    PositionID: userData[0]?.PositionID || "",
    EmployeeNumber: userData[0]?.EmployeeNumber || "", 
    ExEmployee: userData[0]?.ExEmployee || "",
    NINO: userData[0]?.NINO || "",
    LineManagerID: userData[0]?.LineManagerID || "",
    lineManager: userData[0]?.LineManager,
    JoinedDate: moment(userData[0]?.JoinedDate).isValid() ? moment(userData[0]?.JoinedDate).format("YYYY-MM-DD") : "",
    Salary: userData[0]?.Salary || "",
    BuildingNameNumber: userData[0]?.BuildingNameNumber || "",
    StreetName: userData[0]?.StreetName || "",
    TownCity: userData[0]?.TownCity || "",
    Country: userData[0]?.Country || "",
    PostalCode: userData[0]?.PostalCode || "",
    ProfilePicture: userData[0]?.ProfilePicture || "",
    RoleID: userData[0]?.RoleID || "",
    role: userData[0]?.Role,
  });
  
  const { 
    UserID
  } = userData[0] || {};

  const withStepProps = (WrappedComponent, additionalProps) => {
    return React.forwardRef((props, ref) => {
      const mergedProps = {
        ...additionalProps,
        ...props,
      };
      return <WrappedComponent ref={ref} {...mergedProps} />;
    });
  };

  let steps = [
    {
      stepName: "Personal",
      stepIcon: "nc-icon nc-single-02",
      component: <Step1 formType={formType} formData={formData} updateFormData={updateFormDataFromStep1} handleSubmit={handleSubmit} />

    },
    {
      stepName: "Company",
      stepIcon: "nc-icon nc-briefcase-24",
      component: <Step2 formData={formData} updateFormData={updateFormDataFromStep2}  handleSubmit={handleSubmit} />
    }
  ];

  // Add the third step only if the form is not 'new'
  if (formType !== 'new') {
    steps.push({
      stepName: "Account",
      stepIcon: "nc-icon nc-badge",
      component: withStepProps(Step3, {
        userId: UserID || ""
      })
    });
  }


  return (
  <>
      <Col className="mr-auto ml-auto" md="12" >
          <ReactWizard
            steps={steps}
            navSteps
            
          />

          
{showErrorAlert && errorAlert(hideAlert)}
{showErrorExistingEmail && errorExistingEmail(hideAlert)}
{showErrorNoEmail && errorNoEmail(hideAlert)}
{showCreateNewUserSuccess && createNewUserSuccess(() => navigate('/admin/dashboard'), temporaryPassword)}
{showUserUpdatedSuccess && userUpdatedSuccess(hideAlert)}
{showErrorInvalidData && errorInvalidData(hideAlert)}

        </Col>
    
        </>
  );
}

export default UserForm;
