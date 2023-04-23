import React from "react";
import { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";

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
  Col,
  Row
} from "reactstrap";


function Login() {

  const [inputs, setInputs] = useState({});
  const [submit, setSubmit] = useState(false);
  const [isBackgroundRed, setBackgroundRed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  

  // called for each field on the form
  const handleChange = (event, field) => {
  
    if(field == 'password')
    {
      const name = event.target.name;
      const value = event.target.value;
      const valueEncrypted = bcrypt.hashSync(value, '$2a$10$CwTycUXWue0Thq9StjUM0u')
      setInputs(values => ({...values, [name]: valueEncrypted}))
      
    }
    else
    {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
  }

  const handleSubmit = (event) => {
    event.preventDefault();

      axios.post(
        "http://localhost:8800/login",
        {
          email: inputs.email,
          password: inputs.password
        },
      ).then(
        (result) =>
        {

          if(result.status == 200)
          {
          setMessage(result.data.message);

          if(result.data.message == "Success")
          {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('UserID', result.data.UserID);
            setSubmit(true);
            setSuccess(true);
            navigate("/admin/newsfeed");

          }
          else if(result.data.message == 'The email address and/or the password selected are not valid. Please try different credentials.')
          {
            localStorage.setItem('isLoggedIn', 'false');
            setBackgroundRed(true);
            setMessage(result.data.message);
          }

          }
          
        }).catch(function (error) {
        })
  }


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
            <Card className="card-signin text-center">
              <CardHeader>
                <CardTitle tag="h4">Login</CardTitle>

              </CardHeader>
              <CardBody>
              
                <Form onSubmit={handleSubmit} className="form" method="">
                  
                  
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
                    className={isBackgroundRed == true ? 'background-red' : 'background-blue'}
                    />
                  </InputGroup>
                  

                  
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

                  {!success &&
                <p style={{ color: "red"}}>
                  {message}
                </p>
                }
                  
                  <Button
                  type = "submit"
                  className="btn-round"
                  color="info"
                  disabled={disabled}
                  >
                  Login
                  </Button>
                
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
          backgroundImage: `url(${require("assets/img/bg/fabio-mangione.jpg")})`
        }}
      />
    </div>
  );
}

export default Login;
