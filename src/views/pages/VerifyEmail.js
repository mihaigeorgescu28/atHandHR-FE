import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Container, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_APIURL;

function VerifyEmail() {
  
  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });
  

  const navigate = useNavigate();
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    const verifyUserOnLoad = async (verifyEmailUID) => {
      try {
        const response = await axios.post(`${apiUrl}/user/verifyUser`, { verifyEmailUID });
        setVerificationSuccess(true);
        setVerificationMessage(response.data.message); // Set the verification message
      } catch (error) {
        console.error('Error verifying email:', error);
        setVerificationMessage('Invalid URL! Please contact your Administrator.'); // Set an error message
      }
    };

    // Extract UID from the URL
    const urlParts = window.location.pathname.split('/');
    const uidIndex = urlParts.indexOf('verifyUser') + 1; // Assuming UID is right after 'verifyUser'
    const uidFromUrl = uidIndex < urlParts.length ? urlParts[uidIndex] : null;

    if (uidFromUrl) {
      verifyUserOnLoad(uidFromUrl);
    } else {
      console.error('verifyEmailUID not provided in the URL.');
      setVerificationMessage('Invalid verification link.'); // Set an error message
    }
  }, []);

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
                  {verificationSuccess ? (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} className="success-icon" size="3x" style={{ color: 'green', marginBottom: '20px', marginTop: '20px' }} />
                      <p style={{ color: 'black', marginTop: '10px' }}>{verificationMessage}</p>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" size="3x" style={{ color: 'red', marginBottom: '20px', marginTop: '20px' }} />
                      <p style={{ color: 'black', marginTop: '10px' }}>{verificationMessage}</p>
                    </>
                  )}
                  {verificationSuccess && (
                    <Button className="btn-round" type="reset" color="info" onClick={handleLoginClick}>
                      Login
                    </Button>
                  )}
                </>
              </CardBody>
              <CardFooter>{/* Add any additional components for the footer if needed */}</CardFooter>
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

export default VerifyEmail;
