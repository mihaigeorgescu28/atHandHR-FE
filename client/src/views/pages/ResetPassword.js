import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import bcrypt from 'bcryptjs';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";


const apiUrl = process.env.REACT_APP_APIURL;

function ResetPassword() {
  
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isBackgroundRed, setBackgroundRed] = useState(false);
  const [inputs, setInputs] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");


  const handleLoginButtonClick = () => {
    // Navigate to the login page
    navigate("/auth/login");
  };


  useEffect(() => {
    document.body.classList.toggle("register-page");
    return function cleanup() {
      document.body.classList.toggle("register-page");
    };
  });

      // called on submitting form
  const handleSubmit = (event) => {
    event.preventDefault();
    
  // Extract UID from the URL
  const urlParts = window.location.pathname.split('/');
  const uidIndex = urlParts.indexOf('resetUserPassword') + 1; // Assuming UID is right after 'resetUserPassword'
  const uidFromUrl = uidIndex < urlParts.length ? urlParts[uidIndex] : null;

  if (!uidFromUrl) {
    console.error('UID not found in the URL');
    return;
  }

      axios.post(
        `${apiUrl}/user/updateResetUserPassword`,
        {
          resetPasswordUID: uidFromUrl,
          newPassword: inputs.password
        },
      ).then(
        (result) =>
        {
          if(result.status == 200)
          {
          setMessage(result.data.message);

          if(result.data.success == true)
          {
            setSubmit(true);
            setSuccess(true);
          }
          else if(result.data.success == false)
          {
            setBackgroundRed(true);
          }

          }
        }
      )
      .catch(function (error) {
        console.log(error);
      })
  
    
  }

  
  function hasNumber(myString) {
    return /\d/.test(myString);
  }

      // called for each field on the form
  // called for each field on the form
  const handleChange = (event, field) => {
  
    if(field == 'password')
    {
      const name = event.target.name;
      const value = event.target.value;

      // user password input does not contain a number -> display error message
      if(hasNumber(value) == false && value.length > 0)
      {
        if(value.length < 8)
        {
          setPasswordValidationError("Use 8 or more characters with a mix of letters and numbers")
        }
        else if(value.length > 32)
        {
          setPasswordValidationError("Use at most 32 characters with a mix of letters and numbers")
        }
        else
        {
          setPasswordValidationError("Use a mix of letters and numbers")
        }
        setDisabled(true);
      }
      else if(hasNumber(value) == true)
      {
        // if input length is null, don't show any error message
      if(value.length == 0)
      {
        setPasswordValidationError("")
      }
      // if input length between 0 and 8 -> display error message
      else if( (value.length < 8 && value.length > 0))
      {
        setPasswordValidationError("Use 8 or more characters with a mix of letters and numbers");
        setDisabled(true);
      }
      // if input length greater than 32 -> display error message
      else if(value.length > 32)
      {
        setPasswordValidationError("Use at most 32 characters with a mix of letters and numbers");
        setDisabled(true);
      }
      // if length is greater than 8 -> valid input
      else if(value.length >= 8)
      {
        const valueEncrypted = bcrypt.hashSync(value, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up
        setInputs(values => ({...values, [name]: valueEncrypted}))
        setPasswordValidationError("")
        setDisabled(false);
      }

      }
      
    }
    else if(field == 'repeatPassword')
    {
      const name = event.target.name;
      const value = event.target.value;

      if (document.getElementById('pw1').value == document.getElementById('pw2').value)
      {
        setPasswordMatch("")
        setDisabled(false);
      }
      else if(value.length > 0)
      {
        setPasswordMatch("Passwords do not match. Please try again");
        setDisabled(true);
      }
      else if(value.length == 0)
      {
        setPasswordMatch("")
        setDisabled(false);
      }
    }
    else if(field == 'date')
    {
      const name = "DOB"
      // format it for database
      const value = moment(event.toDate()).format('YYYY-MM-DD');
      setInputs(values => ({...values, [name]: value}))
    }
    else
    {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }


  }

  const handlecheck = (event) => {
    

  }

  const navigate = useNavigate();
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    const resetUserOnLoad = async (resetPasswordUID) => {
      try {
        const response = await axios.post(`${apiUrl}/user/resetUserPassword`, { resetPasswordUID });
        setVerificationSuccess(true);
        setVerificationMessage(response.data.message);
      } catch (error) {
        console.error('Error resetting password:', error);
        setVerificationMessage('Invalid URL! Please contact your Administrator.'); // Set an error message
      }
    };

    // Extract UID from the URL
    const urlParts = window.location.pathname.split('/');
    const uidIndex = urlParts.indexOf('resetUserPassword') + 1; // Assuming UID is right after 'resetUserPassword'
    const uidFromUrl = uidIndex < urlParts.length ? urlParts[uidIndex] : null;

    if (uidFromUrl) {
      resetUserOnLoad(uidFromUrl);
    } else {
      console.error('Reset user password UID not provided in the URL.');
      setVerificationMessage('Invalid reset password link.'); // Set an error message
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("verify-page");
    return function cleanup() {
      document.body.classList.toggle("verify-page");
    };
  });

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  return (
    <div className="login-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-signin text-center">
              <CardBody>
                <>
                {verificationSuccess && success === false ? (
  <>
    <p style={{ color: 'black', marginTop: '10px', fontWeight: 'bold' }}>{verificationMessage}</p>
  </>
) : (
  <>
    {verificationSuccess && success === true ? (
      <>
         <FontAwesomeIcon icon={faCheckCircle} className="success-icon" size="3x" style={{ color: 'green', marginBottom: '20px', marginTop: '20px' }} />
      </>
    ) : (
      <>
        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" size="3x" style={{ color: 'red', marginBottom: '20px', marginTop: '20px'}} />
        <p style={{ color: 'black', marginTop: '10px', fontWeight: 'bold' }}>{verificationMessage}</p>
      </>
    )}
  </>
)}

                  {verificationSuccess && (
                    <Form onSubmit={handleSubmit} className="form" method="">
    
                      {!submit && (
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-key-25" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="New Password" type="password"
                        id = "pw1"
                        name="password" 
                        onChange={(e) => handleChange(e, "password")}
                        
                        onPaste={(e)=>{e.preventDefault()
                          return false;
                          }}
                        required/>
                      </InputGroup>
                      )}
    
                    {!success &&
                    <p style={{ color: "red"}}>
                      {passwordValidationError}
                    </p>
                    }
    
                      {!submit && (
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-copy-04" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Repeat New Password" type="password"
    
                        id = "pw2"
                        name="repeatpassword" 
                        onChange={(e) => handleChange(e, "repeatPassword")}
                        onPaste={(e)=>{e.preventDefault()
                        return false;
                        }}
                        required/>
                      </InputGroup>
                      )}
    
                  {!success &&
                    <p style={{ color: "red"}}>
                      {passwordMatch}
                    </p>
                    }
                  
                    {!success &&
                    <p style={{ color: "red"}}>
                      {message}
                    </p>
                    }
    
                    {success &&
                    (<p style={{ color: "green"}}>
                      {message}
                    </p>)
                    }
    
                    {success &&
                    (<Button
                      type="reset"
                      className="btn-round"
                      color="info"
                      onClick={handleLoginButtonClick}
                    >
                      Login
                    </Button>)
                    }
    
                    {!submit && (
                      <Button
                      type = "submit"
                      className="btn-round"
                      color="info"
                      disabled={disabled}
                      >
                      Reset Password
                      </Button>
                      )}
    
                      </Form> 

                    
                  )}
                </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require('assets/img/bg/luke-chesser.jpg')})`,
        }}
      />
    </div>
  );
}

export default ResetPassword;
