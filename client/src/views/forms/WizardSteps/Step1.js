import React, { forwardRef, useEffect, useState } from "react";
import ReactDatetime from "react-datetime";
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

// core components
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import SweetAlert from 'react-bootstrap-sweetalert';

const apiUrl = process.env.REACT_APP_APIURL;

const Step1 = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const {
    userId,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    DOB,
    NINO,
    buildingNameNumber,
    streetName,
    townCity,
    Country,
    postalCode,
    profilePicture
  } = props;

const [UserID, setUserID] = React.useState(userId ? userId || "" : "");
const [firstname, setfirstname] = React.useState(firstName ? firstName || "" : "");
const [lastname, setlastname] = React.useState(lastName ? lastName || "" : "");

const [emailaddress, setemailaddress] = React.useState(emailAddress ? emailAddress || "" : "");
const [emailaddressValidation, setemailaddressValidation] = useState("");

const [phonenumber, setphonenumber] = React.useState(phoneNumber ? phoneNumber || "" : "");
const [phonenumberValidation, setphonenumberValidation] = useState("");

const [dob, setdob] = React.useState(DOB ? DOB || "" : "");
const [nino, setnino] = React.useState(NINO ? NINO || "" : "");
const [buildingnamenumber, setbuildingnamenumber] = React.useState(buildingNameNumber ? buildingNameNumber || "" : "");
const [streetname, setstreetname] = React.useState(streetName ? streetName || "" : "");
const [towncity, settowncity] = React.useState(townCity ? townCity || "" : "");
const [country, setcountry] = React.useState(Country ? Country || "" : "");
const [postalcode, setpostalcode] = React.useState(postalCode ? postalCode || "" : "");
const [profilePic, setProfilePic] = React.useState(profilePicture ? profilePicture || "" : "");

const [showAlert, setShowAlert] = React.useState(false);
const [showErrorAlert, setShowErrorAlert] = React.useState(false);

const handleGoToDashboard = () => {
  navigate('/admin/dashboard');
};

React.useImperativeHandle(ref, () => ({
  isValidated: undefined, 
  state: {
    UserID,
    firstname,
    lastname,
    emailaddress,
    phonenumber,
    dob,
    nino,
    buildingnamenumber,
    streetname,
    towncity,
    country,
    postalcode,
    profilePicture
  },
}));

const hideAlert = () => {
  setShowAlert(false);
  setShowErrorAlert(false);
};


const formatDOB = (dateString) => {
  // Assuming dateString is in the format 'DD/MM/YYYY'
  if (dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  } else {
    return ""; // Return an empty string if dateString is undefined
  }
};


const getFormData = () => ({
  UserID,
  firstname,
  lastname,
  emailaddress,
  phonenumber,
  nino,
  buildingnamenumber,
  streetname,
  towncity,
  country,
  postalcode,
  dob: formatDOB(dob),
});

/*const [formData, setFormData] = React.useState(() => ({
  UserID: props.userId || "",
  firstName: props.firstName || "",
  lastName: props.lastName || "",
  emailAddress: props.emailAddress || "",
  phoneNumber: props.phoneNumber || "",
  NINO: props.NINO || "",
  buildingNameNumber: props.buildingNameNumber || "",
  streetName: props.streetName || "",
  townCity: props.townCity || "",
  Country: props.Country || "",
  postalCode: props.postalCode || "",
  DOB: props.DOB || "",
  profilePic: null,
}));*/


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



  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

const isValidated = () => {
  // Your validation logic here
  return true; // For simplicity, always return true for now
};

