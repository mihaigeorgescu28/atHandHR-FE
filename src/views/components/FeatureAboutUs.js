import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const features = [
    {icon: 'flaticon-system', background: "#fff5d9", title: "Security", description: "Measures to protect your data, ensuring maximum safety and compliance." },
    {icon: 'flaticon-solution' ,background: "#d3f6fe", title: "Onboarding", description: "Smooth & hassle-free onboarding of users with step-by-step guidance and support." },
    {icon: 'flaticon-call-center-1', background: "#e5f5f5", title: "IT Support", description: "Complimentary support to quickly resolve any questions or issues your staff may encounter." },
    {icon: 'flaticon-friendship', background: "#fdf9ee", title: "User Friendly", description: "Intuitive interface, making it easy for employees to navigate effortlessly." },
    {icon: 'flaticon-dashboard', background: "#d0faec", title: "Customisable Features", description: "Tailor the platform to fit your unique business requirements with customisable modules." },
  {icon: 'flaticon-relationship', background: "#ffeff8", title: "Centralised Data", description: "Manage employee records, attendance and documents securely from one place." },



 
];

function FeatureAboutUs() {
  return (
    <section>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg="8">
            <div className="mb-5">
              <h2 className="mb-0">
                <span className="font-w-4 d-block">Empowering Your HR Experience</span> with Innovation and Support
              </h2>
            </div>
          </Col>
        </Row>
        <Row>
          {features.map((feature, index) => (
            <Col lg="4" md="6" key={index} className="mt-5">
              <div className="d-flex justify-content-between">
                <div className="me-3">
                  <div className="f-icon-s p-3 rounded" style={{ background: feature.background }}>
                    <i className={`${feature.icon}`}></i>
                    <img src={`../../assets/images/client/${index + 9}.png`} alt="" />
                  </div>
                </div>
                <div>
                  <h5 className="mb-2">{feature.title}</h5>
                  <p className="mb-0">{feature.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeatureAboutUs;
