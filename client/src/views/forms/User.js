import React from "react";
import { Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col } from "reactstrap";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// wizard steps
import Step1 from "./WizardSteps/Step1.js";
import Step2 from "./WizardSteps/Step2.js";
import Step3 from "./WizardSteps/Step3.js";


var steps = [
  {
    stepName: "About",
    stepIcon: "nc-icon nc-single-02",
    component: Step1
  },
  {
    stepName: "Account",
    stepIcon: "nc-icon nc-touch-id",
    component: Step2
  },
  {
    stepName: "Address",
    stepIcon: "nc-icon nc-pin-3",
    component: Step3
  }
];



function UserForm({ userData }) {
  return (
    <div className="user-form-container">
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">User Details</CardTitle>
          </CardHeader>
          <CardBody>
            <>
              <div className="content">
                <Col className="mr-auto ml-auto" md="10">
                  <ReactWizard
                    steps={steps.map(step => ({
                      ...step,
                      component: props => React.createElement(step.component, { ...props, userData })
                    }))}
                    navSteps
                    finishButtonClasses="btn-wd"
                    nextButtonClasses="btn-wd"
                    previousButtonClasses="btn-wd"
                  />
                </Col>
              </div>
            </>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}



export default UserForm;
