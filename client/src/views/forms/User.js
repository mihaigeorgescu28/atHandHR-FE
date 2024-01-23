import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Col, Button } from "reactstrap";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";


// wizard steps
import Step1 from "./WizardSteps/Step1.js";
import Step2 from "./WizardSteps/Step2.js";
import Step3 from "./WizardSteps/Step3.js";

function UserForm({ userData }) {
  // Check if userData is not available yet
  if (!userData) {
    return <p>Loading...</p>; // You can replace this with a loading indicator or message
  }

  // Destructure the values from the userData object
  const { 
    UserID,
    FirstName, 
    LastName, 
    EmailAddress, 
    CompanyEmailAddress, 
    PhoneNumber, 
    CompanyPhoneNumber, 
    DOB, 
    WorkingShiftHours, 
    HolidayEntitlement,
    PositionID,
    Position, 
    EmployeeNumber, 
    ExEmployee,
    NINO,
    LineManagerID,
    LineManager,
    JoinedDate,
    Salary,
    BuildingNameNumber,
    StreetName,
    TownCity,
    Country,
    PostalCode,
    ProfilePicture
  } = userData[0] || {};

  // Higher-order component (HOC) to enhance Step1 with additional props
  const withStepProps = (WrappedComponent, additionalProps) => {
    return React.forwardRef((props, ref) => {
      const mergedProps = {
        ...additionalProps,
        ...props,
      };
  
      return <WrappedComponent ref={ref} {...mergedProps} />;
    });
  };

  
  const steps = [
    {
      stepName: "Personal",
      stepIcon: "nc-icon nc-single-02",
      component: withStepProps(Step1, {
        userId: UserID || "",
        firstName: FirstName || "",
        lastName: LastName || "",
        emailAddress: EmailAddress || "",
        phoneNumber: PhoneNumber || "",
        DOB: DOB || "",
        NINO: NINO || "",
        buildingNameNumber: BuildingNameNumber || "",
        streetName: StreetName || "",
        townCity: TownCity || "",
        Country: Country || "",
        postalCode: PostalCode || "",
        profilePicture: ProfilePicture || "",
      })
    },
    {
      stepName: "Company",
      stepIcon: "nc-icon nc-briefcase-24",
      component: withStepProps(Step2, {
          userId: UserID || "",
          companyEmailAddress: CompanyEmailAddress || "",
          companyPhoneNumber: CompanyPhoneNumber || "",
          workingShiftHours: WorkingShiftHours,
          holidayEntitlement: HolidayEntitlement || "",
          positionID: PositionID || "",
          position: Position || "",
          employeeNumber: EmployeeNumber || "",
          lineManagerID: LineManagerID || "",
          lineManager: LineManager || "",
          joinedDate: JoinedDate || "",
          salary: Salary || ""
        })
    },
    {
      stepName: "Account",
      stepIcon: "nc-icon nc-badge",
      component: withStepProps(Step3, {
        userId: UserID || ""
      }),
    },
  ];


  return (
    <div className="user-form-container" >
      <Col className="mr-auto ml-auto" md="10" >
          <ReactWizard
            steps={steps}
            navSteps
            finishButtonClasses="btn-wd"
            nextButtonClasses="btn-wd"
            previousButtonClasses="btn-wd"
          />
        </Col>
    </div>
  );
  
}

export default UserForm;
