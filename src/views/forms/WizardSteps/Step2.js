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

const Step2 = forwardRef(({ formType, formData, updateFormData, handleSubmit }, ref)  => {
  const navigate = useNavigate();

  const {
    userId,
    CompanyEmailAddress,
    CompanyPhoneNumber,
    WorkingShiftHours,
    HolidayEntitelementLeftDays,
    HolidayEntitelementLeftHours,
    PositionID,
    position,
    EmployeeNumber,
    LineManagerID,
    lineManager,
    JoinedDate,
    Salary,
    RoleID,
    role,
  } = formData;


  const [UserID, setUserID] = useState(userId || "");
  const [companyemailaddress, setcompanyemailaddress] = useState(CompanyEmailAddress || "");
  const [companyemailaddressValidation, setcompanyemailaddressValidation] = useState("");

  const [companyphonenumber, setcompanyphonenumber] = useState(CompanyPhoneNumber || "");
  const [companyphonenumberValidation, setcompanyphonenumberValidation] = useState("");

  const [workingshifthours, setworkingshifthours] = useState(WorkingShiftHours || "");
  const [workingshifthoursValidation, setworkingshifthoursValidation] = useState("");

  const [holidayentitelementleftdays, setholidayentitlementdays] = useState(HolidayEntitelementLeftDays || "");
  const [holidayDaysValidation, setHolidayDaysValidation] = useState("");

  const [holidayentitelementlefthours, setholidayentitlementhours] = useState(HolidayEntitelementLeftHours || "");
  const [holidayHoursValidation, setHolidayHoursValidation] = useState("");
  
  const [Position, setPosition] = useState(position || "");

  const [employeenumber, setemployeenumber] = useState(EmployeeNumber || "");
  const [employeenumberValidation, setemployeenumberValidation] = useState("");

  const [joineddate, setjoineddate] = useState(JoinedDate || "");

  const [salary, setSalary] = useState(Salary || "");
  const [salaryValidation, setsalaryValidation] = useState("");

  // Use an array to initialize state
  const [linemanagers, setLinemanagers] = useState([]);
  const [selectedLineManager, setSelectedLineManager] = useState(LineManagerID !== null ? {
    value: LineManagerID,
    label: lineManager,
  } : {});


    const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(RoleID !== null ? {
    value: RoleID,
    label: role,
  } : {});

  const [positions, setPositions] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState(PositionID !== null
    ? {
    value: PositionID,
    label: Position,
  } : {});


  // Get the ClientID from local storage
  const clientID = localStorage.getItem('ClientID');


  const handleSave = async (e) => {
    event.preventDefault();
  
     handleSubmit();
  };
  
  const handleChange = (field, value) => {
    // Update the corresponding state variable
    switch (field) {
      case 'CompanyEmailAddress':
        setcompanyemailaddress(value);
        break;
      case 'CompanyPhoneNumber':
        setcompanyphonenumber(value);
        break;
      case 'WorkingShiftHours':
        setworkingshifthours(value);
        break;
      case 'HolidayEntitelementLeftDays':
          setholidayentitlementdays(value);
          break;
      case 'HolidayEntitelementLeftHours':
          setholidayentitlementhours(value);
          break;
      case 'PositionID':
          setSelectedPositions(value);
          break;
      case 'EmployeeNumber':
        setemployeenumber(value);
        break;
      case 'JoinedDate':
        setjoineddate(value);
        break;
      case 'LineManagerID':
        setSelectedLineManager(value);
        break;
      case 'Salary':
          setSalary(value);
          break;
      case 'RoleID':
        setSelectedRole(value);
        break;
      default:
        break;
    }
  
    // Update the formData state in the parent component
    updateFormData({ [field]: value });
  };
  

  useEffect(() => {

    const fetchData = async () => {

      try {
        // Fetch line managers
        axios.defaults.withCredentials = true;
        const rolesResponse = await axios.post(
          `${apiUrl}/user/getRoles`,
          { clientId: clientID },
          { headers: { 'Content-Type': 'application/json' } }
        );

  
        if (rolesResponse.data && rolesResponse.data.Roles) {
          const rolesArray = rolesResponse.data.Roles.map(role => ({
            value: role.value,
            label: role.label,
          }));
  
          // Set the default value based on props
const defaultRole = RoleID !== null ? {
  value: RoleID,
  label: role,
} : null;


// Filter out null or undefined values
const filteredRolesArray = rolesArray.filter(role => role.value != null);

// Check if the default value is not already in the array before adding it
const updatedRoles = defaultRole
  ? [...filteredRolesArray]
  : [...filteredRolesArray, defaultRole];

  setRoles(updatedRoles);

        } else {
          console.error('Invalid response format for roles:', rolesResponse.data);
        }

        // Fetch line managers
        axios.defaults.withCredentials = true;
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
  
          // Set the default value based on props
const defaultLineManager = LineManagerID !== null ? {
  value: LineManagerID,
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
        axios.defaults.withCredentials = true;
        const positionsResponse = await axios.post(
          `${apiUrl}/user/getClientPositions`,
          { clientId: clientID },
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
  }, [userId, LineManagerID, lineManager, Position, PositionID, RoleID, role]);
  
  // close button
  const handleGoToDashboard = () => {
    navigate('/admin/dashboard');
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

  // Call verifyEmail once when the component mounts
useEffect(() => {
  const isValidEmail = verifyEmail(companyemailaddress);
  setcompanyemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
}, []);

  
  return (
    <>
      <form  onSubmit={handleSave} className="react-wizard-form">
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
      handleChange('CompanyEmailAddress', e.target.value)

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
    handleChange('CompanyPhoneNumber', e.target.value)

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
          <FormGroup className="col-md-4">
            <Label for="inputState">Working Shift (Hours)</Label>
            <Input
              name="Working Shift (Hours)"
              placeholder="Type here"
              type="text"
              value={workingshifthours}
              className={`form-control ${workingshifthoursValidation}`}
  onChange={(e) => {
    const inputValue = e.target.value;
    handleChange('WorkingShiftHours', e.target.value)

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
          <FormGroup className="col-md-4">
            <Label for="inputState">Holiday Left (No. Of Days)</Label>
            <Input
              name="Holiday Entitlement"
              type="text"
              value={holidayentitelementleftdays}
              className={`form-control ${holidayDaysValidation}`}
              onChange={(e) => {
                const inputValue = e.target.value;
                handleChange('HolidayEntitelementLeftDays', e.target.value)
            
                // Validate phone number
                const isValidNumber = verifyNumber(inputValue);
            
                // Update validation class
                setHolidayDaysValidation(isValidNumber ? "has-success" : "is-invalid");
              }}
              
            />
          </FormGroup>
          <FormGroup className="col-md-4">
            <Label for="inputState">Holiday Left (No. Of Hours)</Label>
            <Input
              name="Holiday Entitlement"
              type="text"
              value={holidayentitelementlefthours}
              className={`form-control ${holidayHoursValidation}`}
              onChange={(e) => {
                const inputValue = e.target.value;
                handleChange('HolidayEntitelementLeftHours', e.target.value)
            
                // Validate phone number
                const isValidNumber = verifyNumber(inputValue);
            
                // Update validation class
                setHolidayHoursValidation(isValidNumber ? "has-success" : "is-invalid");
              }}
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
    onChange={(selectedOption) => {
      if (!selectedOption) { // Check if selectedOption is null (field has been cleared)
        handleChange('PositionID', "");
      }
      else handleChange('PositionID', selectedOption);
    }}
    isClearable={true}
  />
</FormGroup>

          <FormGroup className="col-md-4">
  <Label for="linemanagers">Line Manager</Label>
  <Select
    name="linemanagers"
    placeholder="Select From Dropdown"
    value={selectedLineManager && setSelectedLineManager.value !== '' && selectedLineManager.label !== '' ? linemanagers.find(manager => manager.value === selectedLineManager?.value) : null}
    options={linemanagers}
    onChange={(selectedOption) => {
      if (!selectedOption) { // Check if selectedOption is null (field has been cleared)
        handleChange('LineManagerID', ""); // Call handleChange to handle clearing
      }
      else handleChange('LineManagerID', selectedOption);
    }}
    isClearable={true}
  />
</FormGroup>

<FormGroup className="col-md-4">
  <Label for="linemanagers">Role</Label>
  <Select
    name="roles"
    placeholder="Select From Dropdown"
    options={roles}
    value={selectedRole && setSelectedRole.value !== '' && selectedRole.label !== '' ? roles.find(role => role.value === selectedRole?.value) : null}
    onChange={(selectedOption) => {
      if (!selectedOption) { // Check if selectedOption is null (field has been cleared)
        handleChange('RoleID', ""); // Call handleChange to handle clearing
      }
      else handleChange('RoleID', selectedOption.value);
    }}
    isClearable={true}
  />
</FormGroup>
        </div>
        <div className="form-row">
        </div>
        <div className="form-row">
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
    handleChange('EmployeeNumber', e.target.value)

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
            <Label for="inputAddress">Joined Date</Label>
            <ReactDatetime
              inputProps={{
                className: "form-control",
                placeholder: "Select date",
              }}
              value={joineddate && moment(joineddate).isValid() ? moment(joineddate).format("DD/MM/YYYY") : ""}
              dateFormat="DD/MM/YYYY"
              timeFormat={false}
              onChange={(momentObj) => handleChange("JoinedDate", momentObj.format("YYYY-MM-DD"))}
            />
          </FormGroup>
          <FormGroup className="col-md-4">
            <Label for="inputState">Annual Salary</Label>
            <Input
              name="Salary"
              placeholder="Type here"
              type="text"
              value={salary}
              className={`form-control ${salaryValidation}`}
  onChange={(e) => {
    const inputValue = e.target.value;
    handleChange('Salary', e.target.value)

    // Validate phone number
    const isValidNumber = verifyNumber(inputValue);

    // Update validation class
    setsalaryValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
  onBlur={() => {
    // Re-validate and set validation class on blur
    const isValidNumber = verifyNumber(salary);
    setsalaryValidation(isValidNumber ? "has-success" : "is-invalid");
  }}
            />
          </FormGroup>
          
          
        </div>
        <div className="text-center">
          <Button size="sm" type="submit" color="success">
            Save
          </Button>
          <Button size="sm" type="submit" onClick={handleGoToDashboard} color="danger">
            Close
          </Button>
        </div>
      </form>

      


    </>
  );
});

export default Step2;
