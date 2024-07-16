import React, { useState, useEffect } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
//import { Map, GoogleApiWrapper, Marker, InfoWindow  } from "google-maps-react";
import Avatar from 'react-avatar';
import { signInOutSuccess, errorsignInOut } from '../components/SweetAlert';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Container,
  Col,
  Row,
  Form
} from "reactstrap";


const apiUrl = process.env.REACT_APP_APIURL;


function SignInOut(props) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [userFullName, setUserFullName] = useState('');
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isBackgroundRed, setBackgroundRed] = useState(false);
  const [inputs, setInputs] = useState({});
  const [buttonText, setButtonText] = useState('');
  const [extraValidation, setExtraValidation] = useState(false);
  const [extraValidationMessage, setextraValidationMessage] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [fileName, setFileName] = useState("");;
  const [showSignInOutSuccessAlert, setShowSignInOutSuccessAlert] = useState(false);
  const [errorWrongPasswordAlert, setErrorWrongPasswordAlert] = useState(false);

  const hideAlert = () => {
    setShowSignInOutSuccessAlert(false);
    setErrorWrongPasswordAlert(false);
  };


/*   const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [infoWindowContent, setInfoWindowContent] = useState("Click the marker to see some text!");

 const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setInfoWindowContent("This is some text that will be displayed in the info window!");
    setInfoWindowVisible(true);
  };

  const onMapClick = () => {
    if (infoWindowVisible) {
      setInfoWindowVisible(false);
      setActiveMarker(null);
    }
  };

  const mapStyles = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: 52.24202240,
    lng: -0.88473600,
  };

  const defaultCenter2 = {
    lat: 42.24202240,
    lng: -0.88473600,
  };*/


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchUserFullName() {
      const UserID = localStorage.getItem("UserID");
      try {
        const result = await axios.post(
          `${apiUrl}/user/getUserDetails`, 
          {
            UserID: UserID,
          }
        );
        if (result.status === 200) {
          setUserFullName(result.data.FullName);
          setFileName(result.data.ProfilePic);
          setProfilePic(`${apiUrl}/user_uploads/profile_pic/${result.data.ProfilePic}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchUserFullName();
  }, []);
  
  useEffect(() => {
    async function currentShift() {
      const UserID = localStorage.getItem("UserID");
      try {
        const result = await axios.post(
          `${apiUrl}/timeManagement/currentShift`,
          {
            UserID: UserID,
          }
        );
        if (result.status === 200) {
          setButtonText(result.data.Action);
          setextraValidationMessage(`Are you sure you want to sign out?\nYou have worked ${result.data.ShiftDuration} today.`)
        }
      } catch (error) {
        console.error(error);
      }
    }

    currentShift();
  }, []);



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

  function handleSubmit(event) {
    event.preventDefault();
    const UserID = localStorage.getItem("UserID");

    if(buttonText == 'Sign In' || (buttonText == 'Yes' && extraValidation == true))
    {
    setExtraValidation(false)
    // get latitude & longitude from logged in user & set the values, then call API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        try {
          const result = axios.post(
            `${apiUrl}/timeManagement/dailyShift`,
            {
              UserID: UserID,
              password: inputs.password,
              Latitude: latitude,
              Longitude: longitude
            }
          ).then((result) => {
            if (result.status === 200) {
              setMessage(result.data.message);
              if (result.data.message == "You have already signed out for today! You will be able to sign in again tommorrow." 
              ||  result.data.message == "The password you have entered does not seem to match the one previously used to login! Please try again."
              ||  result.data.message == "You have already signed in for today, please come back tomorrow."
              || result.data.message == "You cannot sign in today as records show you are on leave."
              || result.data.message == "You are not allowed to sign in on weekend days or bank holidays. Please contact your administrator for more information!"
              )
              {
                setErrorWrongPasswordAlert(true);
                setSubmit(false);
              } else {
                setShowSignInOutSuccessAlert(true);
                setSubmit(true);
              }
            }
          });
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    )
    }
    else
    {
      setExtraValidation(true)
      setButtonText('Yes')
    }
  
    
  }

  return (
    <>
<div className="content" style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  minHeight: '90vh'
}}>
      <Container >
          <Col className="ml-auto mr-auto" md="5" >
          <Card className="card-lock text-center" >
            <CardBody>

            {fileName == '' || fileName == null ? (
  <Avatar src={require("assets/img/default-avatar.png")} round={true} size="100"/>
) : (
  <Avatar src={profilePic} round={true} size="100"/>
)}

            <Form onSubmit={handleSubmit} className="form" method="">
              <CardTitle tag="h4">{userFullName}</CardTitle>
              
              {extraValidation == false && !submit && 
              <p style={{backgroundColor: '#50BCDA', color: 'white'}}> Current time is {currentTime}</p>
              }
              {extraValidation == false && !submit &&
                <Input
                  placeholder="Enter Account Password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  style={{textAlign: 'center', marginBottom: '1em'}}
                  required
                  onChange={(e) => handleChange(e, "password")}
                  
                />
              }

              {extraValidation == true && <p style={{color: 'orange', fontWeight: "bold"}}>{extraValidationMessage}</p>}
              


              { !submit &&
              <Button
                type = "submit"
                color="default"
                outline
                style={{backgroundColor: '#50BCDA', color: 'white'}}
              >
                {buttonText}
              </Button>

              }
            </Form>
            </CardBody>
            <CardFooter>

             

            </CardFooter>
            
          </Card>
          </Col>
          
      {errorWrongPasswordAlert && errorsignInOut(hideAlert, message)}
      {showSignInOutSuccessAlert && signInOutSuccess(hideAlert, hideAlert, message)}

        </Container>

        
        
        
      </div>

     {/* <Map google={props.google} zoom={14} style={mapStyles} initialCenter={defaultCenter} onClick={onMapClick}>
      <Marker position={defaultCenter} onClick={onMarkerClick} />
      <Marker position={{ lat: 37.785199, lng: -122.406696 }} onClick={onMarkerClick} />
      

      <InfoWindow marker={activeMarker} visible={infoWindowVisible}>
        <div>{infoWindowContent}</div>
      </InfoWindow>
    </Map>
            */}
      

      
    </>
  );
}

export default SignInOut;

/*export default GoogleApiWrapper({
  apiKey: "AIzaSyCVtrtT6UAnSxursdlW98hAbjikB2Mpwzo",
})(SignInOut);*/
