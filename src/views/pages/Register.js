import { React, useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import bcrypt from 'bcryptjs';
import axios from 'axios';
import Logo from "assets/img/bg/athandhrlogo_transparent_small.png";

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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";


function Register() {
  
  useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

    // Array of image paths
    const images = [
      require("assets/img/bg/AdobeStock_764383894.webp"),
      require("assets/img/bg/AdobeStock_399947468.webp"),
      require("assets/img/bg/AdobeStock_883254820.webp"),
      require("assets/img/bg/AdobeStock_275872311.webp"),
    ];

  const navigate = useNavigate();

  var yesterday = moment().subtract(1, "day");

  const handlecheck = (event) => {
    
    setAgreement(event.target.checked);

  }

  useEffect(() => {
    // Preload images
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  
    const imageInterval = setInterval(() => {
      setFade(false); // Start fading out the current image
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // Start fading in the new image
      }, 1000); // Wait for 1 second before changing the image
    }, 4000); // Change every 4 seconds
  
    return () => {
      clearInterval(imageInterval);
    };
  }, [images.length]);

  const handleLoginButtonClick = () => {
    // Navigate to the login page
    navigate("/auth/login");
  };

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
    
    
  // Extract UID from the URL
  const urlParts = window.location.pathname.split('/');
  const uidIndex = urlParts.indexOf('register') + 1; // Assuming UID is right after 'register'
  const uidFromUrl = uidIndex < urlParts.length ? urlParts[uidIndex] : null;

  if (!uidFromUrl) {
    console.error('UID not found in the URL');
    return;
  }

     if(agreement == true)
    {
      setAgreementError("");

      axios.post(
        `${apiUrl}/user/register`,
        {
          uid: uidFromUrl,
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
    <div className="login-page">
      <Container >
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-signin text-center" >
              <CardHeader>
              <div >
      <img 
        src={Logo} 
        alt="AT HAND HR" 
        style={{ height: '70px', width: 'auto' }} 
      /> 
    </div>
                <CardTitle tag="h3">Register</CardTitle>
              </CardHeader>
              <CardBody>
              
              <form onSubmit={handleSubmit} className="form" method="">
                 
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
                      
                      <a href="/auth/terms-and-conditions" target="_blank">
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
                  Get Started
                  </Button>
                  )}

                  </form> 
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
    backgroundImage: `url(${images[currentImageIndex]})`,
    transition: "background-image 2s ease-in-out",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  }}
/>
    </div>

    





  );
}
export default Register;

