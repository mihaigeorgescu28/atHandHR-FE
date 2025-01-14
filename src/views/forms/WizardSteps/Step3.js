import React, { useState } from "react";
import classnames from "classnames";
import axios from 'axios';
import { disableEmployeeSuccess, confirmationDisableEmployee, resetPasswordSuccess, confirmationResetPassword, errorAlert } from '../../components/SweetAlert';
import SweetAlert from 'react-bootstrap-sweetalert'; // Import SweetAlert

// reactstrap components
import { Row, Col } from "reactstrap";

const apiUrl = process.env.REACT_APP_APIURL;

const Step3 = React.forwardRef((props, ref) => {
  const [design, setDesign] = React.useState(false);
  const [code, setCode] = React.useState(false);
  const [showResetPasswordAlert, setShowResetPasswordAlert] = React.useState(false);
  const [showResetPasswordSuccess, setShowResetPasswordSuccess] = React.useState(false);
  const [showDisableEmployeeAlert, setShowDisableEmployeeAlert] = React.useState(false);
  const [showDisableEmployeeSuccess, setShowDisableEmployeeSuccess] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [UserID, setUserID] = useState(props.userId || "");

  React.useImperativeHandle(ref, () => ({
    isValidated: undefined,
    state: {
      design,
      code,
    }
  }));

  const handleResetPassword = async () => {
    // Show confirmation dialog for resetting password
    setShowResetPasswordAlert(true);
  };
  

  const confirmResetPassword = async () => {
    try {
      axios.defaults.withCredentials = true;
      // Make an API call to reset user password with UserID in the body
      const response = await axios.post(`${apiUrl}/emails/resetUserPassword`, { UserID });
  
      if (response.status === 200) {
        // Show success message for resetting password
        setShowResetPasswordSuccess(true); // Update state to show the success SweetAlert
      } else {
        // Show SweetAlert for reset password error
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error resetting user password:', error);
  
      // Show SweetAlert for reset password error
      setShowErrorAlert(true);
    } finally {
      // Hide the confirmation dialog after execution
      setShowResetPasswordAlert(false);
    }
  };
  

  const confirmDisableEmployee = async () => {
    try {
      axios.defaults.withCredentials = true;
      // Make an API call to disable employee with UserID in the body
      const response = await axios.post(`${apiUrl}/user/disableEmployee`, { UserID });
  
      if (response.status === 200) {
        // Show success message for disabling employee
        disableEmployeeSuccess(); // Display the success SweetAlert
      } else {
        // Show SweetAlert for disable employee error
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error disabling employee:', error);
  
      // Show SweetAlert for disable employee error
      setShowErrorAlert(true);
    } finally {
      // Hide the confirmation dialog after execution
      setShowDisableEmployeeAlert(false);
      setShowDisableEmployeeSuccess(true);
    }
  };
  

  const hideAlerts = () => {
    setShowResetPasswordAlert(false);
    setShowDisableEmployeeAlert(false);
    setShowErrorAlert(false);
    setShowDisableEmployeeSuccess(false);
    setShowResetPasswordSuccess(false);
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col lg="10">
          <Row>
            <Col sm="6">
              <div
                className={classnames("choice", {
                  active: design
                })}
                data-toggle="wizard-checkbox"
                onClick={() => {
                  setDesign(!design);
                  handleResetPassword();
                }}
              >
                <input
                  defaultValue="Design"
                  name="jobb"
                  type="checkbox"
                  defaultChecked={design}
                />
                <div className="icon">
                  <i className="nc-icon nc-ruler-pencil" />
                </div>
                <h6>Reset Password</h6>
              </div>
            </Col>
            <Col sm="6">
              <div
                className={classnames("choice", { active: code })}
                data-toggle="wizard-checkbox"
                onClick={() => {
                  setCode(!code);
                  setShowDisableEmployeeAlert(true); // Show the confirmation dialog directly
                }}
              >
                <input
                  defaultValue="Code"
                  name="jobb"
                  type="checkbox"
                  defaultChecked={code}
                />
                <div className="icon">
                  <i className="nc-icon nc-laptop" />
                </div>
                <h6>Disable Employee</h6>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {showResetPasswordAlert && confirmationResetPassword(hideAlerts, confirmResetPassword)}
      {showResetPasswordSuccess && resetPasswordSuccess(hideAlerts, hideAlerts)}

      {/* Confirmation dialog for disabling employee */}
      {showDisableEmployeeAlert && confirmationDisableEmployee(hideAlerts, confirmDisableEmployee)}

      {showDisableEmployeeSuccess && disableEmployeeSuccess(hideAlerts, hideAlerts)}

      {/* SweetAlert for Error */}
      {showErrorAlert && errorAlert(hideAlerts)}
    </>
  );
});

export default Step3;
