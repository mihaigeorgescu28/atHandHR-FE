import React, { useState, useEffect } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import Logo from "assets/img/bg/athandhrlogo_transparent_small.png";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  Input
} from "reactstrap";

const apiUrl = process.env.REACT_APP_APIURL;

function Login() {
  const [inputs, setInputs] = useState({});
  const [submit, setSubmit] = useState(false);
  const [isBackgroundRed, setBackgroundRed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Array of image paths
  const images = [
    require("assets/img/bg/AdobeStock_764383894.webp"),
    require("assets/img/bg/AdobeStock_399947468.webp"),
    require("assets/img/bg/AdobeStock_883254820.webp"),
    require("assets/img/bg/AdobeStock_275872311.webp"),
  ];


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


  const handleChange = (event, field) => {
    const name = event.target.name;
    if(field === 'password') {
      const value = bcrypt.hashSync(event.target.value.trim(), '$2a$10$CwTycUXWue0Thq9StjUM0u');
      setInputs(values => ({...values, [name]: value}));
    } else {
      setInputs(values => ({...values, [name]: event.target.value}));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(
      `${apiUrl}/user/login`,
      {
        email: inputs.email,
        password: inputs.password
      }
    ).then((result) => {
      console.log(result); // Log the full response for debugging
  
      if (result.status === 200) {
        if (result.data.success) {
          // Store relevant info in localStorage, no need to handle token manually
          setMessage(result.data.message);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('UserID', result.data.UserID);
          localStorage.setItem('RoleID', result.data.RoleID);
          
          // Navigate based on whether the temporary password was found
          setSubmit(true);
          setSuccess(true);
          navigate(result.data.temporaryPasswordFound ? `/auth/temporaryPassword/${result.data.UserID}` : "/admin/newsfeed");
        } else {
          localStorage.setItem('isLoggedIn', 'false');
          setBackgroundRed(true);
          setMessage(result.data.message);
        }
      }
    }).catch((error) => {
      console.error('Error during login:', error); // Handle and log error if any
    });
  };
  
  

  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  return (
    <div className="login-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-signin text-center" >
              <CardHeader>
              <div >
      <img 
        src={Logo} 
        alt="AT HAND HR" 
        style={{ height: '100px', width: 'auto' }} 
      /> 
    </div>
     
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit} className="form" method="">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email"
                      name="email"
                      size="32"
                      required
                      onChange={(e) => handleChange(e, "email")}
                      className={isBackgroundRed ? 'background-red' : 'background-blue'}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password"
                      id="pw1"
                      name="password"
                      onChange={(e) => handleChange(e, "password")}
                      required />
                  </InputGroup>
                  {!success && <p style={{ color: "red" }}>{message}</p>}
                  <Button type="submit" className="btn-round" color="info" disabled={disabled}>Login</Button>
                </form>
              </CardBody>
              <CardFooter />
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

export default Login;
