import React, { forwardRef, useEffect, useState } from "react";
import ReactDatetime from "react-datetime";
import axios from 'axios';
import moment from 'moment';

// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

// core components
import PictureUpload from "components/CustomUpload/PictureUpload.js";

const Step1 = forwardRef(({ formType, formData, updateFormData, handleSubmit}, ref) => {
  const {
    userId,
    FirstName,
    LastName,
    EmailAddress,
    PhoneNumber,
    DOB, 
    NINO,
    BuildingNameNumber,
    StreetName,
    TownCity,
    Country,
    PostalCode,
    ProfilePicture
  } = formData;


const [UserID, setUserID] = React.useState(userId ? userId || "" : "");

const [firstname, setfirstname] = React.useState(FirstName ? FirstName || "" : "");
const [lastname, setlastname] = React.useState(LastName ? LastName || "" : "");

const [emailaddress, setemailaddress] = React.useState(EmailAddress ? EmailAddress || "" : "");
const [emailaddressValidation, setemailaddressValidation] = useState("");

const [phonenumber, setphonenumber] = React.useState(PhoneNumber ? PhoneNumber || "" : "");
const [phonenumberValidation, setphonenumberValidation] = useState("");

const [dob, setdob] = React.useState(DOB && moment(DOB).isValid() ? DOB : "");  

const [nino, setnino] = React.useState(NINO ? NINO || "" : "");
const [buildingnamenumber, setbuildingnamenumber] = React.useState(BuildingNameNumber ? BuildingNameNumber || "" : "");
const [streetname, setstreetname] = React.useState(StreetName ? StreetName || "" : "");
const [towncity, settowncity] = React.useState(TownCity ? TownCity || "" : "");
const [country, setcountry] = React.useState(Country ? Country || "" : "");
const [postalcode, setpostalcode] = React.useState(PostalCode ? PostalCode || "" : "");
const [profilePic, setProfilePic] = React.useState(ProfilePicture ? ProfilePicture || "" : "");

const handleGoToDashboard = () => {
  navigate('/admin/dashboard');
};


const handleSave = async (e) => {
  event.preventDefault();

   handleSubmit();
};

const handleChange = (field, value) => {
  // Update the corresponding state variable
  switch (field) {
    case 'FirstName':
      setfirstname(value);
      break;
    case 'LastName':
      setlastname(value);
      break;
    case 'EmailAddress':
      setemailaddress(value);
      break;
    case 'PhoneNumber':
        setphonenumber(value);
        break;
    case 'BuildingNameNumber':
        setbuildingnamenumber(value);
        break;
    case 'TownCity':
        settowncity(value);
        break;
    case 'Country':
      setcountry(value);
      break;
    case 'NINO':
      setnino(value);
      break;
    case 'DOB':
      setdob(value);
      break;
    case 'PostalCode':
        setpostalcode(value);
        break;
    case 'StreetName':
        setstreetname(value);
        break;
    case 'ProfilePicture': // Update profile picture directly with the File object
        setProfilePic(value);
        break;
    default:
      break;
  }

  // Update the formData state in the parent component
  updateFormData({ [field]: value });
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

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };


  return (
    <>
    <form onSubmit={handleSave} className="react-wizard-form">
    <div className="d-flex align-items-center form-row">
    <FormGroup className="col-md-4">
    <PictureUpload profilePic={profilePic} onImageChange={(file) => handleChange('ProfilePicture', file)} />
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
      handleChange('FirstName', e.target.value);
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
        handleChange('LastName', e.target.value);
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
                  onChange={(e) => handleChange('BuildingNameNumber', e.target.value)}
                />
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputState">Street Name</Label>
            <Input
                  name="Street Name"
                  placeholder="Type here"
                  type="text"
                  value={streetname}
                  onChange={(e) => handleChange('StreetName', e.target.value)}
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
                  onChange={(e) => handleChange('TownCity', e.target.value)}
                />
          </FormGroup>
          <FormGroup className="col-md-4">
            <Label for="inputState">Country</Label>
            <Input
                  name="Country"
                  placeholder="Type here"
                  type="text"
                  value={country}
                  onChange={(e) => handleChange('Country', e.target.value)}
                />
          </FormGroup>
          <FormGroup className="col-md-4">
            <Label for="inputState">Postal Code</Label>
            <Input
                  name="Postal Code"
                  placeholder="Type here"
                  type="text"
                  value={postalcode}
                  onChange={(e) => handleChange('PostalCode', e.target.value)}
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
    required 
    onChange={(e) => {
      const inputValue = e.target.value;
      handleChange('EmailAddress', e.target.value);

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
      handleChange('PhoneNumber', e.target.value);
  
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
  value={dob && moment(dob).isValid() ? moment(dob).format("DD/MM/YYYY") : ""}
  dateFormat="DD/MM/YYYY"
  timeFormat={false}
  onChange={(momentObj) => {
    if (momentObj && momentObj.format && typeof momentObj.format === 'function') {
      // Send the formatted date string to the handleChange function
      handleChange('DOB', momentObj.format("YYYY-MM-DD"))
    } else {
      // Handle the case where momentObj is not a valid moment.js object
      console.error("Invalid moment object:", momentObj);
      // Set a default value or handle the error gracefully
      setdob(""); // You can set a default value or handle the error in a different way
    }
  }
}
/>


        </FormGroup>
          <FormGroup className="col-md-6">
            <Label for="inputState">National Insurance Number</Label>
            <Input
                  name="NINO"
                  placeholder="Type here"
                  type="text"
                  value={nino}
                  onChange={(e) => handleChange('NINO', e.target.value)}
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


    </>
  )
});

export default Step1;
