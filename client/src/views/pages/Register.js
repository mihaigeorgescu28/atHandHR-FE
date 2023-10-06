import React from "react";
import Datetime from 'react-datetime';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import moment from "moment";
import bcrypt from 'bcryptjs';
import axios from 'axios';
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

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


function Register() {
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    return function cleanup() {
      document.body.classList.toggle("register-page");
    };
  });

  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isBackgroundRed, setBackgroundRed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [agreementError, setAgreementError] = useState("");
  const apiUrl = process.env.REACT_APP_APIURL;

  var yesterday = moment().subtract(1, "day");

  const handlecheck = (event) => {
    
    setAgreement(event.target.checked);

  }

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

  // called on submitting form
  const handleSubmit = (event) => {
    event.preventDefault();
     console.log(inputs);

     if(agreement == true)
    {
      setAgreementError("");

      axios.post(
        `${apiUrl}/register`,
        {
          firstName : inputs.firstName,
          lastName : inputs.lastName,
          email: inputs.email,
          password: inputs.password,
          DOB: inputs.DOB
        },
      ).then(
        (result) =>
        {
          if(result.status == 200)
          {
          setMessage(result.data.message);

          if(result.data.message == "Your registration was successful! Please check your email to activate your account!")
          {
            setSubmit(true);
            setSuccess(true);
          }
          else if(result.data.message == 'The selected email address exists already on our system. Please try a different one or contact your administrator!')
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
    else
    {
      setAgreementError("You need to agree with the T&C in order to register");
      setMessage("");
    }
  }

  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  return (
    <div className="register-page">
      <Container >
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-signup text-center" >
              <CardHeader>
                <CardTitle tag="h4">Register</CardTitle>
              </CardHeader>
              <CardBody>
              
                <Form onSubmit={handleSubmit} className="form" method="">
                 
                {!submit && (
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    required/>
                  </InputGroup>
                  )}

                  {!submit && (
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-circle-10" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name"
                    name="lastName" 
                    type="text" 
                    onChange={handleChange}
                    required/>
                  </InputGroup>
                  )}
                  
                  {!submit && (
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email"
                    name="email"
                    onChange={handleChange}
                    size="32" 
                    required
                    className={isBackgroundRed == true ? 'background-red' : 'background-blue'}
                    />
                  </InputGroup>
                  )}

                  {!submit && (
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password"
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
                    <Input placeholder="Repeat Password" type="password"

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

                  {!submit && (
                   <FormGroup check className="text-left">
                    <Label check>
                      <Input id = "tc" type="checkbox" name="t&c"
                      onClick={handlecheck}
                      />
                      
                      <span className="form-check-sign" />I agree to the{" "}
                      
                      <a>
                        terms and conditions
                      </a>
                      .
                    </Label>
                  </FormGroup>
                  )}

                {!success &&
                <p style={{ color: "red"}}>
                  {agreementError}
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
                type = "submit"
                className="btn-round"
                color="info"
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
                  Get Started
                  </Button>
                  )}

                  </Form> 
              </CardBody>
              <CardFooter>
                
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require("assets/img/bg/luke-chesser.jpg")})`
        }}
      />
    </div>



  );
}
export default Register;
