import React, { useState } from "react";
import classnames from "classnames";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

// reactstrap components
import { Row, Col } from "reactstrap";

const apiUrl = process.env.REACT_APP_APIURL;

const Step3 = React.forwardRef((props, ref) => {
  const [design, setDesign] = React.useState(false);
  const [code, setCode] = React.useState(false);
  const [showResetPasswordAlert, setShowResetPasswordAlert] = React.useState(false);
  const [showDisableEmployeeAlert, setShowDisableEmployeeAlert] = React.useState(false);
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
    try {
      // Make an API call to reset user password with UserID in the body
      const response = await axios.post(`${apiUrl}/emails/resetUserPassword`, { UserID });
      console.log(response.data); // Handle the response as needed

      if (response.status === 200) {
        // Show SweetAlert for reset password success
        setShowResetPasswordAlert(true);
      } else {
        // Show SweetAlert for reset password error
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error resetting user password:', error);

      // Show SweetAlert for reset password error
      setShowErrorAlert(true);
    }
  };

  const handleDisableEmployee = async () => {
    try {
      // Make an API call to disable employee with UserID in the body
      const response = await axios.post(`${apiUrl}/disableEmployee`, { UserID });
      console.log(response.data); // Handle the response as needed

      if (response.status === 200) {
        // Show SweetAlert for disable employee success
        setShowDisableEmployeeAlert(true);
      } else {
        // Show SweetAlert for disable employee error
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error disabling employee:', error);

      // Show SweetAlert for disable employee error
      setShowErrorAlert(true);
    }
  };

  const hideAlerts = () => {
    setShowResetPasswordAlert(false);
    setShowDisableEmployeeAlert(false);
    setShowErrorAlert(false);
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
                  handleDisableEmployee();
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

      {/* SweetAlert for Reset Password */}
      {showResetPasswordAlert && (
        <SweetAlert
          success
          title="Success!"
          onConfirm={hideAlerts}
        >
          User password was successfully reset!
        </SweetAlert>
      )}

      {/* SweetAlert for Disable Employee */}
      {showDisableEmployeeAlert && (
        <SweetAlert
          success
          title="Success!"
          onConfirm={hideAlerts}
        >
          Employee was successfully disabled!
        </SweetAlert>
      )}

      {/* SweetAlert for Error */}
      {showErrorAlert && (
        <SweetAlert
          error
          title="Error!"
          onConfirm={hideAlerts}
        >
          Something went wrong! Please try again.
        </SweetAlert>
      )}
    </>
  );
});

export default Step3;
