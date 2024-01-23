import React, { forwardRef, useEffect, useState } from "react";
import ReactDatetime from "react-datetime";
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const apiUrl = process.env.REACT_APP_APIURL;

const Step2 = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const {
    userId,
    companyEmailAddress,
    companyPhoneNumber,
    workingShiftHours,
    holidayEntitlement,
    positionID,
    position,
    employeeNumber,
    lineManagerID,
    lineManager,
    joinedDate,
    salary
  } = props;

  const [UserID, setUserID] = useState(userId || "");
  const [companyemailaddress, setcompanyemailaddress] = useState(companyEmailAddress || "");
  const [companyemailaddressValidation, setcompanyemailaddressValidation] = useState("");

  const [companyphonenumber, setcompanyphonenumber] = useState(companyPhoneNumber || "");
  const [companyphonenumberValidation, setcompanyphonenumberValidation] = useState("");

  const [workingshifthours, setworkingshifthours] = useState(workingShiftHours || "");
  const [workingshifthoursValidation, setworkingshifthoursValidation] = useState("");

  const [holidayentitlement, setholidayentitlement] = useState(holidayEntitlement || "");
  const [Position, setPosition] = useState(position || "");

  const [employeenumber, setemployeenumber] = useState(employeeNumber || "");
  const [employeenumberValidation, setemployeenumberValidation] = useState("");

  const [joineddate, setjoineddate] = useState(joinedDate || "");

  const [Salary, setSalary] = useState(salary || "");
  const [salaryValidation, setsalaryValidation] = useState("");



  // Use an array to initialize state
  const [linemanagers, setLinemanagers] = useState([]);
  const [selectedLineManager, setSelectedLineManager] = useState(lineManagerID !== null ? {
    value: lineManagerID,
    label: lineManager,
  } : {});

  const [positions, setPositions] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState(positionID !== null
    ? {
    value: positionID,
    label: Position,
  } : {});


  
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const hideAlert = () => {
    setShowAlert(false);
    setShowErrorAlert(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch line managers
        const lineManagersResponse = await axios.post(
          `${apiUrl}/getLineManagers`,
          { userId: userId },
          { headers: { 'Content-Type': 'application/json' } }
        );
  
        if (lineManagersResponse.data && lineManagersResponse.data.LineManagers) {
          const lineManagersArray = lineManagersResponse.data.LineManagers.map(manager => ({
            value: manager.value,
            label: manager.label,
          }));
  
          // Set the default value based on props
const defaultLineManager = lineManagerID !== null ? {
  value: lineManagerID,
  label: lineManager,
} : null;

// Filter out null or undefined values
const filteredLineManagersArray = lineManagersArray.filter(manager => manager.value != null);

// Check if the default value is not already in the array before adding it
const updatedLineManagers = defaultLineManager
  ? [...filteredLineManagersArray]
  : [...filteredLineManagersArray, defaultLineManager];

setLinemanagers(updatedLineManagers);

        } else {
          console.error('Invalid response format for line managers:', lineManagersResponse.data);
        }
  
        // Fetch positions
        const positionsResponse = await axios.post(
          `${apiUrl}/getClientPositions`,
          { userId: userId },
          { headers: { 'Content-Type': 'application/json' } }
        );
  
        if (positionsResponse.data && positionsResponse.data.Positions) {
          const positionsArray = positionsResponse.data.Positions.map(position => ({
            value: position.value,
            label: position.label,
          }));
  
          setPositions(positionsArray);
  
          if (!Position && positionsArray.length > 0) {
            setPosition(positionsArray[0].value);
          }
        } else {
          console.error('Invalid response format for positions:', positionsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userId, lineManagerID, lineManager, Position, positionID]);
  
  

  

  const getFormData = () => ({
    UserID,
    companyemailaddress,
    companyphonenumber,
    workingshifthours,
    PositionID: selectedPositions ? selectedPositions.value : '',
    LineManagerID: selectedLineManager ? selectedLineManager.value : '',
    employeenumber,
    joineddate: formatDOB(joineddate),
    Salary
  });

  const formatDOB = (dateString) => {
    // Assuming dateString is in the format 'DD/MM/YYYY'
    if (dateString) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } else {
      return ""; // Return an empty string if dateString is undefined
    }
  };
  
  
  React.useImperativeHandle(ref, () => ({
    isValidated: undefined,
    state: {
      UserID,
      companyemailaddress,
      companyphonenumber,
      workingshifthours,
      holidayentitlement,
      Position,
      employeenumber,
      joineddate,
      Salary
    },
  }));

  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email
    const isValidEmail = verifyEmail(companyemailaddress);
  
    // Validate phone number
const isValidPhoneNumber = verifyNumber(companyphonenumber);

    // Validate working shift in hours
const isValidWorkingShift = verifyNumber(workingshifthours);

// Validate employee number
const isValidEmployeeNumber = verifyNumber(employeenumber);

// Validate salary
const isValidSalary = verifyNumber(Salary);
  
    // If any validation fails, prevent form submission
    if (!isValidEmail || !isValidPhoneNumber || !isValidWorkingShift || !isValidEmployeeNumber || !isValidSalary) {
      // Handle validation failure (you can show an error message, etc.)
      setcompanyemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
      setcompanyphonenumberValidation(isValidPhoneNumber ? "has-success" : "is-invalid");
      setworkingshifthoursValidation(isValidWorkingShift ? "has-success" : "is-invalid");
      setemployeenumberValidation(isValidEmployeeNumber ? "has-success" : "is-invalid");
      setsalaryValidation(isValidSalary ? "has-success" : "is-invalid");
      return;
    }
  
    try {
      const formData = new FormData();
      // Append other form fields
      const currentFormData = getFormData();
      Object.entries(currentFormData).forEach(([field, value]) => {
        formData.append(field, value);
      });
  
      const result = await axios.post(
        `${apiUrl}/submitUserForm`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (result.status === 200) {
        // Handle success
        console.log('Form data with image saved successfully');
        setShowAlert(true);
      }
    } catch (error) {
      // Handle errors
      console.error('Error saving form data with image:', error);
      setShowErrorAlert(true)
    }
  };
  

  // close button
  const handleGoToDashboard = () => {
    navigate('/admin/dashboard');
  };

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const isNumericString = (value) => {
    // Regular expression to match numbers (including an empty string)
    const numericPattern = /^[0-9]*$/;
  
    return numericPattern.test(value);
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
  
  

  return (
    <>
      <form className="react-wizard-form">
        <div className="d-flex align-items-center form-row">
        <FormGroup className="col-md-6">
  <Label for="email">Email Address</Label>
  <Input
    name="companyemailaddress"
    placeholder="Type here"
    type="email"
    value={companyemailaddress}
    className={`form-control ${companyemailaddressValidation}`}
    onChange={(e) => {
      const inputValue = e.target.value;
      setcompanyemailaddress(inputValue);

      // Validate email
      const isValidEmail = verifyEmail(inputValue);

      // Update validation class
      setcompanyemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
    }}
    onBlur={() => {
      // Re-validate and set validation class on blur
      const isValidEmail = verifyEmail(companyemailaddress);
      setcompanyemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
    }}
  />
</FormGroup>


<FormGroup className="col-md-6">
  <Label for="companyPhoneNumber">Phone Number</Label>
  <Input
  name="companyPhoneNumber"
  placeholder="Type here"
  type="text"
  value={companyphonenumber}
  className={`form-control ${companyphonenumberValidation}`}
  onChange={(e) => {
    const inputValue = e.target.value;
    setcompanyphonenumber(inputValue);

    // Validate phone number
    const isValidNumber = verifyNumber(inputValue);

    // Update validation class
    setcompanyphonenumberValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
  onBlur={() => {
    // Re-validate and set validation class on blur
    const isValidNumber = verifyNumber(companyphonenumber);
    setcompanyphonenumberValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
/>

</FormGroup>


        </div>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <Label for="inputState">Working Shift (Hours)</Label>
            <Input
              name="Working Shift (Hours)"
              placeholder="Type here"
              type="text"
              value={workingshifthours}
              className={`form-control ${workingshifthoursValidation}`}
  onChange={(e) => {
    const inputValue = e.target.value;
    setworkingshifthours(inputValue);

    // Validate phone number
    const isValidNumber = verifyNumber(inputValue);

    // Update validation class
    setworkingshifthoursValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
  onBlur={() => {
    // Re-validate and set validation class on blur
    const isValidNumber = verifyNumber(workingshifthours);
    setworkingshifthoursValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
            />
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputState">Holiday Entitlement Left</Label>
            <Input
              name="Holiday Entitlement"
              type="text"
              value={holidayentitlement}
              onChange={(e) => setholidayentitlement(e.target.value)}
              readOnly
            />
          </FormGroup>
        </div>
        <div className="form-row">
        <FormGroup className="col-md-4">
  <Label for="inputState">Position</Label>
  <Select
    name="Position"
    placeholder="Select From Dropdown"
    value={selectedPositions && selectedPositions.value !== '' && selectedPositions.label !== '' ? selectedPositions : null}
    options={positions}
    onChange={(selectedOption) => setSelectedPositions(selectedOption)}
    isClearable={true}
  />
</FormGroup>


          <FormGroup className="col-md-4">
            <Label for="employeeNumber">Employee Number</Label>
            <Input
              name="employeenumber"
              placeholder="Type here"
              type="text"
              value={employeenumber}
              className={`form-control ${employeenumberValidation}`}
  onChange={(e) => {
    const inputValue = e.target.value;
    setemployeenumber(inputValue);

    // Validate phone number
    const isValidNumber = verifyNumber(inputValue);

    // Update validation class
    setemployeenumberValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
  onBlur={() => {
    // Re-validate and set validation class on blur
    const isValidNumber = verifyNumber(employeenumber);
    setemployeenumberValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
            />
          </FormGroup>
          <FormGroup className="col-md-4">
  <Label for="linemanagers">Line Manager</Label>
  <Select
    name="linemanagers"
    placeholder="Select From Dropdown"
    value={selectedLineManager && setSelectedLineManager.value !== '' && selectedLineManager.label !== '' ? linemanagers.find(manager => manager.value === selectedLineManager?.value) : null}
    options={linemanagers}
    onChange={(selectedOption) => setSelectedLineManager(selectedOption)}
    isClearable={true}
  />
</FormGroup>
        </div>
        <div className="form-row">
        </div>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <Label for="inputAddress">Joined Date</Label>
            <ReactDatetime
              inputProps={{
                className: "form-control",
                placeholder: "Select date",
              }}
              value={joineddate}
              dateFormat="DD/MM/YYYY"
              timeFormat={false}
              onChange={(momentObj) => setjoineddate(momentObj.format("DD/MM/YYYY"))}
            />
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputState">Annual Salary</Label>
            <Input
              name="Salary"
              placeholder="Type here"
              type="text"
              value={Salary}
              className={`form-control ${salaryValidation}`}
  onChange={(e) => {
    const inputValue = e.target.value;
    setSalary(inputValue);

    // Validate phone number
    const isValidNumber = verifyNumber(inputValue);

    // Update validation class
    setsalaryValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
  onBlur={() => {
    // Re-validate and set validation class on blur
    const isValidNumber = verifyNumber(Salary);
    setsalaryValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
            />
          </FormGroup>
        </div>
        <div className="text-center">
          <Button type="submit" onClick={handleFormSubmit} color="primary">
            Save
          </Button>
          <Button type="submit" onClick={handleGoToDashboard} color="danger">
            Close
          </Button>
        </div>
      </form>

      {showAlert && (
        <SweetAlert
          success
          title="Success!"
          onConfirm={hideAlert}
          onCancel={hideAlert}
        >
          Details were successfully updated!
        </SweetAlert>
      )}

      {showErrorAlert && (
        <SweetAlert
          error
          title="Error!"
          onConfirm={hideAlert}
          onCancel={hideAlert}
        >
          Something went wrong! Please contact IT!
        </SweetAlert>
      )}
    </>
  );
});

export default Step2;
