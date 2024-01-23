import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import Step4 from "./WizardSteps/Wizard22/Step1.js";
import Step5 from "./WizardSteps/Wizard22/Step2.js";
import Step6 from "./WizardSteps/Wizard22/Step3.js";

var steps = [
  {
    stepName: "About",
    stepIcon: "nc-icon nc-single-02",
    component: Step4
  },
  {
    stepName: "Account",
    stepIcon: "nc-icon nc-touch-id",
    component: Step5
  },
  {
    stepName: "Address",
    stepIcon: "nc-icon nc-pin-3",
    component: Step6
  }
];

function Wizard() {
  return (
    <>
      <div className="content">
        <Col className="mr-auto ml-auto" md="10">
          <ReactWizard
            steps={steps}
            navSteps
            title="Build Your Profile"
            description="This information will let us know more about you."
            headerTextCenter
            finishButtonClasses="btn-wd"
            nextButtonClasses="btn-wd"
            previousButtonClasses="btn-wd"
          />
        </Col>
      </div>
    </>
  );
}

export default Wizard;