const handleImageChange = (file) => {
  setProfilePic(file);
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Validate email
  const isValidEmail = verifyEmail(emailaddress);
  
  // Validate phone number
const isValidPhoneNumber = verifyPhoneNumber(phonenumber);

  // If any validation fails, prevent form submission
  if (!isValidEmail || !isValidPhoneNumber) {
    // Handle validation failure (you can show an error message, etc.)
    setemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
    setphonenumberValidation(isValidPhoneNumber ? "has-success" : "is-invalid");
    return;
  }
  
  try {
    const formData = new FormData();


    // Append other form fields
    const currentFormData = getFormData();
    Object.entries(currentFormData).forEach(([field, value]) => {
      formData.append(field, value);
    });

    // Append the profile picture if available
    if (profilePic) {
      // Ensure 'profilePic' is a File type
      formData.append('profilePicture', profilePic);
    }

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

  return (
    <>
    <form onSubmit={handleFormSubmit} className="react-wizard-form">
    <div className="d-flex align-items-center form-row">
    <FormGroup className="col-md-4">
  <PictureUpload profilePic={profilePic} onImageChange={handleImageChange} />
</FormGroup>

<FormGroup className="col-md-4">
  <Label for="inputEmail4">First Name</Label>
  <Input
    name="firstname"
    placeholder="Type here"
    type="text"
    value={firstname}
    onChange={(e) => {
      if (!verifyLength(e.target.value, 1)) {
        setfirstname("has-danger");
      } else {
        setfirstname("has-success");
      }
      setfirstname(e.target.value);
    }}
  />
</FormGroup>



  <FormGroup className="col-md-4">
    <Label for="inputPassword4">Last Name</Label>
    <Input
      name="lastname"
      placeholder="Type here"
      type="text"
      value={lastname}
      onChange={(e) => {
        if (!verifyLength(e.target.value, 1)) {
          setlastname("has-danger");
        } else {
          setlastname("has-success");
        }
        setlastname(e.target.value);
      }}
    />
  </FormGroup>
</div>
        <div className="form-row">
        <FormGroup className="col-md-6">
            <Label for="inputState">Building Name/Number</Label>
            <Input
                  name="Building Name/Number"
                  placeholder="Type here"
                  type="text"
                  value={buildingnamenumber}
                  onChange={(e) => setbuildingnamenumber(e.target.value)}
                />
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputState">Street Name</Label>
            <Input
                  name="Street Name"
                  placeholder="Type here"
                  type="text"
                  value={streetname}
                  onChange={(e) => setstreetname(e.target.value)}
                />
          </FormGroup>

        </div>

        <div className="form-row">

        <FormGroup className="col-md-4">
            <Label for="inputState">Town/City</Label>
            <Input
                  name="Town/City"
                  placeholder="Type here"
                  type="text"
                  value={towncity}
                  onChange={(e) => settowncity(e.target.value)}
                />
          </FormGroup>
          <FormGroup className="col-md-4">
            <Label for="inputState">Country</Label>
            <Input
                  name="Country"
                  placeholder="Type here"
                  type="text"
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                />
          </FormGroup>
          <FormGroup className="col-md-4">
            <Label for="inputState">Postal Code</Label>
            <Input
                  name="Postal Code"
                  placeholder="Type here"
                  type="text"
                  value={postalcode}
                  onChange={(e) => setpostalcode(e.target.value)}
                />
          </FormGroup>
        </div>

        <div className="form-row">
        <FormGroup className="col-md-6">
  <Label for="email">Email Address</Label>
  <Input
    name="email"
    placeholder="Type here"
    type="email"
    value={emailaddress}
    className={`form-control ${emailaddressValidation}`}
    onChange={(e) => {
      const inputValue = e.target.value;
      setemailaddress(inputValue);

      // Validate email
      const isValidEmail = verifyEmail(inputValue);

      // Update validation class
      setemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
    }}
    onBlur={() => {
      // Re-validate and set validation class on blur
      const isValidEmail = verifyEmail(emailaddress);
      setemailaddressValidation(isValidEmail ? "has-success" : "is-invalid");
    }}
  />
</FormGroup>
        <FormGroup className="col-md-6">
  <Label for="phoneNumber">Phone Number</Label>
  <Input
    name="phoneNumber"  // Correct the name attribute
    placeholder="Type here"
    type="text"
    value={phonenumber}
    className={`form-control ${phonenumberValidation}`}
    onChange={(e) => {
      const inputValue = e.target.value;
      setphonenumber(inputValue);
  
      // Validate phone number
      const isValidNumber = verifyPhoneNumber(inputValue);
  
      // Update validation class
      setphonenumberValidation(isValidNumber ? "has-success" : "is-invalid");
    }}
    onBlur={() => {
      // Re-validate and set validation class on blur
      const isValidNumber = verifyPhoneNumber(phonenumber);
      setphonenumberValidation(isValidNumber ? "has-success" : "is-invalid");
    }}
  />
</FormGroup>

          </div>

          <div className="form-row">
        <FormGroup className="col-md-6">
          <Label for="inputAddress">Date of Birth</Label>
          <ReactDatetime
  inputProps={{
    className: "form-control",
    placeholder: "Select here",
  }}
  value={dob}
  dateFormat="DD/MM/YYYY"
  timeFormat={false}
  onChange={(momentObj) => {
    if (momentObj && momentObj.format && typeof momentObj.format === 'function') {
      setdob(momentObj.format("DD/MM/YYYY"));
    } else {
      // Handle the case where momentObj is not a valid moment.js object
      console.error("Invalid moment object:", momentObj);
      // Set a default value or handle the error gracefully
      setdob(""); // You can set a default value or handle the error in a different way
    }
  }}
/>


        </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputState">National Insurance Number</Label>
            <Input
                  name="NINO"
                  placeholder="Type here"
                  type="text"
                  value={nino}
                  onChange={(e) => setnino(e.target.value)}
                />
          </FormGroup>
        </div>
        

        <div className="text-center">
  <Button type="submit" color="primary">
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
    Details were succesfully updated!
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
  )
});

export default Step1;
